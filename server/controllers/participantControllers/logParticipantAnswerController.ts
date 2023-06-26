"use strict";

import { Request, Response } from "express";
import { SurveyModel } from "../../models/surveyModel";
import { SurveyLogsModel } from "../../models/surveyLogModel";
import { LogRequest } from "./interfaces";

export const logParticipantAnswer = async (req: Request, res: Response) => {
  try {
    const hash = req.params.hash;
    const { questionId, answerId, isFinished } = req.body as LogRequest;

    const log = await SurveyLogsModel.findOne({ hash });

    if (!log) {
      return res
        .status(403)
        .send({ message: "Permission required to access this survey." });
    }

    if (log.respondedQuestionIds?.includes(questionId)) {
      return res
        .status(200)
        .send({ message: "This question has already answered." });
    }

    const survey = await SurveyModel.findById(log.surveyId);
    if (!survey) {
      return res.status(404).send({ message: "Survey not found" });
    }

    const question = survey.questions.find((q) => {
      return q._id?.toString() === questionId;
    });

    if (!question) {
      return res.status(404).send({ message: "Question not found" });
    }

    if (typeof question.answerOptions === "undefined") {
      return res
        .status(404)
        .send({ message: "Question has no answer options" });
    }

    const answer = question.answerOptions.find(
      (a) => a._id?.toString() === answerId
    );

    if (!answer) {
      return res.status(404).send({ message: "Answer option not found" });
    }

    answer.score = Number(answer.score) + 1;
    await survey.save();

    log.respondedQuestionIds?.push(questionId);
    log.isCompleted = isFinished;

    await log.save();
    res.sendStatus(200);
  } catch (error: unknown) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

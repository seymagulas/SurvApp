"use strict";

import { Request, Response } from "express";
import { SurveyModel } from "../../models/surveyModel";
import { LogRequest } from "../surveyControllers/interfaces";
import { SurveyLogsModel } from "../../models/surveyLogModel";

export const getSurveyQuestionController = async (
  req: Request,
  res: Response
) => {
  try {
    const hash = req.params.hash;
    const { email } = req.body as LogRequest;

    const log = await SurveyLogsModel.findOne({ hash, email });

    if (!log) {
      return res
        .status(403)
        .send({ message: "Permission required to access this survey." });
    }

    const survey = await SurveyModel.findById(log.surveyId).select(
      "-questions.answerOptions.score"
    );

    if (!survey) {
      return res.status(404).send({ message: "Survey not found" });
    }

    const question = survey.questions.find(
      (q) => !log.respondedQuestionIds?.includes(q._id as string)
    );

    const isLastQuestion =
      log.respondedQuestionIds.length + 1 === survey.questions.length;

    res.status(200).send({
      question,
      isLastQuestion,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

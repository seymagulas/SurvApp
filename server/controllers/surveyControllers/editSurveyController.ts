"use strict";

import { Request, Response } from "express";
import { SurveyModel, SurveyStatus } from "../../models/surveyModel";
import { validateSurveyRequest } from "./utils";
import { SurveyRequest } from "./interfaces";

export const editSurvey = async (req: Request, res: Response) => {
  try {
    const surveyId = req.params.id;
    const userId = req.app.locals.user._id;
    const { name, questions } = req.body as SurveyRequest;

    const survey = await SurveyModel.findOne({ _id: surveyId, userId });

    if (!survey) {
      return res.status(404).send({
        message: "Survey not found.",
      });
    }

    if (survey.status !== SurveyStatus.new) {
      return res.status(422).send({
        message: `The ${survey.status} survey cannot be edited.`,
      });
    }

    validateSurveyRequest(req.body);

    survey.name = name;
    survey.questions = questions;

    const updatedSurvey = await survey.save();
    res.status(200).send(updatedSurvey);
  } catch (error) {
    if (error instanceof Error) {
      res.status(422).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: "Server error" });
    }
  }
};

"use strict";

import { Request, Response } from "express";
import { SurveyModel, SurveyStatus } from "../../models/surveyModel";

export const completeSurvey = async (req: Request, res: Response) => {
  try {
    const surveyId = req.params.id;
    const userId = req.app.locals.user._id;
    const survey = await SurveyModel.findOne({ _id: surveyId, userId });

    if (!survey) {
      return res.status(404).send({
        message: "Survey not found.",
      });
    }

    if (survey.status !== SurveyStatus.published) {
      return res.status(422).send({
        message: `The ${survey.status} survey cannot be completed.`,
      });
    }

    survey.status = SurveyStatus.completed;
    const completedSurvey = await survey.save();
    res.status(200).send(completedSurvey);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

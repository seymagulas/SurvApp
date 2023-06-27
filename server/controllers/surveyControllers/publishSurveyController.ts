"use strict";

import { Request, Response } from "express";
import { SurveyModel, SurveyStatus } from "../../models/surveyModel";
import { prepareSurveyToPublish } from "./utils";

export const publishSurvey = async (req: Request, res: Response) => {
  try {
    const surveyId = req.params.id;
    const userId = req.app.locals.user._id;
    const survey = await SurveyModel.findOne({ _id: surveyId, userId });

    if (!survey) {
      return res.status(404).send({
        message: "Survey not found.",
      });
    }

    if (survey.status !== SurveyStatus.new) {
      return res.status(422).send({
        message: `The ${survey.status} survey cannot be published.`,
      });
    }

    prepareSurveyToPublish(survey);

    const publishedSurvey = await survey.save();
    res.status(200).send(publishedSurvey);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

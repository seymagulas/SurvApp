"use strict";

import { Request, Response } from "express";
import { SurveyModel } from "../../models/surveyModel";

export const getSurvey = async (req: Request, res: Response) => {
  try {
    const surveyId = req.params.id;
    const userId = req.app.locals.user._id;
    const survey = await SurveyModel.findOne({ _id: surveyId, userId });

    if (!survey) {
      return res.status(404).send({
        message: "Survey not found.",
      });
    }

    res.status(200).send(survey);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

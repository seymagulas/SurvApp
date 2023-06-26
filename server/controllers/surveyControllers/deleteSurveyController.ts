"use strict";

import { Request, Response } from "express";
import { SurveyModel } from "../../models/surveyModel";

export const deleteSurvey = async (req: Request, res: Response) => {
  try {
    const surveyId = req.params.id;
    const userId = req.app.locals.user._id;
    const deletedSurvey = await SurveyModel.findOneAndRemove({
      _id: surveyId,
      userId,
    });

    if (!deletedSurvey) {
      return res.status(404).send({
        message: "Survey not found.",
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

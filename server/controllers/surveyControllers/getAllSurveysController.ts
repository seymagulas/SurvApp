"use strict";

import { Request, Response } from "express";
import { SurveyModel } from "../../models/surveyModel";

export const getAllSurveys = async (req: Request, res: Response) => {
  try {
    const userId = req.app.locals.user._id;
    const surveys = await SurveyModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).send(surveys);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

'use strict';

import { Request, Response } from 'express';
import { SurveyModel } from '../../models/surveyModel';
import { validateSurveyRequest } from './utils';
import { SurveyRequest } from './interfaces';

export const createSurvey = async (req: Request, res: Response) => {
  try {
    const userId = req.app.locals.user._id;
    const { name, questions } = req.body as SurveyRequest;

    validateSurveyRequest(req.body);

    const survey = new SurveyModel({
      userId,
      name,
      questions,
    });

    const newSurvey = await survey.save();
    res.status(201).send(newSurvey);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(422).send({ message: error.message });
    } else {
      console.log(error);
      res.status(500).send({ message: 'Server error' });
    }
  }
};

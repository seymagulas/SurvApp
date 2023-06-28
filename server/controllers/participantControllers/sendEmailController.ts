"use strict";

import dotenv from "dotenv";
import { Request, Response } from "express";
import { SurveyModel, SurveyStatus } from "../../models/surveyModel";
import { generateHash, logParticipant, sendEmail } from "./utils";
import { SendEmailsRequest } from "./interfaces";

dotenv.config();

const BASE_URL = process.env.BASE_URL;

export const sendEmailController = async (req: Request, res: Response) => {
  try {
    const surveyId = req.params.id;
    const userId = req.app.locals.user._id;
    const { emails } = req.body as SendEmailsRequest;
    const survey = await SurveyModel.findOne({ _id: surveyId, userId });

    if (!survey) {
      return res.status(404).send({
        message: "Survey not found.",
      });
    }

    if (survey.status === SurveyStatus.completed) {
      return res.status(422).send({
        message: `Emails cannot be sent for the completed survey.`,
      });
    }

    emails.forEach((email) => {
      const hash = generateHash();
      const url = `${BASE_URL}/participant?hash=${hash}`;
      const subject = "Please take our survey";
      const body = `Dear participant,\n\nWe would like to invite you to take our survey.\n\nPlease click on the following link to access the survey:\n\n${url}\n\nThank you for your participation!\n\nBest regards,\nThe SurvApp Team`;
      sendEmail({ recipient: email, subject, body });
      logParticipant({ email, surveyId, hash });
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

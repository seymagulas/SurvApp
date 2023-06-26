"use strict";

import * as crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "./mailConfig";
import { SurveyLogsModel } from "../../models/surveyLogModel";
import { EmailProps, LogParticipantProps } from "./interfaces";

export const generateHash = () => {
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  return crypto
    .createHash("sha1")
    .update(current_date + random)
    .digest("hex");
};

export const sendEmail = ({ recipient, subject, body }: EmailProps) => {
  const { mailUser, mailPass, mailService } = config;
  console.log("mailUser", mailUser);
  console.log("mailPass", mailPass);
  console.log("mailService", mailService);
  const transporter = nodemailer.createTransport({
    service: mailService,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  const mailOptions = {
    from: mailUser,
    to: recipient,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      throw new Error("Error sending email");
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const logParticipant = ({
  email,
  surveyId,
  hash,
}: LogParticipantProps) => {
  const log = new SurveyLogsModel({
    email,
    surveyId,
    hash,
    respondedQuestionIds: [],
    isCompleted: false,
  });

  log.save();
};

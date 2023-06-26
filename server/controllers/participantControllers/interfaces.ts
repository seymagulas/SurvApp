"use strict";

export interface LogRequest {
  email: string;
  questionId: string;
  answerId: string;
  isFinished: boolean;
}

export interface SendEmailsRequest {
  emails: string[];
}

export interface EmailProps {
  recipient: string;
  subject: string;
  body: string;
}

export interface LogParticipantProps {
  email: string;
  surveyId: string;
  hash: string;
}

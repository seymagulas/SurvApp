"use strict";

import mongoose from "./index";

export interface ISurveyLogs {
  email: string;
  surveyId: string;
  hash: string;
  respondedQuestionIds: string[];
  isCompleted?: boolean;
}

export const SurveyLogsSchema = new mongoose.Schema<ISurveyLogs>({
  email: {
    type: String,
    required: true,
  },
  surveyId: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  respondedQuestionIds: {
    type: [String],
    required: false,
    default: [],
  },
  isCompleted: {
    type: Boolean,
    required: false,
  },
});

export const SurveyLogsModel = mongoose.model<ISurveyLogs>(
  "SurveyLogs",
  SurveyLogsSchema
);

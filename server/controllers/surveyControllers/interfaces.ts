"use strict";

import { IQuestion } from "../../models/surveyModel";

export interface SurveyRequest {
  name: string;
  questions: IQuestion[];
}

export interface LogRequest {
  email: string;
  questionId: string;
  answerId: string;
  isFinished: boolean;
}

"use strict";

import { IQuestion } from "../../models/surveyModel";

export interface SurveyRequest {
  name: string;
  questions: IQuestion[];
}

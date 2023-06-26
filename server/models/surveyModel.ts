"use strict";

import mongoose from "./index";

export interface IAnswerOption {
  _id?: string;
  text: string;
  score?: number;
}

const AnswerOptionsSchema = new mongoose.Schema<IAnswerOption>({
  text: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: false,
  },
});

export const enum QuestionChoiceType {
  multiChoice = "multi-choice",
  range = "range",
}

export interface IQuestion {
  _id?: string;
  text: string;
  choiceType: QuestionChoiceType;
  answerOptions?: IAnswerOption[];
}

export const QuestionSchema = new mongoose.Schema<IQuestion>({
  text: {
    type: String,
    required: true,
  },
  choiceType: {
    type: String,
    required: true,
  },
  answerOptions: {
    type: [AnswerOptionsSchema],
    required: false,
  },
});

export const enum SurveyStatus {
  new = "new",
  published = "published",
  completed = "completed",
}

export interface ISurvey {
  userId: string;
  name: string;
  questions: IQuestion[];
  status: SurveyStatus;
}

export const SurveySchema = new mongoose.Schema<ISurvey>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: SurveyStatus.new,
  },
});

export const SurveyModel = mongoose.model<ISurvey>("Survey", SurveySchema);

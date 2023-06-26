"use strict";

import {
  ISurvey,
  QuestionChoiceType,
  SurveyStatus,
} from "../../models/surveyModel";
import { SurveyRequest } from "./interfaces";

export const validateSurveyRequest = (body: SurveyRequest) => {
  const { name, questions } = body;
  if (!name) {
    throw new Error("Name cannot be empty.");
  }

  if (!questions) {
    throw new Error("Survey should has at least one question.");
  }

  questions.forEach((question) => {
    if (!question.text) {
      throw new Error("Question text cannot be empty.");
    }

    if (
      question.choiceType != QuestionChoiceType.multiChoice &&
      question.choiceType != QuestionChoiceType.range
    ) {
      throw new Error("Invalid choice type for the question.");
    }

    if (question.choiceType === QuestionChoiceType.multiChoice) {
      if (!question.answerOptions || question.answerOptions.length < 2) {
        throw new Error("Question must have at least 2 answer options.");
      }
      question.answerOptions.forEach((answerOption) => {
        if (answerOption.text.trim() === "") {
          throw new Error("Answer option cannot be null.");
        }
      });
    }
  });
};

export const answerOptionsForRange = [
  { text: "1" },
  { text: "2" },
  { text: "3" },
  { text: "4" },
  { text: "5" },
];

export const prepareSurveyToPublish = (survey: ISurvey) => {
  survey.questions.forEach((question) => {
    if (question.choiceType === QuestionChoiceType.range) {
      question.answerOptions = answerOptionsForRange;
    }
    question.answerOptions?.forEach((answerOption) => {
      answerOption.score = 0;
    });
  });
  survey.status = SurveyStatus.published;

  return survey;
};

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IQuestion, getSurvey } from '../services/survey.service';

export interface ISurveyProvider {
  questions: IQuestion[];
  handleGetSurvey: ({ surveyId }: { surveyId?: string | undefined }) => void;
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
}

const SurveyProvider = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const handleGetSurvey = ({ surveyId }: { surveyId?: string }) => {
    getSurvey({ surveyId }).then((surveyData) => {
      if (surveyData) {
        setQuestions(surveyData.questions);
      }
    });
  };
  return <Outlet context={{ questions, handleGetSurvey, setQuestions }} />;
};

export default SurveyProvider;

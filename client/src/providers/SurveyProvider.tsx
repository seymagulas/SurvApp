import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IQuestion, getSurvey } from '../services/survey.service';

export interface ISurveyProvider {
  questions: IQuestion[];
  surveyName: string;
  handleGetSurvey: ({ surveyId }: { surveyId?: string | undefined }) => void;
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  setSurveyName: React.Dispatch<React.SetStateAction<string>>;
}

const SurveyProvider = () => {
  const [surveyName, setSurveyName] = useState<string>('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const handleGetSurvey = ({ surveyId }: { surveyId?: string }) => {
    getSurvey({ surveyId }).then((surveyData) => {
      if (surveyData) {
        setSurveyName(surveyData.name);
        setQuestions(surveyData.questions);
      }
    });
  };
  return (
    <Outlet
      context={{
        questions,
        surveyName,
        handleGetSurvey,
        setQuestions,
        setSurveyName,
      }}
    />
  );
};

export default SurveyProvider;

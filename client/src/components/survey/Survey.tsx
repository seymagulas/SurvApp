import React, { useEffect } from 'react';
import SurveyForm from './surveyForm/SurveyForm';
import QuestionList from '../questions/QuestionList';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { ISurveyProvider } from '../../providers/SurveyProvider';

const Survey: React.FC = () => {
  const params = useParams();
  const surveyId = params.id;
  const { handleGetSurvey, questions } = useOutletContext<ISurveyProvider>();

  useEffect(() => {
    handleGetSurvey({ surveyId });
  }, [surveyId]);

  return (
    <>
      <SurveyForm />
      <QuestionList questions={questions} />
      <Link to="/survey/questions" state={{ surveyId }}>
        Add Question
      </Link>
      <button>Save Survey</button>
    </>
  );
};

export default Survey;

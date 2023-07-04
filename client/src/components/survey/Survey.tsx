import React, { useEffect } from 'react';
import QuestionList from '../questions/QuestionList';
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { ISurveyProvider } from '../../providers/SurveyProvider';
import SurveyForm from './surveyForm/SurveyForm';
import { createSurvey, updateSurvey } from '../../services/survey.service';

const Survey: React.FC = () => {
  const params = useParams();
  const surveyId = params.id;
  const { handleGetSurvey, questions, setQuestions, surveyName } =
    useOutletContext<ISurveyProvider>();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSurvey({ surveyId });
  }, [surveyId]);

  const deleteQuestion = (text: string) => {
    setQuestions(questions.filter((question) => question.text !== text));
  };

  const handleSaveSurvey = async () => {
    const data = {
      name: surveyName,
      questions: questions,
    };
    if (surveyId) {
      const response = await updateSurvey({
        data,
        surveyId,
      });
      if (response) {
        navigate('/main');
      }
    } else {
      const response = await createSurvey({ data });
      if (response) {
        navigate('/main');
      }
    }
  };

  const isButtonVisible = surveyName.length > 1 && questions.length > 0;

  return (
    <>
      <div className="max-w-md mx-auto">
        <SurveyForm />
        <QuestionList questions={questions} deleteQuestion={deleteQuestion} />
        <div className="text-center">
          <Link to="/survey/questions" state={{ surveyId }}>
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-md mb-4 medium_button"
              aria-label="Add question"
            >
              Add Question
            </button>
          </Link>
        </div>
        {isButtonVisible && (
          <div className="w-full text-center">
            <button
              onClick={handleSaveSurvey}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md pl-20 pr-20 medium-button"
              aria-label="Save question"
            >
              Save Survey
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Survey;

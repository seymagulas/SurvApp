import React from 'react';
import { IQuestion } from '../../services/survey.service';

interface IQuestionListProps {
  questions: IQuestion[];
}

const QuestionList: React.FC<IQuestionListProps> = ({ questions }) => {
  return (
    <>
      {questions.map((question) => (
        <p key={question.text}>{question.text}</p>
      ))}
    </>
  );
};

export default QuestionList;

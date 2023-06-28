import React from 'react';
import { IQuestion } from '../../services/survey.service';

interface IQuestionListProps {
  questions: IQuestion[];
}

const QuestionList: React.FC<IQuestionListProps> = ({ questions }) => {
  return (
    <>
      {questions.map((question) => {
        <p>{question.text}</p>;
      })}
    </>
  );
};

export default QuestionList;

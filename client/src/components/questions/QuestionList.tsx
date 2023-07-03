import React, { useState } from 'react';
import { IQuestion } from '../../services/survey.service';
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri';
import './question.css';

interface IQuestionListProps {
  questions: IQuestion[];
  deleteQuestion: (text: string) => void;
}

const QuestionList: React.FC<IQuestionListProps> = ({
  questions,
  deleteQuestion,
}) => {
  const handleDelete = (text: string) => {
    deleteQuestion(text);
  };

  return (
    <>
      {questions.map((question) => (
        <div key={question.text} className="question-div flex mb-2">
          <div className="border border-gray-300 rounded-md p-2 flex-grow">
            <div className="flex items-center justify-between">
              <p className="flex-grow-1">{question.text}</p>
              <div className="flex justify-between">
                <RiDeleteBin6Line
                  className="action-button m1-2"
                  aria-label="Delete question"
                  title="Delete"
                  onClick={() => handleDelete(question.text)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionList;

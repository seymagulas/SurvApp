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
  const [editDisplay, setEditDisplay] = useState<boolean>(false);

  const handleOpenEdit = (question: IQuestion) => {
    // setEditDisplay = !editDisplay
  };

  const handleDelete = (text: string) => {
    deleteQuestion(text);
  };

  // 1. Create a status boolean to display the conditional edit form
  //2. Create the conditional editing form,
  // 3. change provider.
  // 4. optional change in BE provider.

  //question.text = newText
  //choiceType = newChoiceType
  //answerOptions = newAnswerOptions

  return (
    <>
      {questions.map((question) => (
        <div key={question.text} className="question-div flex mb-2">
          <div className="border border-gray-300 rounded-md p-2 flex-grow">
            <div className="flex items-center justify-between">
              <p className="flex-grow-1">{question.text}</p>
              <div className="flex justify-between">
                <RiEdit2Fill
                  className="action-button m1-2"
                  aria-label="Edit question"
                  onClick={() => handleOpenEdit(question)}
                />
                <RiDeleteBin6Line
                  className="action-button m1-2"
                  aria-label="Delete question"
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

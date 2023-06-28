'use client';

import React, { useState } from 'react';
import {
  IAnswerOption,
  IQuestion,
  QuestionChoiceType,
} from '../../services/survey.service';
import { useLocation, useOutletContext } from 'react-router-dom';
import { ISurveyProvider } from '../../providers/SurveyProvider';

const QuestionForm = () => {
  const { state } = useLocation();
  const surveyId = state.surveyId;
  const { questions, setQuestions } = useOutletContext<ISurveyProvider>();

  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentOptions, setCurrentOptions] = useState<IAnswerOption[]>([]);
  const [currentOption, setCurrentOption] = useState<string>('');
  const [questionType, setQuestionType] = useState<QuestionChoiceType>(
    QuestionChoiceType.multiChoice,
  );

  const addQuestion = () => {
    const newQuestion: IQuestion = {
      text: currentQuestion,
      answerOptions: currentOptions,
      choiceType: questionType,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentOptions([]);
    setCurrentOption('');
    setQuestionType(QuestionChoiceType.multiChoice);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Questions to Survey</h2>

      <label className="block mb-4">
        Question:
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        Question Type:
        <select
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
          value={questionType}
          onChange={(e) =>
            setQuestionType(e.target.value as QuestionChoiceType)
          }
        >
          <option value={QuestionChoiceType.multiChoice}>
            Multiple choice answers
          </option>
          <option value={QuestionChoiceType.range}>Rating answers</option>
        </select>
      </label>

      <div className="mb-4">
        Options:
        <ul className="list-disc list-inside">
          {currentOptions.map((option, index) => (
            <li key={index}>{option.text}</li>
          ))}
        </ul>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
          onClick={() =>
            setCurrentOptions([...currentOptions, { text: currentOption }])
          }
        >
          Add Option
        </button>
      </div>

      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded-md"
        onClick={addQuestion}
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionForm;

'use client';

import React, { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
const QuestionSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState('');
  const [questionType, setQuestionType] = useState('Single Choice');

  const addQuestion = () => {
    const newQuestion = {
      question: currentQuestion,
      options: currentOptions,
      type: questionType,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentOptions([]);
    setCurrentOption('');
    setQuestionType('Single Choice');
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Questions to Survey</h2>

      <label className="block mb-4">
        Question Type:
        <select
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="Rating Scale">Rating Scale</option>
        </select>
      </label>

      <label className="block mb-4">
        Question:
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
      </label>

      {questionType === 'Rating Scale' && (
        <div className="mb-4">
          Scale Range: 1 to 5
          <input
            type="range"
            min="1"
            max="5"
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
            className="mt-1 w-full"
          />
          <span className="text-gray-500 text-sm">
            Selected Rating: {currentOption}
          </span>
        </div>
      )}

      <div className="mb-4">
        Options:
        <ul className="list-disc list-inside">
          {currentOptions.map((option, index) => (
            <li key={index}>{option}</li>
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
          onClick={() => setCurrentOptions([...currentOptions, currentOption])}
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

      <h3 className="text-lg font-bold mt-4">Survey Preview:</h3>
      <ul className="flex">
        {questions.map((question, index) => (
          <li className="flex flex-col" key={index}>
            <p className="relative">{question.question}</p>
            {question.options && (
              <ul className="list-disc list-inside ml-4">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
            )}
            <div className="flex-row">
              <BsTrash onClick={() => deleteQuestion(index)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionSurvey;
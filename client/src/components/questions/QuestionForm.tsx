import { useState } from 'react';
import {
  IAnswerOption,
  IQuestion,
  QuestionChoiceType,
} from '../../services/survey.service';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ISurveyProvider } from '../../providers/SurveyProvider';
import { BsTrash } from 'react-icons/bs';

const QuestionForm = () => {
  const navigate = useNavigate();

  const { questions, setQuestions } = useOutletContext<ISurveyProvider>();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentOptions, setCurrentOptions] = useState<IAnswerOption[]>([]);
  const [questionType, setQuestionType] = useState<QuestionChoiceType>(
    QuestionChoiceType.multiChoice,
  );

  const allowPatterns = /^[a-zA-Z0-9-_.?]+$/;

  const sanitizeCode = (value: string) => {
    const codeSanitized = !allowPatterns.test(value);
    if (codeSanitized) {
      alert(
        'The survey name should just include numeric and alphabet characters',
      );
      return false;
    } else {
      return true;
    }
  };

  const addQuestion = () => {
    if (sanitizeCode(currentQuestion)) {
      const newQuestion: IQuestion = {
        text: currentQuestion,
        answerOptions: currentOptions,
        choiceType: questionType,
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion('');
      setCurrentOptions([]);
      setQuestionType(QuestionChoiceType.multiChoice);
      navigate('/survey/new');
    }
  };

  const addOption = (index: number, newOption: string) => {
    if (sanitizeCode(newOption)) {
      const updatedOptions = [...currentOptions];
      updatedOptions[index].text = newOption;
      setCurrentOptions(updatedOptions);
    }
  };

  const addInput = () => {
    setCurrentOptions([...currentOptions, { text: '' }]);
  };

  const deleteOption = (text: string) => {
    const updatedOptions = currentOptions.filter(
      (options) => options.text !== text,
    );
    setCurrentOptions(updatedOptions);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Questions to Survey</h2>

      <label className="block mb-4">
        Question:
        <input
          type="text"
          placeholder="Add your question..."
          className="mt-1 block w-full border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md p-2"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        Question Type:
        <select
          className="mt-1 block w-full border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md p-2"
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

      {questionType === QuestionChoiceType.multiChoice && (
        <div className="mb-4">
          Options:
          <div className="list-disc list-inside">
            {currentOptions.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Add your answer..."
                  className="mt-1 block w-full border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md p-2"
                  value={option.text}
                  onChange={(e) => addOption(index, e.target.value)}
                />
                <BsTrash onClick={() => deleteOption(option.text)} />
              </div>
            ))}
            <button
              className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
              onClick={() => addInput()}
            >
              Add Option
            </button>
          </div>
        </div>
      )}

      {(questionType === QuestionChoiceType.range ||
        currentOptions.length > 0) && (
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          onClick={addQuestion}
        >
          Add Question
        </button>
      )}
    </div>
  );
};

export default QuestionForm;

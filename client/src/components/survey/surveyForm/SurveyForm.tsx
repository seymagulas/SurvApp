import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ISurveyProvider } from '../../../providers/SurveyProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SurveyForm: React.FC = () => {
  const { surveyName, setSurveyName } = useOutletContext<ISurveyProvider>();

  const allowPatterns = /^$|^[a-zA-Z0-9-_.?: ,!]*$/;

  const handleName = (value: string) => {
    const sanitizeName = !allowPatterns.test(value);
    if (!sanitizeName) {
      setSurveyName(value);
    } else {
      toast.error(
        `The survey name should just include numeric and alphabet characters`,
      );
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Survey Name:</h2>
      <label className="block mb-4">
        <input
          type="text"
          placeholder="Name your survey..."
          className="mt-1 block w-full border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md p-2"
          aria-label="Survey name"
          value={surveyName}
          onChange={(e) => handleName(e.target.value)}
        />
      </label>
    </>
  );
};

export default SurveyForm;

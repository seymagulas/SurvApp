'use client';

import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom';
import { shareSurvey } from '../../services/survey.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Emails: React.FC = () => {
  const params = useParams();
  const surveyId = params.id;

  const allowPattern = /^[a-zA-Z0-9-_.@]+$/;
  const [inputEmails, setInputEmails] = useState<string[]>([]);

  const navigate = useNavigate();

  const addInput = () => {
    setInputEmails([...inputEmails, '']);
  };

  const addEmail = (index: number, newEmail: string) => {
    const updatedEmails = [...inputEmails];
    updatedEmails[index] = newEmail;
    setInputEmails(updatedEmails);
  };

  const deleteEmail = (EmailToDelete: string) => {
    const updatedEmails = inputEmails.filter(
      (email) => email !== EmailToDelete,
    );
    setInputEmails(updatedEmails);
  };

  const sendEmails = async () => {
    const sanitizedEmails = inputEmails.filter((email) =>
      allowPattern.test(email),
    );
    const checkAllEmails = sanitizedEmails.every((email) =>
      email.includes('@'),
    );

    if (!sanitizedEmails || !checkAllEmails) {
      toast.error(`Not all emails can be sent ${sanitizedEmails}`);
    } else {
      const data = {
        emails: sanitizedEmails,
      };
      if (surveyId) {
        await shareSurvey({ surveyId, data });
      }
      navigate('/main');
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Share your survey:</h2>
        <label className="block mb-4">
          <input
            type="button"
            aria-label="add new email"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
            id="addEmail"
            value=" + Add Email"
            name="addEmail"
            onClick={addInput}
          />
        </label>
      </div>

      <div className="max-w-md mx-auto">
        <label className="list-disc list-inside">
          {inputEmails.map((email, index) => (
            <div
              key={index}
              className="mt-1 block w-full border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md p-2"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  aria-label="Email to be sent to"
                  value={email}
                  className="w-full"
                  onChange={(event) => addEmail(index, event.target.value)}
                  placeholder="Email to send..."
                />
                <div className="flex justify-end m-2">
                  <BsTrash
                    aria-label="Delete email"
                    title="Delete"
                    onClick={() => deleteEmail(email)}
                  />
                </div>
              </div>
            </div>
          ))}
          {inputEmails.length > 0 && (
            <input
              aria-label="Send"
              className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
              type="submit"
              value="Send"
              onClick={sendEmails}
            />
          )}
        </label>
      </div>
    </>
  );
};

export default Emails;

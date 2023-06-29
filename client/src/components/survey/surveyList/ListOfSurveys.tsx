'use client';
​
import { useState, useEffect } from 'react';
import { getAllSurveys } from '../../../services/survey.service';
import { ISurvey } from '../../../services/survey.service';
import OptionsButtons from './OptionsButtons';
​
const ListOfSurveys = () => {
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [optionsButtons, setOptionsButtons] = useState<boolean>(false);
​
  const handleGetAllSurveys = () => {
    getAllSurveys()
      .then((surveys: ISurvey[]) => {
        setSurveys(surveys);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };
​
  useEffect(() => {
    handleGetAllSurveys();
  }, []);
​
  const showOptionsButtons = () => {
    setOptionsButtons(!optionsButtons);
  };
​
  return (
    <div>
      {surveys ? (
        <div>
          <h2>Your Surveys</h2>
          {surveys.map((survey) => (
            <div key={survey._id}>
              {survey.name}
              <input
                type="button"
                onClick={() => showOptionsButtons}
                value="..."
              />
              {optionsButtons && (
                <div>
                  <OptionsButtons
                    handleGetAllSurveys={handleGetAllSurveys}
                    survey={survey}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No Surveys Created</p>
      )}
    </div>
  );
};
​
export default ListOfSurveys;
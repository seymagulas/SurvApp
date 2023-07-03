'use client';

import { useState, useEffect } from 'react';
import {
  getAllSurveys,
  deleteSurvey,
  completeSurvey,
  publishSurvey,
  SurveyStatus,
} from '../../../services/survey.service';
import { ISurvey } from '../../../services/survey.service';
import {
  RiDeleteBin6Line,
  RiEdit2Fill,
  RiShareLine,
  RiFolderLockLine,
  RiLockLine,
} from 'react-icons/ri';
import '../../questions/question.css';

import { BsGraphUpArrow } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ListOfSurveys = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<ISurvey[]>([]);

  const handleGetAllSurveys = () => {
    getAllSurveys()
      .then((surveys: ISurvey[]) => {
        setSurveys(surveys);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetAllSurveys();
  }, []);

  const handleDelete = (id: string) => {
    deleteSurvey({ surveyId: id }).then(() =>
      setSurveys(surveys.filter((survey) => survey._id !== id)),
    );
  };

  const handleComplete = (id: string) => {
    completeSurvey({ surveyId: id }).then(() => handleGetAllSurveys());
  };

  const handlePublish = (id: string) => {
    publishSurvey({ surveyId: id }).then(() => handleGetAllSurveys());
    console.log(surveys);
  };

  return (
    <>
      {surveys.length > 0 ? (
        <div className="max-w-md mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Surveys:</h2>
          </div>
          <div>
            {surveys.map((survey) => (
              <div
                key={survey._id}
                className={`question-div flex mb-2 ${survey.status}`}
              >
                <div className="border border-gray-300 rounded-md p-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <p className="flex-grow-1">{survey.name}</p>
                    <div className="flex justify-between ml-2">
                      {survey.status === SurveyStatus.new && (
                        <RiEdit2Fill
                          className="action-button m1-2 ml-1"
                          aria-label="Edit survey"
                          title="Edit"
                          onClick={() => {
                            navigate(`/survey/${survey._id}/edit`);
                          }}
                        />
                      )}
                      <RiDeleteBin6Line
                        className="action-button m1-2 ml-1"
                        aria-label="Delete survey"
                        title="Delete"
                        onClick={() => handleDelete(survey._id ?? '')}
                      />
                      {survey.status === SurveyStatus.published && (
                        <RiShareLine
                          className="action-button m1-2 ml-1"
                          aria-label="Share survey"
                          title="Share"
                          onClick={() => {
                            navigate(`/survey/${survey._id}/send-by-email`);
                          }}
                        />
                      )}
                      {survey.status === SurveyStatus.new && (
                        <RiFolderLockLine
                          aria-label="Publish survey"
                          title="Publish"
                          className="action-button m1-2 ml-1"
                          onClick={() => handlePublish(survey._id ?? '')}
                        />
                      )}
                      {survey.status === SurveyStatus.published && (
                        <RiLockLine
                          className="action-button m1-2 ml-1"
                          aria-label="Complete survey"
                          title="Complete"
                          onClick={() => handleComplete(survey._id ?? '')}
                        />
                      )}
                      {survey.status === SurveyStatus.completed && (
                        <BsGraphUpArrow
                          className="action-button m1-2 ml-1"
                          aria-label="Survey statistics"
                          title="Statistics"
                          onClick={() => {
                            navigate(`/survey/${survey._id}/stats`);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No Surveys Created</p>
      )}
    </>
  );
};

export default ListOfSurveys;

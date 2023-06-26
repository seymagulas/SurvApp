'use client'
import { useState, useEffect } from "react";
import {surveysFromDataBase} from "../../apiServices";
import {ISurvey} from '../../interfaces'
import OptionsButtons from './optionsButtons';

const ListOfSurveys = (userId: number) => {
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [optionsButtons, setOptionsButtons] = useState<Boolean>(false);


  useEffect(()=> {
    surveysFromDataBase(userId)
    .then((survey: ISurvey) => {setSurveys(survey);
    });
  }, []);

 

  const showOptionsButtons = () => {
    if (optionsButtons){
      setOptionsButtons(!optionsButtons)
    }setOptionsButtons(optionsButtons)
  }

  return (
    <div>
      <h2>Your Surveys</h2>
      {surveys.map((survey) => (
        <div key={survey._id}>
          {survey.name}
          <input type='button' onClick={showOptionsButtons}>...</input> 
            {optionsButtons && (
              <div>
                <OptionsButtons setSurveys={setSurveys} />
              </div>
            )}
        </div>
      ))}
    </div>
  )
}

export default ListOfSurveys;
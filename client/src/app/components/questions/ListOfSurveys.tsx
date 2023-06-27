'use client'
import { useState, useEffect } from "react";
import {surveysFromDataBase} from "../../apiServices";
import {ISurvey, PropButtons} from '../../interfaces'
import OptionsButtons from './OptionsButtons';


const ListOfSurveys = ({userId}: PropButtons) => {
  const [surveys, setSurveys] = useState<ISurvey[]>([]);
  const [optionsButtons, setOptionsButtons] = useState<Boolean>(false);


  useEffect(()=> {
    surveysFromDataBase(userId)
    .then((surveys: ISurvey[]) => {
      setSurveys(surveys);
    })
    .catch((error: Error) =>{
      console.log(error)
    });
  }, []);

 

  const showOptionsButtons = () => {
    setOptionsButtons(!optionsButtons)
  }

  return (
    <div>
      {surveys.length > 0 ? (
        <div>
      <h2>Your Surveys</h2>
      {surveys.map((survey) => (
        <div key={survey._id}>
          {survey.name}
          <input type='button' onClick={showOptionsButtons} value='...'/>
            {optionsButtons && (
              <div>
                <OptionsButtons setSurveys={setSurveys} survey={survey}/>
              </div>
            )}
        </div>
      ))}
      </div>
      ) : (
        <p>No Surveys Created</p>
      )}
    </div>
  )
}

export default ListOfSurveys;
'use client'
import { useState } from "react";
import {BsTrash} from "react-icons/bs";


const MultiChoiceQuestion = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);


  const addInput = () => {
    setInputValues([... inputValues, ""])
  }

  const addAnswer = (index:number, newTopic: string) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = newTopic;
    setAnswers(updatedInputValues);
  }

  const deleteAnswer = (TopicToDelete:string) => {
    const updatedAnswers = answers.filter((topic) => topic !== TopicToDelete);
    setAnswers(updatedAnswers);
  }

  const saveAnswers = () => {
    setAnswers(inputValues)
  }

  return (
    <div>
      <div className="multiChoiceAddAnswer">
        <input type="button" id="addAnswer" value="Add Answer" name="addAnswer" onClick={(addInput)}/>
      </div>
      <div className="MultiChoice-responses">
        {inputValues.map((value, index) => (
          <div key={value}>
            <input type="text" value={value} onChange={(event) => addAnswer(index, event.target.value)}/>
              <BsTrash onClick={() => deleteAnswer(value)}/>
          </div>
        ))}
        <input type='submit' onClick={saveAnswers}/>
      </div>
    </div>
  )
}

export default MultiChoiceQuestion
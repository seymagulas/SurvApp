'use client'
import { useState } from "react";
import {BsTrash} from "react-icons/bs";


const MultiChoiceQuestion = () => {
  const allowPatterns = /^[a-zA-Z0-9-_.?]+$/
  const [inputValues, setInputValues] = useState<string[]>([]);


  const addInput = () => {
    setInputValues([... inputValues, ""])
  }

  const addAnswer = (index:number, newTopic: string) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = newTopic;
    setInputValues(updatedInputValues);
  }

  const deleteAnswer = (TopicToDelete:string) => {
    const updatedAnswers = inputValues.filter((topic) => topic !== TopicToDelete);
    setInputValues(updatedAnswers);
  }

  const saveAnswers = () => {
    const sanitizedAnswers = inputValues.some((charAt) => !allowPatterns.test(charAt));
    if (sanitizedAnswers) {
      alert(`There are not allowed characters in your answers: ${sanitizedAnswers}`)
    } else {
    setInputValues(inputValues)
    }
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
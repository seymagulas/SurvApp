'use client'
import { useState } from "react";
import {BsTrash} from "react-icons/bs";
import {AiOutlinePlusCircle} from "react-icons/ai";


const MultiChoiceQuestion = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState<string>('')


  const addInput = () => {
    setInputValues([... inputValues, ""])
  }

  const addAnswer = (newTopic: string) => {
    setAnswers([...answers, newTopic]);
    resetInputValues();
    setNewTopic('');
  }
  const resetInputValues = () => {
    return inputValues.filter((values) => values !== '');
  }


  const deleteAnswer = (TopicToDelete:string) => {
    return answers.filter((topic) => topic !== TopicToDelete)
  }

  return (
    <div>
      <div className="multiChoiceAddAnswer">
        <input type="button" id="addAnswer" value="Add Answer" name="addAnswer" onClick={(addInput)}/>
      </div>
      <div className="MultiChoice-responses">
        {inputValues.map((value) => (
          <div key={value}>
            <input type="text" value={value} onChange={(event) => setNewTopic(event.target.value)}/>
            {value !== '' ? (
              <BsTrash onClick={() => deleteAnswer(value)}/>
            ) : (
              <AiOutlinePlusCircle onClick={() => addAnswer(newTopic)}/>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiChoiceQuestion
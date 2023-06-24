'use client'
import { useState } from "react";
import {BsTrash} from "react-icons/bs";


const Emails = () => {
  const [emailsList, setEmailsList] = useState<string[]>([]);
  const [inputEmails, setInputEmails] = useState<string[]>([]);


  const addInput = () => {
    setInputEmails([... inputEmails, ""])
  }

  const addAnswer = (index:number, newTopic: string) => {
    const updatedInputEmails = [...inputEmails];
    updatedInputEmails[index] = newTopic;
    setEmailsList(updatedInputEmails);
  }

  const deleteEmail = (EmailToDelete:string) => {
    const updatedEmails = emailsList.filter((email) => email !== EmailToDelete);
    setEmailsList(updatedEmails);
  }

  const sendEmails = () => {
// LOGIC FOR THE BE OR FE
  }

  return (
    <div>
      <div className="addNewEmail">
        <input type="button" id="addEmail" value="Add Email" name="addEmail" onClick={(addInput)}/>
      </div>
      <div className="email-list">
        {inputEmails.map((email, index) => (
          <div key={email}>
            <input type="text" value={email} onChange={(event) => addAnswer(index, event.target.value)}/>
              <BsTrash onClick={() => deleteEmail(email)}/>
          </div>
        ))}
        <input type='submit' value='Send' onClick={sendEmails}/>
      </div>
    </div>
  )
}

export default Emails
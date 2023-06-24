'use client'
import React from "react";
import { useState } from "react";
import {BsTrash} from "react-icons/bs";


const emails = () => {
  const [emailsList, setEmailsList] = useState<string[]>([]);
  const [addEmail, setAddEmail] = useState<string[]>([]);
  const [email, setEmail] = useState<string>('');


  const addNewEmail = () => {
    setAddEmail([... addEmail, ""])
  }

  const deleteEmail = (EmailToDelete:string) => {
    return emailsList.filter((email) => email !== EmailToDelete)
  }





  return (
    <div className="email-container">
      <div className="emails-list">
        <input type="button" id="addEmail" value="Add Email" name="addEmail" onClick={(addNewEmail)}/>
      </div>
      <div className="email-list">
        {addEmail.map((email) => (
          <div key={email}>
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
              <BsTrash onClick={() => deleteEmail(email)}/>
          </div>
        ))}
      </div>
    </div>
  )

}

export default emails
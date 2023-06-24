'use client'
import React from "react";
import { useState } from "react";

const RangeQuestion = () =>{
  const [answer, setAnswer] = useState<number>(0);

  const addAnswer = (value: string) => {
    setAnswer(Number(value))
  }

  const range: number[] = [1, 2, 3, 4, 5]

  return (
    <div>
      {range.map((value) => (
        <div key={value}>
          <label htmlFor={value.toString()}>{value}</label>
          <input type='checkbox' id={value.toString()} value={value.toString()} onChange={(event) => addAnswer(event.target.value)}/>
        </div>
      ))}
    </div>
  )
}

export default RangeQuestion
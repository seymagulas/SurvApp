'use client'
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
          <input type='checkbox' id={value.toString()} value={value.toString()} onChange={(event) => addAnswer(event.target.value)}/>
          <label htmlFor={value.toString()}>{value}</label>
        </div>
      ))}
    </div>
  )
}

export default RangeQuestion
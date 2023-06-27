import { Dispatch, SetStateAction } from "react";

export interface ISurvey{
    _id: number,
    userId: number,
    name: string,
    complete: Boolean,
    publish: Boolean
}

export interface ButtonProps {
    setSurveys: Dispatch<SetStateAction<ISurvey[]>>;
    survey: ISurvey
};


export interface PropButtons {
    userId: number
  }
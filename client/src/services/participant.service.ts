'use strict';

import axios from 'axios';
import { toast } from 'react-toastify';
import { IQuestion } from './survey.service';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export interface IParticipantQuestion extends IQuestion {
  isLastQuestion: boolean;
}

export interface IGetQuestionForParticipantRequest {
  hash: string;
}

/**
  - The getQuestionForParticipant will be used when the participant opens the
  url that was sent by email.

  - Example url: http://localhost:3001/survey?hash=d7ee2ab7fbf082438880bd1d78b50e6e5179f718

  - This method also should be called after getting success response from the sendAnswer method.
  Every time the getQuestionForParticipant called the next available question will be returned from the server.
  When the server returns the last question, the isLastQuestion flag will be set to true. And the UI will be
  able to show Continue/Finish buttons according to this flag's value.
 */
export const getQuestionForParticipant = async ({
  hash,
}: IGetQuestionForParticipantRequest): Promise<IParticipantQuestion> => {
  try {
    const response = await axios.get(`${API_URL}/survey/${hash}/participate`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
    throw error;
  }
};

export interface ISendAnswerRequest {
  hash: string;
  data: {
    questionId: string;
    answerId: string;
    isFinished: boolean;
  };
}

/**
  - The sendAnswer will be used to send the participant's answer to the server.
  
  - questionId, answerId and isFinished values should be sent inside data object.
  
  - isFinished flag will be produced by the isLastQuestion flag that comes from the 
  response of getQuestionForParticipant request.
 */
export const sendAnswer = async ({ hash, data }: ISendAnswerRequest) => {
  try {
    const response = await axios.post(
      `${API_URL}/survey/${hash}/participate`,
      data,
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

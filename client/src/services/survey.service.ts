'use strict';

import axios from 'axios';
import { toast } from 'react-toastify';
import { authHeader } from './auth.header';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export interface IAnswerOption {
  _id?: string;
  text: string;
  score?: number;
}

export const enum QuestionChoiceType {
  multiChoice = 'multi-choice',
  range = 'range',
}

export interface IQuestion {
  _id?: string;
  text: string;
  choiceType: QuestionChoiceType;
  answerOptions?: IAnswerOption[];
}

export const enum SurveyStatus {
  new = 'new',
  published = 'published',
  completed = 'completed',
}

export interface ISurvey {
  _id?: string;
  userId?: string;
  name: string;
  questions: IQuestion[];
  status?: SurveyStatus;
}

export const getAllSurveys = async (): Promise<ISurvey[]> => {
  try {
    const response = await axios.get(`${API_URL}/survey`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
    throw error;
  }
};

export interface ISurveyRequest {
  surveyId?: string;
}
export const getSurvey = async ({
  surveyId,
}: ISurveyRequest): Promise<ISurvey | null> => {
  try {
    if (!surveyId) {
      return null;
    }
    const response = await axios.get(`${API_URL}/survey/${surveyId}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
    throw error;
  }
};

export interface ICreateSurveyRequest {
  data: ISurvey;
}

export const createSurvey = async ({
  data,
}: ICreateSurveyRequest): Promise<ISurvey> => {
  try {
    const response = await axios.post(`${API_URL}/survey`, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
    throw error;
  }
};

export interface IUpdateSurveyRequest {
  data: ISurvey;
  surveyId: string;
}

export const updateSurvey = async ({
  data,
  surveyId,
}: IUpdateSurveyRequest): Promise<ISurvey> => {
  try {
    const response = await axios.put(`${API_URL}/survey/${surveyId}`, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
    throw error;
  }
};

export const deleteSurvey = async ({ surveyId }: ISurveyRequest) => {
  try {
    const response = await axios.delete(`${API_URL}/survey/${surveyId}`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

export const publishSurvey = async ({ surveyId }: ISurveyRequest) => {
  try {
    const response = await axios.put(`${API_URL}/survey/${surveyId}/publish`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

export const completeSurvey = async ({ surveyId }: ISurveyRequest) => {
  try {
    const response = await axios.put(`${API_URL}/survey/${surveyId}/complete`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

export interface IShareSurveyRequest {
  surveyId: string;
  data: {
    emails: string[];
  };
}

export const shareSurvey = async ({ surveyId, data }: IShareSurveyRequest) => {
  try {
    const response = await axios.post(
      `${API_URL}/survey/${surveyId}/share`,
      data,
      {
        headers: authHeader(),
      },
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

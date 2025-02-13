import axios from 'axios';
import type { PredictionResult } from './types';

const API_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const signup = async (username: string, password: string) => {
  try {
    const response = await api.post('/signup', { username, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};

export const signin = async (username: string, password: string) => {
  try {
    const response = await api.post('/signin', { username, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};

export const predict = async (formData: FormData) => {
  try {
    const response = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};

export const getUserResults = async (username: string): Promise<PredictionResult[]> => {
  try {
    const response = await api.get(`/results/${username}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
};
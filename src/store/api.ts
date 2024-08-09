export const BASE_URL = 'https://gazprom.hopto.org/api';
import { RegisterDataProps } from 'src/services/types';
const TOKEN = localStorage.getItem('token');
const headers = {
  authorization: `Bearer ${TOKEN}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

type RequestOptionsType = RequestInit & {
  headers: Record<string, string>;
};

export const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((data) => {
    return Promise.reject(
      `Ошибка ${response.status}: ${data.message || 'Неизвестная ошибка'}`
    );
  });
};

const request = (endpoint: string, options?: RequestOptionsType) =>
  fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);

export const registration = async ({ email, password }: RegisterDataProps) => {
  const options: RequestOptionsType = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
  return await request('/token/', options);
};

export const getMembers = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers,
  };
  
  return await request('/v1/members/', options);
};

export const BASE_URL = 'https://gazprom.hopto.org';
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
  return await request('/api/token/', options);
};

export const getProfile = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers,
  };
  const response = await request('/api/v1/users/me/', options);
  return response;
};

export const getMembersAmount = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers,
  };
  const response = await request('/api/v1/members/', options);
  return response;
};

export const getMembers = async (page: number) => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers,
  };
  return await request(`/api/v1/members/?page=${page}`, options);
};

export const getTeams = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers,
  };
  return await request('/api/v1/teams/', options);
};

export const getProjects = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers,
  };
  return await request('/api/v1/projects/', options);
};

export const getTeamsId = async (id: number) => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers,
  };
  return await request(`/api/v1/teams/${id}/`, options);
};

// export const getFilters = async () => {
//   return await request('/api/v1/filters/');
// };

// export const getMembersValue = async (value: string) => {
//   const options: RequestOptionsType = {
//     method: 'GET',
//     headers,
//   };
//   return await request(`/api/v1/members/?department=${value}`, options);
// };
// `/?department=${department}` : ''}
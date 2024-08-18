export const BASE_URL = 'https://gazprom.hopto.org';
import { RegisterDataProps } from 'src/services/types';

const getToken = () => {
  return localStorage.getItem('token');
};

const createHeaders = () => {
  const TOKEN = getToken();
  return {
    authorization: `Bearer ${TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

type RequestOptionsType = RequestInit & {
  headers: Record<string, string>;
};

export const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((data) => {
    console.error('Ошибка ответа:', data);
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
    headers: createHeaders(),
    body: JSON.stringify({ email, password }),
  };
  return await request('/api/token/', options);
};

export const getProfile = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers: createHeaders(),
  };
  const response = await request('/api/v1/users/me/', options);
  return response;
};

export const getMembersAmount = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers: createHeaders(),
  };
  const response = await request('/api/v1/members/', options);
  return response;
};

export const getMembers = async (page: number) => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers: createHeaders(),
  };
  return await request(`/api/v1/members/?page=${page}`, options);
};

export const getTeams = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers: createHeaders(),
  };
  return await request('/api/v1/teams/', options);
};

export const getProjects = async () => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers: createHeaders(),
  };
  return await request('/api/v1/projects/', options);
};

export const getTeamsId = async (id: number) => {
  const options: RequestOptionsType = {
    method: 'GET',
    headers: createHeaders(),
  };
  return await request(`/api/v1/teams/${id}/`, options);
};

// export const postTeamsId = async (name: string, owner: string) => {
//   const options: RequestOptionsType = {
//     method: 'POST',
//     headers,
//   };
//   return await request(`/api/v1/teams/${id}/`, options);
// };

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
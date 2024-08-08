import { RegisterDataProps } from './types';
export const BASE_URL = 'https://gazprom.hopto.org/api'
const TOKEN = localStorage.getItem('token');
console.log('TOKEN: ', TOKEN);

const getResponseData = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json()
}

const headers = {
  // authorization: `Bearer ${TOKEN}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const registration = ({email, password}: RegisterDataProps) => {
  return fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(getResponseData)
}

export const getMembers = () => {
  return fetch(`${BASE_URL}/members/`, {
    method: 'GET',
    headers,
  }).then(getResponseData);
};

// export const getTeams = () => {
//   return fetch(`${BASE_URL}/members/`, {
//     method: 'GET',
//     headers,
//   }).then(getResponseData);
// };

// export const getCategoryValue = (value) => {
//   return fetch(`${BASE_URL}/api/?category=${value}`, {
//     method: 'GET',
//   }).then(getResponseData);
// };




// export const sendSmsPhone = ({ phone_number }) => {
//   return fetch(`${BASE_URL}/api/users/send_sms/`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       phone_number,
//     }),
//   }).then(getResponseData)
// }

// export const confirmRegistration = ({ phone_number, sms_code }) => {
//   return fetch(`${BASE_URL}/api/users/confirm_phone/`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       phone_number,
//       sms_code,
//     }),
//   }).then(getResponseData)
// }

// export const login = ({ username, password }) => {
//   return fetch(`${BASE_URL}/api/users/login/`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username,
//       password,
//     }),
//   })
//   .then(getResponseData)
// }

// export const logout = () => {
//   const TOKEN = localStorage.getItem('token');
//   const headers = {
//     authorization: `Bearer ${TOKEN}`,
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   };
//   return fetch(`${BASE_URL}/api/users/logout/`, {
//     method: 'POST',
//     headers,
//   })
//   .then(getResponseData)
// }
// console.log('headers: ', headers);

// export const getProfile = () => {
//   const TOKEN = localStorage.getItem('token');
//   const headers = {
//     authorization: `Bearer ${TOKEN}`,
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   };  return fetch(`${BASE_URL}/api/users/me/`, {
//     method: 'GET',
//     headers,
//   }).then(getResponseData)
// }



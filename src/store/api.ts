type RequestOptionsType = RequestInit & {
  headers: Record<string, string>
}

export const BASE_URL = 'https://gazprom.hopto.org/api'

export const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json()
  }
  return response
    .json()
    .then(response => Promise.reject(`Ошибка ${response.status}`))
}

const request = (endpoint: string, options?: RequestOptionsType) =>
  fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)

export const registration = async () => await request('/token')


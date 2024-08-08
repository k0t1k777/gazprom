type RequestOptionsType = RequestInit & {
  headers: Record<string, string>
}

export const BASE_URL = 'https://sagaart5.hopto.org/api/v1'

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

export const getEventsData = async () => await request('/events')
export const getArtsData = async (limit?: number) =>
  await request(`/arts${limit ? `/?limit=${limit}` : ''}`)
export const getPopularArts = async () => await request('/arts/most_popular')
export const getArtById = async (id: number) => await request(`/arts/${id}`)
export const getSearchFields = async () =>
  await request('/arts/art_search_fields')


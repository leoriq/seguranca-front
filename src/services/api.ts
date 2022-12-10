import axios from 'axios'
export const baseURL = 'https://localhost:3333'
const api = axios.create({
  baseURL,
})

export default api

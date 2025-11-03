import axios from "axios"

/*Lib es donde se pueden hacer los env y los */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKENZXY")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

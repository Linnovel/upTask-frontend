import axios from "axios"

/*Lib es donde se pueden hacer los env y los */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default api

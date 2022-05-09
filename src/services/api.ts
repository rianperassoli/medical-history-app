import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://medical-history-api.herokuapp.com' || 'http://localhost:3000'
})
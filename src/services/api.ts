import axios from 'axios'
console.log(process.env.environment);

export const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000'
})
import axios from 'axios'
import { VITE_SERVER_URL } from '../constants'

export const api = axios.create({
	baseURL: VITE_SERVER_URL,
})

// Add auth token to requests
api.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

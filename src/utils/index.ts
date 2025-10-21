import axios from 'axios'
import { VITE_SERVER_URL } from '../constants'
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInMonths,
	differenceInSeconds,
	differenceInYears,
} from 'date-fns'

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

export function formatTimeAgo(createdAt: Date | string | number): string {
	const date = new Date(createdAt)
	const now = new Date()

	const seconds = differenceInSeconds(now, date)
	const minutes = differenceInMinutes(now, date)
	const hours = differenceInHours(now, date)
	const days = differenceInDays(now, date)
	const months = differenceInMonths(now, date)
	const years = differenceInYears(now, date)

	if (seconds < 60) return 'Seconds ago'
	else if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`
	else if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
	else if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
	else if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
	else return `${years} year${years === 1 ? '' : 's'} ago`
}

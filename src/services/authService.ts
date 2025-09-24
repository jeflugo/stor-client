import type { LoginData, RegisterData, TUser } from '../types/auth'

const VITE_SERVER_URL =
	import.meta.env.VITE_SERVER_URL || 'http://localhost:3001/api' // Your backend URL

export const authService = {
	async login(credentials: LoginData): Promise<{ user: TUser; token: string }> {
		const response = await fetch(`${VITE_SERVER_URL}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		})

		if (!response.ok) {
			const error = await response.json()
			throw new Error(error.message || 'Login failed')
		}

		return response.json()
	},

	async register(
		userData: RegisterData
	): Promise<{ user: TUser; token: string }> {
		const response = await fetch(`${VITE_SERVER_URL}/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})

		if (!response.ok) {
			const error = await response.json()
			throw new Error(error.message || 'Registration failed')
		}

		return response.json()
	},

	async getCurrentUser(token: string): Promise<TUser> {
		const response = await fetch(`${VITE_SERVER_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Failed to get user data')
		}

		return response.json()
	},
}

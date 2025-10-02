import type { LoginData, RegisterData, TUser } from '../types/auth'
import { api } from '../utils'

export const authService = {
	async login(credentials: LoginData): Promise<{ user: TUser; token: string }> {
		const { data } = await api.post('/users/login', credentials)

		if (!data) {
			throw new Error('Login failed')
		}

		return data
	},

	async register(
		userData: RegisterData
	): Promise<{ user: TUser; token: string }> {
		const { data } = await api.post('/users/register', userData)

		if (!data) {
			throw new Error('Registration failed')
		}

		return data
	},

	async getCurrentUser(token: string): Promise<TUser> {
		console.log(token)
		const { data } = await api.get('/users/me')
		if (!data) {
			throw new Error('Failed to get user data')
		}

		return data
	},
}

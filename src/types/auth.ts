export type TUser = {
	id: string
	username: string
	email: string
	password: string
}

export type TStateContext = {
	user: TUser | null
	login: (userData: TUser) => void
	logout: () => void
	isLoggedIn: boolean
}

export type AuthState = {
	user: TUser | null
	isAuthenticated: boolean
	isLoading: boolean
}

export type LoginData = {
	email: string
	password: string
}

export type RegisterData = {
	name: string
	username: string
	email: string
	password: string
}

export type AuthContextType = AuthState & {
	login: (data: LoginData) => Promise<void>
	register: (data: RegisterData) => Promise<void>
	logout: () => void
	clearErrors: () => void
}

export type TUser = {
	id?: string
	name: string
	username: string
	email: string
	password: string
	avatar?: string
}

export type TUserContext = {
	user: TUser | null
	loading: boolean
	isAuthenticated: boolean
	login: (userData: TUser, token: string) => void
	register: (userData: TUser, token: string) => void
	logout: () => void
}

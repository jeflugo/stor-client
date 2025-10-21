import type { Dispatch, SetStateAction } from 'react'

export type TUserComment = {
	postId: string
	content: string
}

export type TUser = {
	_id: string
	name: string
	username: string
	email: string
	password: string
	avatar?: string
	bio?: string
}

export type TUserContext = {
	user: TUser | null
	setUser: Dispatch<SetStateAction<TUser | null>>
	loading: boolean
	isAuthenticated: boolean
	login: (userData: TUser, token: string) => void
	register: (userData: TUser, token: string) => void
	logout: () => void
}

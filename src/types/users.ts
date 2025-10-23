import type { Dispatch, SetStateAction } from 'react'

export type TAuthor = {
	_id?: string
	username: string
	avatar?: string
}

export type TNotification = {
	_id?: string
	author: TAuthor
	type: string
	postId: string
	postTitle?: string
	commentId?: string
	content?: string
	createdAt?: Date | string
}

export type TUser = {
	_id: string
	name: string
	username: string
	email: string
	password: string
	avatar?: string
	bio?: string
	following?: TAuthor[]
	followers?: TAuthor[]
	notifications: TNotification[]
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

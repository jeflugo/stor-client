export type TAuthor = {
	_id?: string
	name: string
	username: string
	avatar?: string
}

export type TMedia = {
	url: string
	key: string
	type: 'image' | 'video'
	size: number
	thumbnail?: string
	duration?: number
}

export type TComment = {
	_id?: string
	author: TAuthor
	content: string
	createdAt?: string
}

export type TPost = {
	_id: string
	author: TAuthor
	title: string
	content: string
	media: TMedia[]
	comments: TComment[]
	likes: string[]
	createdAt: string
}

export type TFormData = {
	title: string
	content: string
	media: File | null
}

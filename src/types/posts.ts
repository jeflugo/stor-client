export type TAuthor = {
	_id?: string
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
	likes: TAuthor[]
	createdAt: Date | string
}

export type TPost = {
	_id: string
	author: TAuthor
	title: string
	content: string
	media: File | null
	comments: TComment[]
	likes: TAuthor[]
	createdAt: string
}

export type TFormData = {
	title: string
	content: string
	media: File | null
}

export type TPostEditorInfo = {
	_id: string
	title: string
	content: string
	media: File | null
}

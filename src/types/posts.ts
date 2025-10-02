export interface Media {
	url: string
	key: string
	type: 'image' | 'video'
	size: number
	thumbnail?: string
	duration?: number
}

export interface Post {
	_id: string
	author: string
	title: string
	content: string
	media: Media[]
	createdAt: string
}

export type TFormData = {
	title: string
	content: string
	media: File | null
}

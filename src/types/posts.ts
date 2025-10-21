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
	id: string
	title: string
	content: string
	media: File | null
}

export type TPostContext = {
	showDeletePost: boolean
	toggleDeletePost: () => void
	deletePost: () => void
	deletedPosts: string[]
	targetedPostId: string | undefined
	setTargetedPostId: React.Dispatch<React.SetStateAction<string | undefined>>

	showPostEditor: boolean
	togglePostEditor: () => void
	editPost: () => void
	postEditorInfo: TPostEditorInfo
	setPostEditorInfo: React.Dispatch<React.SetStateAction<TPostEditorInfo>>
	visibleUpdatedPost: TPostEditorInfo
	updateVisiblePost: (postData: TPostEditorInfo) => void
}

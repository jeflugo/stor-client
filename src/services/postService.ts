import type { TFormData } from '../types/posts'
import { api } from '../utils'

const createPost = async (postData: TFormData) => {
	const { title, content, media } = postData
	const formInfo = new FormData()
	formInfo.append('title', title)
	formInfo.append('content', content)
	if (media) {
		formInfo.append('media', media)
	}
	const { data } = await api.post('/posts', formInfo)
	if (!data) {
		throw new Error('Post creation failed')
	}
}

export { createPost }

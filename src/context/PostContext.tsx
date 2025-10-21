import { createContext, useContext, useState } from 'react'
import type { TPostContext, TPostEditorInfo } from '../types/posts'
import { api } from '../utils'
import toast from 'react-hot-toast'

const PostContext = createContext<TPostContext | undefined>(undefined)

// Provider component
export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [showDeletePost, setshowDeletePost] = useState(false)
	const [targetedPostId, setTargetedPostId] = useState<string>()
	const [deletedPosts, setDeletedPosts] = useState<string[]>([])

	const [postEditorInfo, setPostEditorInfo] = useState<TPostEditorInfo>({
		id: '',
		title: '',
		content: '',
		media: null,
	})
	const [showPostEditor, setShowPostEditor] = useState(false)
	const [visibleUpdatedPost, setVisibleUpdatedPost] = useState<TPostEditorInfo>(
		{
			id: '',
			title: '',
			content: '',
			media: null,
		}
	)

	const toggleDeletePost = () => setshowDeletePost(!showDeletePost)
	const deletePost = () => {
		api.delete(`/posts/${targetedPostId}`)
		toast.success('Post deleted successfully')
		setDeletedPosts([...deletedPosts, targetedPostId!])
		toggleDeletePost()
	}

	const togglePostEditor = () => setShowPostEditor(!showPostEditor)
	const editPost = () => {
		api.patch(`/posts/${postEditorInfo?.id}`)
		toast.success('Post edited successfully')
		setPostEditorInfo({
			id: '',
			title: '',
			content: '',
			media: null,
		})
		togglePostEditor()
	}
	const updateVisiblePost = (postData: TPostEditorInfo) =>
		setVisibleUpdatedPost(postData)

	const value: TPostContext = {
		deletedPosts,

		showDeletePost,
		toggleDeletePost,
		deletePost,
		targetedPostId,
		setTargetedPostId,

		showPostEditor,
		togglePostEditor,
		editPost,
		postEditorInfo,
		setPostEditorInfo,
		updateVisiblePost,
		visibleUpdatedPost,
	}

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

// Custom hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export const usePost = () => {
	const context = useContext(PostContext)
	if (context === undefined) {
		throw new Error('usePost must be used within an PostProvider')
	}
	return context
}

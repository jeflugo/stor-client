import { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Post from './Post'
import type { TPostEditorInfo, TPost } from '../../types/posts'
import { api } from '../../utils'
import PostEditor from './PostEditor'
import toast from 'react-hot-toast'
// import StoriesAndOffers from './StoriesAndOffers'
export default function Home() {
	// const [isStories, setIsStories] = useState(true)

	// const toggleStories = () => setIsStories(!isStories)
	const [deletedPosts, setDeletedPosts] = useState<string[]>([])
	const [showPostEditor, setShowPostEditor] = useState(false)
	const [postEditorInfo, setPostEditorInfo] = useState<TPostEditorInfo>({
		_id: '',
		title: '',
		content: '',
		media: null,
	})
	const [posts, setPosts] = useState<TPost[]>()
	// const { visibleUpdatedPost } = usePost()
	const [visibleUpdatedPost, setVisibleUpdatedPost] = useState<TPostEditorInfo>(
		{
			_id: '',
			title: '',
			content: '',
			media: null,
		}
	)

	useEffect(() => {
		const fetchPosts = async () => {
			const { data } = await api.get('/posts')
			setPosts(data)
		}
		fetchPosts()
	}, [])

	const handleDelete = (postId: string) => {
		api.delete(`/posts/${postId}`)
		toast.success('Post deleted successfully')
		setDeletedPosts([...deletedPosts, postId])
	}

	const togglePostEditor = () => setShowPostEditor(!showPostEditor)
	return (
		<div>
			<Header />
			{/* <StoriesAndOffers isStories={isStories} /> */}
			<section className='mt-4 min-h-dvh'>
				{posts &&
					posts.map(post => {
						const { _id } = post

						//* Skip any deleted posts
						if (deletedPosts.includes(_id)) return null

						//* Show updates for any updated post
						if (visibleUpdatedPost._id === _id) {
							const newPostData: TPost = {
								...post,
								title: visibleUpdatedPost.title,
								content: visibleUpdatedPost.content,
								media: visibleUpdatedPost.media,
							}
							return (
								<Post
									key={_id}
									post={newPostData}
									handleDelete={handleDelete}
									togglePostEditor={togglePostEditor}
									setPostEditorInfo={setPostEditorInfo}
								/>
							)
						}
						return (
							<Post
								key={_id}
								post={post}
								handleDelete={handleDelete}
								togglePostEditor={togglePostEditor}
								setPostEditorInfo={setPostEditorInfo}
							/>
						)
					})}
			</section>
			<Footer />
			{showPostEditor && (
				<PostEditor
					postEditorInfo={postEditorInfo}
					setVisibleUpdatedPost={setVisibleUpdatedPost}
					togglePostEditor={togglePostEditor}
				/>
			)}
		</div>
	)
}

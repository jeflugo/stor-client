import { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Post from './Post'
import type { TPost } from '../../types/posts'
import { api } from '../../utils'
import DeletePrompter from './DeletePrompter'
import { usePost } from '../../context/PostContext'
import PostEditor from './PostEditor'
// import StoriesAndOffers from './StoriesAndOffers'
export default function Home() {
	// const [isStories, setIsStories] = useState(true)

	// const toggleStories = () => setIsStories(!isStories)
	const [posts, setPosts] = useState<TPost[]>()
	const { showDeletePost, deletedPosts, showPostEditor, visibleUpdatedPost } =
		usePost()

	useEffect(() => {
		const fetchPosts = async () => {
			const { data } = await api.get('/posts')
			setPosts(data)
		}
		fetchPosts()
	}, [])
	return (
		<div>
			<Header />
			{/* <StoriesAndOffers isStories={isStories} /> */}
			<section className='mt-4 min-h-dvh'>
				{posts &&
					posts.map(post => {
						const { _id } = post

						//* Skip eny deleted posts
						if (deletedPosts.includes(_id)) return null

						//* Show updates for any updated post
						if (visibleUpdatedPost.id === _id) {
							const newPostData: TPost = {
								...post,
								title: visibleUpdatedPost.title,
								content: visibleUpdatedPost.content,
								media: visibleUpdatedPost.media,
							}
							return <Post key={_id} post={newPostData} />
						}
						return <Post key={_id} post={post} />
					})}
			</section>
			<Footer />
			{showDeletePost && <DeletePrompter />}
			{showPostEditor && <PostEditor />}
		</div>
	)
}

import { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Post from './Post'
import type { TPost } from '../../types/posts'
import { api } from '../../utils'
// import StoriesAndOffers from './StoriesAndOffers'
export default function Home() {
	// const [isStories, setIsStories] = useState(true)

	// const toggleStories = () => setIsStories(!isStories)
	const [posts, setPosts] = useState<TPost[]>()

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
			<section className='mt-4'>
				{posts && posts.map(post => <Post key={post._id} post={post} />)}
			</section>
			<Footer />
		</div>
	)
}

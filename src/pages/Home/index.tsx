import { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Post from './Post'
// import StoriesAndOffers from './StoriesAndOffers'
export default function Home() {
	const [isStories, setIsStories] = useState(true)

	const toggleStories = () => setIsStories(!isStories)
	return (
		<div>
			<Header isStories={isStories} toggleStories={toggleStories} />
			{/* <StoriesAndOffers isStories={isStories} /> */}
			<section className='mt-4'>
				<Post />
				<Post />
				<Post />
				<Post />
			</section>
			<Footer />
		</div>
	)
}

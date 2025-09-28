import Header from './Header'
import Body from './Body'
import Interactions from './Interactions'
import Comments from './Comments'
import { useState } from 'react'

export default function Post() {
	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => setShowComments(!showComments)

	return (
		<div className='mb-6'>
			<Header />
			<Body />
			<Interactions toggleComments={toggleComments} />
			{showComments && <Comments toggleComments={toggleComments} />}
		</div>
	)
}

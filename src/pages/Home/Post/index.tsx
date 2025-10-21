import Header from './Header'
import Body from './Body'
import Interactions from './Interactions'
import Comments from './Comments'
import { useState } from 'react'
import type { TPost } from '../../../types/posts'

export default function Post({ post }: { post: TPost }) {
	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => setShowComments(!showComments)

	const { _id, author, title, content, comments, likes, createdAt } = post
	return (
		<div className='mb-6'>
			<Header
				author={author}
				createdAt={createdAt}
				postId={_id}
				title={title}
				content={content}
			/>
			<Body title={title} content={content} />
			<Interactions
				toggleComments={toggleComments}
				comments={comments}
				likes={likes}
				postId={_id}
			/>
			{showComments && (
				<Comments toggleComments={toggleComments} postId={_id} />
			)}
		</div>
	)
}

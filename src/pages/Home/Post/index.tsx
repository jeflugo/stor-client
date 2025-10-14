import Header from './Header'
import Body from './Body'
import Interactions from './Interactions'
import Comments from './Comments'
import { useState } from 'react'
import type { TPost } from '../../../types/posts'

export default function Post({ post }: { post: TPost }) {
	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => setShowComments(!showComments)

	const { _id, author, title, content, comments, likes } = post
	return (
		<div className='mb-6'>
			<Header author={author} time='2 days ago' />
			<Body title={title} content={content} />
			<Interactions
				toggleComments={toggleComments}
				commentsAmount={comments.length}
				likesAmount={likes.length}
			/>
			{showComments && (
				<Comments
					toggleComments={toggleComments}
					comments={comments}
					postId={_id}
				/>
			)}
		</div>
	)
}

import Header from './Header'
import Body from './Body'
import Interactions from './Interactions'
import Comments from './Comments'
import { useState } from 'react'
import type { TPost, TPostEditorInfo } from '../../../types/posts'

export default function Post({
	post,
	handleDelete,
	togglePostEditor,
	setPostEditorInfo,
}: {
	post: TPost
	handleDelete: (postId: string) => void
	togglePostEditor: () => void
	setPostEditorInfo: React.Dispatch<React.SetStateAction<TPostEditorInfo>>
}) {
	const [showComments, setShowComments] = useState(false)
	const toggleComments = () => setShowComments(!showComments)
	const [likesAmount, setLikesAmount] = useState(post.likes.length)
	const [commentsAmount, setCommentsAmount] = useState(post.comments.length)

	const { _id, author, title, content, likes, createdAt } = post
	return (
		<div className='mb-6'>
			<Header
				author={author}
				createdAt={createdAt}
				postId={_id}
				title={title}
				content={content}
				handleDelete={handleDelete}
				togglePostEditor={togglePostEditor}
				setPostEditorInfo={setPostEditorInfo}
			/>
			<Body title={title} content={content} />
			<Interactions
				toggleComments={toggleComments}
				likes={likes}
				postId={_id}
				likesAmount={likesAmount}
				setLikesAmount={setLikesAmount}
				commentsAmount={commentsAmount}
				postAuthorId={author._id!}
				postTitle={title}
			/>
			{showComments && (
				<Comments
					toggleComments={toggleComments}
					postId={_id}
					setCommentsAmount={setCommentsAmount}
					postAuthorId={author._id!}
				/>
			)}
		</div>
	)
}

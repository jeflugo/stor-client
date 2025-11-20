import { useUser } from '../../context/UserContext'
import type { TComment } from '../../types/posts'
import type { TNotification } from '../../types/users'
import { api } from '../../utils'
import SingleComment from './SingleComment'
import { useEffect, useRef, useState } from 'react'

export default function Comment({
	postId,
	setCommentsAmount,
	postAuthorId,
	highlightedCommentId,
}: {
	postId: string
	setCommentsAmount: React.Dispatch<React.SetStateAction<number>>
	postAuthorId: string
	highlightedCommentId: string | null
}) {
	const { user } = useUser()
	const [commentContent, setCommentContent] = useState('')
	const [comments, setComments] = useState<TComment[]>([])
	const [ownComments, setOwnComments] = useState<TComment[]>([])
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const stablePostId = useRef(postId)
	const [highlightedCommentIndex, sethighlightedCommentIndex] = useState<
		number | null
	>(null)

	const { avatar, _id } = user!

	// Fetch comments on load
	useEffect(() => {
		const fetchComments = async () => {
			const { data }: { data: TComment[] } = await api.get(
				`/posts/comments/${stablePostId.current}`
			)
			if (!data) return console.log('error')
			setComments(data)
		}
		fetchComments()
	}, [])

	useEffect(() => {
		if (highlightedCommentId && comments.length > 0)
			sethighlightedCommentIndex(
				comments.findIndex(comment => comment._id === highlightedCommentId)
			)
	}, [highlightedCommentId, comments])

	const sendMessage = async () => {
		const requestInfo = {
			type: 'comment',
			author: _id,
			content: commentContent,
		}

		const { data: newComment } = await api.patch(
			`/posts/actions/${postId}`,
			requestInfo
		)
		if (!newComment) return console.log('error')

		setOwnComments(prev => [newComment, ...prev])
		setCommentContent('')
		setCommentsAmount(prev => prev + 1)

		//! if the user if the post author he/she wont get notified
		if (user!._id === postAuthorId) return

		//* NOTIFY USER
		const notificationInfo: TNotification = {
			author: {
				_id: user!._id,
				username: user!.username,
				avatar: user!.avatar,
			},
			type: 'comment',
			postId,
			commentId: newComment._id!,
			content: commentContent,
		}

		const { data: notificationData } = await api.patch(
			`/users/notify-user/${postAuthorId}`,
			notificationInfo
		)
		if (!notificationData) console.log('Post Like notification error')
	}

	return (
		<div className='min-h-80'>
			<div className='h-full overflow-y-scroll pt-4 pb-25'>
				{ownComments.length === 0 && comments.length === 0 && (
					<div className='text-center'>No comments yet</div>
				)}
				{highlightedCommentIndex !== null && (
					<SingleComment
						key={comments[highlightedCommentIndex]._id!}
						author={comments[highlightedCommentIndex].author}
						content={comments[highlightedCommentIndex].content}
						createdAt={comments[highlightedCommentIndex].createdAt}
						postId={postId}
						commentId={comments[highlightedCommentIndex]._id!}
						likes={comments[highlightedCommentIndex].likes}
						setCommentsAmount={setCommentsAmount}
						postAuthorId={postAuthorId}
						isHighlighted={true}
					/>
				)}
				{ownComments.length > 0 &&
					ownComments.map(({ _id, author, content, createdAt, likes }) => (
						<SingleComment
							key={_id!}
							author={author}
							content={content}
							createdAt={createdAt}
							postId={postId}
							commentId={_id!}
							likes={likes}
							setCommentsAmount={setCommentsAmount}
							postAuthorId={postAuthorId}
						/>
					))}
				{comments.length > 0 &&
					comments.map(({ _id, author, content, createdAt, likes }, index) => {
						if (highlightedCommentIndex === index) return
						return (
							<SingleComment
								key={_id!}
								author={author}
								content={content}
								createdAt={createdAt}
								postId={postId}
								commentId={_id!}
								likes={likes}
								setCommentsAmount={setCommentsAmount}
								postAuthorId={postAuthorId}
							/>
						)
					})}
			</div>
			<div className='fixed w-full bottom-0 bg-white'>
				<div className='border-t p-3 flex gap-2 items-end'>
					<img
						src={`${avatar ? '/user.png' : '/default-user.png'}`}
						alt='User avatar'
						className={`w-10 h-10 rounded-full`}
					/>
					<textarea
						ref={textareaRef}
						value={commentContent}
						onChange={e => setCommentContent(e.target.value)}
						placeholder='Write a comment'
						className='outline-none flex-1 min-h-7 overflow-y-auto resize-none'
						rows={1}
					/>
					<button
						className='text-blue-500 font-semibold disabled:opacity-50'
						onClick={sendMessage}
						disabled={!commentContent}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

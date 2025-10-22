import { IoClose } from 'react-icons/io5'
import SingleComment from './SingleComment'
import { useEffect, useRef, useState } from 'react'
import type { TComment } from '../../../types/posts'
import { useUser } from '../../../context/UserContext'
import { api } from '../../../utils'

export default function Comment({
	toggleComments,
	postId,
	setCommentsAmount,
}: {
	toggleComments: () => void
	postId: string
	setCommentsAmount: React.Dispatch<React.SetStateAction<number>>
}) {
	const { user } = useUser()
	const [commentContent, setCommentContent] = useState('')
	const [comments, setComments] = useState<TComment[]>([])
	const [ownComments, setOwnComments] = useState<TComment[]>([])
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const stablePostId = useRef(postId)

	const { avatar, _id } = user!

	useEffect(() => {
		// Save the current scroll position
		const scrollY = window.scrollY

		// Disable scroll
		document.body.style.position = 'fixed'
		document.body.style.top = `-${scrollY}px`
		document.body.style.width = '100%'

		// Re-enable scroll when component unmounts
		return () => {
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			window.scrollTo(0, scrollY)
		}
	}, [])

	// Auto-adjust height based on content
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}, [commentContent])

	// Fetch comments on load
	useEffect(() => {
		const fetchComments = async () => {
			const { data } = await api.get(`/posts/comments/${stablePostId.current}`)
			if (!data) return console.log('error')
			setComments(data)
		}
		fetchComments()
	}, [])

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

		console.log(newComment)
		setOwnComments(prev => [newComment, ...prev])
		setCommentContent('')
		setCommentsAmount(prev => prev + 1)
	}

	return (
		<div
			className={`rounded-tr-3xl rounded-tl-3xl border h-[80dvh] fixed bottom-0 w-full bg-white z-1`}
		>
			<div className='flex gap-2 p-2  border-b border-gray-300'>
				<div onClick={toggleComments}>
					<IoClose size={30} />
				</div>
				<h3 className='text-lg'>Comments</h3>
			</div>
			<div className='h-full overflow-y-scroll pt-4 pb-29'>
				{ownComments.length === 0 && comments.length === 0 && (
					<div className='text-center'>No comments yet</div>
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
						/>
					))}
				{comments.length > 0 &&
					comments.map(({ _id, author, content, createdAt, likes }) => (
						<SingleComment
							key={_id!}
							author={author}
							content={content}
							createdAt={createdAt}
							postId={postId}
							commentId={_id!}
							likes={likes}
							setCommentsAmount={setCommentsAmount}
						/>
					))}
			</div>
			<div className='absolute w-full bottom-0 bg-white'>
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

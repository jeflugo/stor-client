import { IoClose } from 'react-icons/io5'
import SingleComment from './SingleComment'
import { useEffect, useRef, useState } from 'react'
import type { TAuthor, TComment, TPost } from '../../../types/posts'
import { useUser } from '../../../context/UserContext'
import { api } from '../../../utils'

export default function Comment({
	toggleComments,
	comments,
	postId,
}: {
	toggleComments: () => void
	comments: TComment[]
	postId: string
}) {
	const { user } = useUser()
	const [commentContent, setCommentContent] = useState('')
	const [ownComments, setOwnComments] = useState<TComment[]>([])
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const { avatar, username, name } = user!

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

	const sendMessage = async () => {
		const commentAuthor: TAuthor = {
			name,
			username,
			avatar,
		}
		const newComment: TComment = {
			author: commentAuthor,
			content: commentContent,
		}

		const inverseOwnComments = [...ownComments].sort((a, b) => {
			const indexA = ownComments.indexOf(a)
			const indexB = ownComments.indexOf(b)
			return indexB - indexA
		})

		const postChanges: Partial<TPost> = {
			comments: [...comments, ...inverseOwnComments, newComment],
		}

		const { data } = await api.patch(`/posts/actions/${postId}`, postChanges)

		if (!data) console.log('error')

		setOwnComments(prev => [newComment, ...prev])

		setCommentContent('')
	}

	return (
		<div
			className={`rounded-tr-3xl rounded-tl-3xl border h-[80dvh] sticky bottom-0 bg-white z-1`}
		>
			<div className='flex gap-2 p-2  border-b border-gray-300'>
				<div onClick={toggleComments}>
					<IoClose size={30} />
				</div>
				<h3 className='text-lg'>Comments</h3>
			</div>
			<div className='h-full overflow-y-scroll pt-4 pb-29'>
				{ownComments &&
					ownComments.map(({ _id, author, content }) => (
						<SingleComment
							key={_id}
							author={author}
							content={content}
							time='35 min'
						/>
					))}
				{comments.length > 0 ? (
					comments.map(({ _id, author, content }) => (
						<SingleComment
							key={_id}
							author={author}
							content={content}
							time='35 min'
						/>
					))
				) : (
					<div className='text-center'>No comments yet</div>
				)}
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

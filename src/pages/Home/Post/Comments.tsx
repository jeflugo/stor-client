import { IoClose } from 'react-icons/io5'
import SingleComment from './SingleComment'
import { useEffect, useRef, useState } from 'react'

export default function Comment({
	toggleComments,
}: {
	toggleComments: () => void
}) {
	const [comment, setComment] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement>(null)

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
	}, [comment])

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
			<div className='h-full overflow-y-scroll pt-4'>
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
				<SingleComment />
			</div>
			<div className='absolute w-full bottom-0 bg-white'>
				<div className='border-t p-3 flex gap-2 items-end'>
					<img
						src='/user.png'
						alt=''
						className='w-8 h-8 rounded-full border-2 border-green-500 p-[1px]'
					/>
					<textarea
						ref={textareaRef}
						value={comment}
						onChange={e => setComment(e.target.value)}
						placeholder='Write a comment'
						className='outline-none flex-1 min-h-7 overflow-y-auto resize-none'
						rows={1}
					/>
					<div className='text-blue-500 font-semibold'>Send</div>
				</div>
			</div>
		</div>
	)
}

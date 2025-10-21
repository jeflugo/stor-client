import { useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { usePost } from '../../context/PostContext'

export default function DeletePrompter() {
	const { toggleDeletePost, deletePost } = usePost()
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

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				toggleDeletePost()
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleDeletePost])

	return (
		<div className='fixed bg-black/50 top-0 left-0 w-dvw h-dvh flex justify-center items-center'>
			<div className='bg-white border border-gray-200 rounded-sm w-2/3 max-w-sm '>
				<div className='flex items-center justify-between px-4'>
					<h3 className='text-xl'>Delete Post?</h3>
					<CgClose onClick={toggleDeletePost} />
				</div>
				<div className='border-t border-gray-300 flex text-center'>
					<button className='w-1/2 text-red-500' onClick={deletePost}>
						Yes
					</button>
					<button
						className='w-1/2 border-l border-gray-300'
						onClick={toggleDeletePost}
					>
						No
					</button>
				</div>
			</div>
		</div>
	)
}

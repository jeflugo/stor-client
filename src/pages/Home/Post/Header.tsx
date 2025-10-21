import { Link } from 'react-router-dom'

import type { TAuthor } from '../../../types/posts'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { useUser } from '../../../context/UserContext'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { MdOutlineEdit } from 'react-icons/md'
import { CiTrash } from 'react-icons/ci'
import { formatTimeAgo } from '../../../utils'
import { usePost } from '../../../context/PostContext'
// import { FaStar } from 'react-icons/fa'
// import { RiExpandDiagonalLine } from 'react-icons/ri'

export default function Header({
	author,
	createdAt,
	location,
	postId,
	title,
	content,
}: {
	author: TAuthor
	createdAt: string
	location?: string
	postId: string
	title: string
	content: string
}) {
	const { _id, username, avatar } = author
	const { user } = useUser()
	const [options, setOptions] = useState(false)
	const [itsOwnPost, setItsOwnPost] = useState(false)

	const {
		toggleDeletePost,
		setTargetedPostId,
		togglePostEditor,
		setPostEditorInfo,
	} = usePost()

	useEffect(() => {
		if (_id === user?._id) setItsOwnPost(true)
	}, [_id, user])

	const toggleOptions = () => setOptions(!options)
	const handlePostEditor = () => {
		setPostEditorInfo({
			id: postId,
			title,
			content,
			media: null,
		})
		togglePostEditor()
		toggleOptions()
	}
	const handleDeletePost = () => {
		setTargetedPostId(postId)
		toggleDeletePost()
	}
	return (
		<div className='flex justify-between items-center px-2'>
			<div className='flex items-center gap-2'>
				<img
					src={`${avatar ? '/user.png' : '/default-user.png'}`}
					alt='User avatar'
					className={`w-10 h-10 rounded-full `}
				/>
				<div>
					<h3>
						<Link to={`/${username}`}>
							<span className='font-bold'>{username}</span>
						</Link>
						<span className='text-sm text-gray-600'>
							{' '}
							• {formatTimeAgo(createdAt)}
						</span>
					</h3>
					{location && (
						<p className='font-thin text-xs'>Puerto Ordaz, Edo. Bolivar</p>
					)}
				</div>
			</div>
			<div className='flex gap-2'>
				{/* <FaStar size={25} color='gold' /> */}
				{/* <RiExpandDiagonalLine size={25} /> */}
				<div className='relative'>
					<HiOutlineDotsVertical size={25} onClick={toggleOptions} />
					<div
						className={`bg-white border border-gray-200 absolute top-6 right-2 rounded-md px-2 py-1 shadow-xl text-right whitespace-nowrap ${
							options ? '' : 'hidden'
						}`}
					>
						{itsOwnPost ? (
							<>
								<div
									className='flex items-center gap-1'
									onClick={handlePostEditor}
								>
									<MdOutlineEdit size={20} />
									<p className='hover:opacity-50 active:opacity-50'>
										Edit post
									</p>
								</div>
								<div
									className='flex items-center gap-1 text-red-500'
									onClick={handleDeletePost}
								>
									<CiTrash size={20} />
									<p className='hover:opacity-50 active:opacity-50'>
										Delete post
									</p>
								</div>
							</>
						) : (
							<div className='flex items-center gap-1'>
								<IoAlertCircleOutline size={20} />
								<p className='hover:opacity-50 active:opacity-50'>Report</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

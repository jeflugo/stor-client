import { FaCheck, FaHeart, FaRegHeart } from 'react-icons/fa'
import type { TAuthor } from '../../../types/posts'
import { useEffect, useState, type ChangeEvent } from 'react'
import { api, formatTimeAgo } from '../../../utils'
import { useUser } from '../../../context/UserContext'
import { MdOutlineEdit } from 'react-icons/md'
import { CgClose } from 'react-icons/cg'
import { CiTrash } from 'react-icons/ci'

export default function SingleComment({
	author,
	content,
	createdAt,
	postId,
	commentId,
	likes,
	setCommentsAmount,
}: {
	author: TAuthor
	content: string
	createdAt: Date | string
	postId: string
	commentId: string
	likes: TAuthor[]
	setCommentsAmount: React.Dispatch<React.SetStateAction<number>>
}) {
	const [liked, setLiked] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [deleted, setDeleted] = useState(false)
	const [editContent, setEditContent] = useState(content)
	const { username, avatar } = author
	const { user } = useUser()

	useEffect(() => {
		const likeIndex = likes.findIndex(like => like._id === user!._id)
		if (likeIndex !== -1) setLiked(true)
	}, [user, likes])

	const toggleLike = async () => {
		const requestInfo = {
			type: 'like',
			author: user?._id,
			commentId,
		}

		const { data } = await api.patch(
			`/posts/comment-actions/${postId}`,
			requestInfo
		)

		if (!data) console.log('error')

		setLiked(!liked)
	}
	const toggleEditing = () => setIsEditing(!isEditing)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEditContent(e.target.value)

	const handleEdit = async () => {
		const requestInfo = {
			commentId,
			content: editContent,
		}
		const { data } = await api.patch(`/posts/comments/${postId}`, requestInfo)
		if (!data) console.log('server error editing')
		setIsEditing(false)
	}

	const toggleDelete = () => setIsDeleting(!isDeleting)
	const handleDelete = async () => {
		const requestInfo = {
			commentId,
		}
		const { data } = await api.put(`/posts/comments/${postId}`, requestInfo)
		if (!data) console.log('server error editing')
		setDeleted(true)
		setCommentsAmount(prev => prev - 1)
	}
	return (
		<div
			className={`flex px-2 mb-2 justify-between items-start ${
				deleted ? 'hidden' : ''
			}`}
		>
			<div className='flex gap-2'>
				<div>
					<img
						src={`${avatar ? '/user.png' : '/default-user.png'}`}
						alt='User avatar'
						className={`w-10 h-10 rounded-full`}
					/>
				</div>
				<div>
					<h4 className='flex items-center gap-1'>
						<span className='font-bold'>{username}</span>
						<span className='text-sm text-gray-600'>
							• {formatTimeAgo(createdAt)}
						</span>
						{user?._id === author._id && (
							<>
								<MdOutlineEdit
									onClick={toggleEditing}
									className={`${isEditing ? 'hidden' : ''}`}
								/>
								<div className='relative'>
									<CiTrash onClick={toggleDelete} />
									{isDeleting && (
										<div className='bg-white border border-gray-400 rounded-sm absolute top-4 right-1 text-nowrap font-bold'>
											<h4 className='px-1'>Are you sure?</h4>

											<div className='flex border-t border-gray-400 text-center'>
												<p
													className='text-red-500 w-1/2'
													onClick={handleDelete}
												>
													Yes
												</p>
												<p
													className='border-l border-gray-400 w-1/2'
													onClick={toggleDelete}
												>
													No
												</p>
											</div>
										</div>
									)}
								</div>
							</>
						)}
					</h4>
					{isEditing ? (
						<div>
							<input
								type='text'
								value={editContent}
								onChange={handleChange}
								className='border px-1 rounded-md'
							/>
							<div className='flex justify-end mt-1 gap-1 items-center'>
								<CgClose color='red' size={20} onClick={toggleEditing} />
								<FaCheck color='green' onClick={handleEdit} />
							</div>
						</div>
					) : (
						<p className='text-wrap'>{editContent}</p>
					)}
				</div>
			</div>
			<div className='flex items-center gap-1'>
				<span>{likes.length > 0 && likes.length}</span>
				{liked ? (
					<FaHeart onClick={toggleLike} color='red' />
				) : (
					<FaRegHeart onClick={toggleLike} />
				)}
			</div>
		</div>
	)
}

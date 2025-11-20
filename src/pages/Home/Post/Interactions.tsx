import { useEffect, useState } from 'react'
import { BsShare } from 'react-icons/bs'
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { RiMessage3Line } from 'react-icons/ri'
import { useUser } from '../../../context/UserContext'
import type { TAuthor } from '../../../types/posts'
import { api } from '../../../utils'
import type { TNotification } from '../../../types/users'

export default function Interactions({
	toggleComments,
	likes,
	postId,
	likesAmount,
	setLikesAmount,
	commentsAmount,
	postAuthorId,
	postTitle,
}: {
	toggleComments: () => void
	likes: TAuthor[]
	postId: string
	likesAmount: number
	setLikesAmount: React.Dispatch<React.SetStateAction<number>>
	commentsAmount: number
	postAuthorId: string
	postTitle: string
}) {
	const { user } = useUser()
	const [liked, setLiked] = useState(false)
	const [saved, setSaved] = useState(false)

	useEffect(() => {
		const isLiked = likes.findIndex(like => like._id === user!._id)
		if (isLiked !== -1) setLiked(true)
	}, [user, likes])

	const toggleLike = async () => {
		const requestInfo = {
			type: 'like',
			author: user!._id,
		}

		const { data } = await api.patch(`/posts/actions/${postId}`, requestInfo)

		if (!data) console.log('error')

		setLiked(!liked)
		if (!liked) setLikesAmount(prev => prev + 1)
		else setLikesAmount(prev => prev - 1)

		//! if the user if the post author he/she wont get notified
		if (user!._id === postAuthorId) return

		//* NOTIFY USER
		const notificationInfo: TNotification = {
			author: {
				_id: user!._id,
				username: user!.username,
				avatar: user!.avatar,
			},
			type: liked ? 'deleteLike' : 'like',
			postId,
			postTitle,
		}

		const { data: notificationData } = await api.patch(
			`/users/notify-user/${postAuthorId}`,
			notificationInfo
		)
		if (!notificationData) console.log('Post Like notification error')
	}
	const toggleSaved = () => setSaved(!saved)
	return (
		<div className='px-2'>
			<div className='flex justify-between my-2'>
				<div className='flex gap-2'>
					{liked ? (
						<FaHeart size={25} onClick={toggleLike} color='red' />
					) : (
						<FaRegHeart size={25} onClick={toggleLike} />
					)}
					<RiMessage3Line size={25} onClick={toggleComments} />
					<BsShare size={25} />
				</div>
				{saved ? (
					<FaBookmark size={25} onClick={toggleSaved} color='gold' />
				) : (
					<FaRegBookmark size={25} onClick={toggleSaved} />
				)}
			</div>
			<div className='flex gap-1'>
				{likesAmount > 0 && (
					<div className='flex gap-4'>
						<p className='font-bold'>{likesAmount} Likes</p>
					</div>
				)}
				{commentsAmount > 0 && (
					<div onClick={toggleComments}>
						<p>• see {commentsAmount} comments</p>
					</div>
				)}
			</div>
		</div>
	)
}

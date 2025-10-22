import { useEffect, useState } from 'react'
import { BsShare } from 'react-icons/bs'
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { RiMessage3Line } from 'react-icons/ri'
import type { TAuthor } from '../../types/posts'
import { useUser } from '../../context/UserContext'
import { api } from '../../utils'

export default function Interactions({
	likes,
	postId,
	likesAmount,
	commentsAmount,
	setLikesAmount,
}: {
	likes: TAuthor[]
	postId: string
	likesAmount: number
	commentsAmount: number
	setLikesAmount: React.Dispatch<React.SetStateAction<number>>
}) {
	const { user } = useUser()
	const { _id } = user!
	const [liked, setLiked] = useState(false)
	const [saved, setSaved] = useState(false)

	useEffect(() => {
		const isLiked = likes.findIndex(like => like._id === _id)
		if (isLiked !== -1) setLiked(true)
	}, [_id, likes])

	const toggleLike = async () => {
		const requestInfo = {
			type: 'like',
			author: _id,
		}

		const { data } = await api.patch(`/posts/actions/${postId}`, requestInfo)

		if (!data) console.log('error')

		setLiked(!liked)
		if (!liked) setLikesAmount(prev => prev + 1)
		else setLikesAmount(prev => prev - 1)
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
					<RiMessage3Line size={25} />
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
					<div>
						<p>{commentsAmount} comments</p>
					</div>
				)}
			</div>
		</div>
	)
}

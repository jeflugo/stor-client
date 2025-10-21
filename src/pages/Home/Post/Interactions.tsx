import { useEffect, useState } from 'react'
import { BsShare } from 'react-icons/bs'
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { RiMessage3Line } from 'react-icons/ri'
import { useUser } from '../../../context/UserContext'
import type { TAuthor, TComment } from '../../../types/posts'
import { api } from '../../../utils'

export default function Interactions({
	toggleComments,
	likes,
	comments,
	postId,
}: {
	toggleComments: () => void
	likes: TAuthor[]
	comments: TComment[]
	postId: string
}) {
	const { user } = useUser()
	const { _id } = user!
	const [liked, setLiked] = useState(false)
	const [saved, setSaved] = useState(false)
	const likesAmount = likes.length
	const commentsAmount = comments.length

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
			{likesAmount > 0 && (
				<div className='flex gap-4'>
					<p className='font-bold'>{likesAmount} Likes</p>
				</div>
			)}
			{commentsAmount > 0 && (
				<div onClick={toggleComments}>
					<p>see {commentsAmount} comments</p>
				</div>
			)}
		</div>
	)
}

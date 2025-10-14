import { useState } from 'react'
import { BsShare } from 'react-icons/bs'
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { RiMessage3Line } from 'react-icons/ri'

export default function Interactions({
	toggleComments,
	commentsAmount,
	likesAmount,
}: {
	toggleComments: () => void
	commentsAmount: number
	likesAmount: number
}) {
	const [liked, setLiked] = useState(false)
	const [saved, setsaved] = useState(false)

	const toggleLike = () => setLiked(!liked)
	const toggleSaved = () => setsaved(!saved)
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

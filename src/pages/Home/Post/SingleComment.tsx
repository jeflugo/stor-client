import { FaHeart, FaRegHeart } from 'react-icons/fa'
import type { TAuthor } from '../../../types/posts'
import { useState } from 'react'

export default function SingleComment({
	author,
	content,
	time,
}: {
	author: TAuthor
	content: string
	time: string
}) {
	const [liked, setLiked] = useState(false)
	const toggleLike = () => setLiked(!liked)
	const { username, avatar } = author
	return (
		<div className='flex px-2 mb-2 justify-between items-center'>
			<div className='flex gap-2'>
				<div>
					<img
						src={`${avatar ? '/user.png' : '/default-user.png'}`}
						alt='User avatar'
						className={`w-10 h-10 rounded-full`}
					/>
				</div>
				<div>
					<h4>
						<span className='font-bold'>{username}</span>
						<span className='text-sm text-gray-600'> • {time}</span>
					</h4>
					<p>{content}</p>
					{/* <button className='text-gray-400 font-semibold'>Reply</button> */}
				</div>
			</div>
			<div>
				{liked ? (
					<FaHeart onClick={toggleLike} color='red' />
				) : (
					<FaRegHeart onClick={toggleLike} />
				)}
			</div>
		</div>
	)
}

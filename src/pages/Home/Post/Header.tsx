import { Link } from 'react-router-dom'

import { BsThreeDots } from 'react-icons/bs'
import type { TAuthor } from '../../../types/posts'
// import { FaStar } from 'react-icons/fa'
// import { RiExpandDiagonalLine } from 'react-icons/ri'

export default function Header({
	author,
	time,
	location,
}: {
	author: TAuthor
	time: string
	location?: string
}) {
	const { username, avatar } = author
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
						<span className='text-sm text-gray-600'> • {time}</span>
					</h3>
					{location && (
						<p className='font-thin text-xs'>Puerto Ordaz, Edo. Bolivar</p>
					)}
				</div>
			</div>
			<div className='flex gap-2'>
				{/* <FaStar size={25} color='gold' /> */}
				{/* <RiExpandDiagonalLine size={25} /> */}
				<BsThreeDots size={25} />
			</div>
		</div>
	)
}

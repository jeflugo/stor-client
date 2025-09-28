import { BsShare } from 'react-icons/bs'
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { RiMessage3Line } from 'react-icons/ri'

export default function Interactions() {
	return (
		<div>
			<div className='flex justify-between my-2'>
				<div className='flex gap-2'>
					<FaRegHeart size={25} />
					<RiMessage3Line size={25} />
					<BsShare size={25} />
				</div>
				<FaRegBookmark size={25} />
			</div>
			<div className='flex gap-4'>
				<p className='font-bold'>10 reactions</p>
				<p className='font-bold'>5 comments</p>
			</div>
			<div className='p-2 border-b border-gray-300'>
				<input
					type='text'
					placeholder='Leave a comment'
					className='w-full outline-0'
				/>
			</div>
		</div>
	)
}

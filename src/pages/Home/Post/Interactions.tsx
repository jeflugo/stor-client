import { BsShare } from 'react-icons/bs'
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa'
import { RiMessage3Line } from 'react-icons/ri'

export default function Interactions({
	toggleComments,
}: {
	toggleComments: () => void
}) {
	return (
		<div className='px-2'>
			<div className='flex justify-between my-2'>
				<div className='flex gap-2'>
					<FaRegHeart size={25} />
					<RiMessage3Line size={25} />
					<BsShare size={25} />
				</div>
				<FaRegBookmark size={25} />
			</div>
			<div className='flex gap-4'>
				<p className='font-bold'>10 Likes</p>
			</div>
			<div onClick={toggleComments}>
				<p className=''>see 5 comments</p>
			</div>
		</div>
	)
}

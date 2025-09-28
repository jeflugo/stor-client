import { FaRegHeart } from 'react-icons/fa'

export default function SingleComment() {
	return (
		<div className='flex px-2 mb-2'>
			<div className='flex gap-2'>
				<div>
					<img
						src='/user.png'
						alt=''
						className='w-8 h-8 rounded-full border-2 border-green-500 p-[1px]'
					/>
				</div>
				<div>
					<h4>
						<span className='font-bold'>Mobiltech</span>
						<span className='text-sm text-gray-600'> • 35 min</span>
					</h4>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
					<button className='text-gray-400 font-semibold'>Reply</button>
				</div>
			</div>
			<FaRegHeart />
		</div>
	)
}

import { BsThreeDots } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
// import { RiExpandDiagonalLine } from 'react-icons/ri'

export default function Header() {
	return (
		<div className='flex justify-between items-center px-2'>
			<div className='flex items-center gap-2'>
				<img
					src='/user.png'
					alt=''
					className='w-10 h-10 rounded-full border-2 border-green-500 p-[1px]'
				/>
				<div>
					<h3>
						<span className='font-bold'>Mobiltech</span>
						<span className='text-sm text-gray-600'> • 35 min</span>
					</h3>
					<p className='font-thin text-xs'>Puerto Ordaz, Edo. Bolivar</p>
				</div>
			</div>
			<div className='flex gap-2'>
				<FaStar size={25} color='gold' />
				{/* <RiExpandDiagonalLine size={25} /> */}
				<BsThreeDots size={25} />
			</div>
		</div>
	)
}

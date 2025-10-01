import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export default function Notifications() {
	const navigate = useNavigate()
	return (
		<div>
			<div className='px-2'>
				<div className='mb-2 flex items-center gap-4'>
					<LuArrowLeft size={30} onClick={() => navigate(-1)} />
					<h2 className='text-xl'>Notifications</h2>
				</div>
				<div>
					<div className='flex gap-2 items-center'>
						<img
							src='/user.png'
							alt=''
							className='h-15 w-15 rounded-full border-2 border-blue-500 p-[1px] '
						/>
						<p className='text-sm '>
							<span className='font-bold'>Jeferson</span> liked your comment:
							Lorem ipsum dolor sit amet consectetur adipisicing elit
							<span className='text-gray-500'> 12 min</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

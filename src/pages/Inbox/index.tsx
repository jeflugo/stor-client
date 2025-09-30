import { IoMdSearch } from 'react-icons/io'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export default function Inbox() {
	const lastMessage = true
	const notActive = true
	const navigate = useNavigate()
	return (
		<div>
			<div className='px-2'>
				<div className='mb-2 flex items-center gap-4'>
					<LuArrowLeft size={30} onClick={() => navigate(-1)} />
					<h2 className='text-2xl'>Inbox</h2>
				</div>
				<div>
					<div className='flex items-center gap-3 py-1 px-2 border rounded-lg focus-within:border-blue-500'>
						<IoMdSearch size={30} />
						<input
							type='text'
							className='w-full outline-none border-none'
							placeholder='Search'
						/>
					</div>
				</div>
				<div className='mt-2 flex flex-col gap-2'>
					<div className='flex gap-3'>
						<div className='h-15 w-15 rounded-full border-2 border-blue-500 overflow-hidden'>
							<img src='/user.png' alt='' className='h-full w-full' />
						</div>
						<div className='mt-2'>
							<h3>
								<span className='font-semibold'>Jeferson Lugo</span>
								{notActive && (
									<span className='text-sm text-gray-600'> • 35 min</span>
								)}
							</h3>
							<p className='text-sm text-gray-600'>
								{lastMessage ? (
									<>You : Lorem ipsum</>
								) : (
									<>Jeferson : Lorem ipsum</>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

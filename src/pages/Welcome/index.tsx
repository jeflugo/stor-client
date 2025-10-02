import { useState } from 'react'
import Login from './Login'
import Register from './Register'

export default function Welcome() {
	const [login, setLogin] = useState(true)

	const toggleLogin = () => setLogin(!login)

	return (
		<div className='flex justify-between'>
			<div className='border-r p-4 h-screen w-lg'>
				<div className='p-4 max-w-[500px]'>
					<h2 className='text-3xl text-center'>
						Welcome to <span className='font-bold'>Stor</span>
					</h2>
					<div className='py-4'>
						{login ? (
							<Login toggleLogin={toggleLogin} />
						) : (
							<Register toggleLogin={toggleLogin} />
						)}
					</div>
				</div>
			</div>
			<div className='self-end p-4 hidden md:block'>
				<h1 className='text-7xl text-wrap w-2xs'>
					You create the <span className='text-blue-500'>value.</span>
				</h1>
			</div>
		</div>
	)
}

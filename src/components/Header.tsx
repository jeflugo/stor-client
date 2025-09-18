import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header className='bg-blue-950 text-white'>
			<div className='container mx-auto flex justify-between items-center p-4'>
				<div className='flex space-x-4 items-center'>
					<div>
						<img />
						<h1 className='text-2xl'>
							<Link to='/'>Stor</Link>
						</h1>
					</div>
					<nav>
						<ul className='flex space-x-4'>
							{/* <li>Market</li> */}
							{/* <li>Dashboard</li> */}
						</ul>
					</nav>
				</div>
				<Link to='/login'>Login</Link>
			</div>
		</header>
	)
}

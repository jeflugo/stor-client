import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

export default function Header() {
	// const { user } = useAuth()
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
				{/* {user && <div>Welcome, {user.username}</div>} */}
				<Link to='/login'>Login</Link>
			</div>
		</header>
	)
}

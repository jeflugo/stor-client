import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginButton from './LoginButton'
import UserDetails from './UserDetails'

export default function Header() {
	const { user } = useAuth()
	return (
		<header className='bg-blue-950 text-white'>
			<div className='container mx-auto flex justify-between items-center p-4'>
				<div className='flex space-x-4 items-center'>
					<h1 className='text-2xl font-bold'>
						<Link to='/'>Stor</Link>
					</h1>
					<nav>
						<ul className='flex space-x-4'>
							<Link to='/market'>Market</Link>
							{user && <Link to={'/dashboard'}>Dashboard</Link>}
						</ul>
					</nav>
				</div>
				<div>{user ? <UserDetails /> : <LoginButton />}</div>
			</div>
		</header>
	)
}

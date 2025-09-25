import { useEffect, useState } from 'react'
import { CiLogout, CiSettings } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UserDetails() {
	const { logout } = useAuth()
	const [clicked, setClicked] = useState(false)
	const navigate = useNavigate()

	const handleClick = () => {
		setClicked(!clicked)
	}

	const handleLogout = () => {
		navigate('/')
		logout()
	}

	useEffect(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (!target.closest('.user-details')) setClicked(false)
		}
		document.addEventListener('mousedown', handleDocumentClick)
		return () => document.removeEventListener('mousedown', handleDocumentClick)
	}, [])

	return (
		<div>
			<div
				className='rounded-full border-2 p-1 cursor-pointer relative select-none user-details'
				onClick={handleClick}
			>
				<FaRegUser size={20} />
				<div
					className={`absolute top-8 right-0 rounded-xs bg-blue-950 border border-white  ${
						clicked ? 'block' : 'hidden'
					}`}
				>
					<Link
						to='/settings'
						className='flex items-center gap-1 py-1 px-2 hover:opacity-70 '
					>
						<CiSettings />
						<span>Settings</span>
					</Link>
					<div
						className='flex items-center gap-1 py-1 px-2 hover:opacity-70 cursor-pointer'
						onClick={handleLogout}
					>
						<CiLogout />
						<span>Logout</span>
					</div>
				</div>
			</div>
		</div>
	)
}

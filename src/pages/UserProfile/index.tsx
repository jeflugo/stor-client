import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { TUser } from '../../types/auth'
import { useAuth } from '../../context/AuthContext'

export default function UserProfile() {
	const { username } = useParams<{ username: string }>()
	const { user: currentUser, isAuthenticated } = useAuth()

	const [user, setUser] = useState<TUser>()
	const navigate = useNavigate()

	// Determine what to fetch
	const isOwnProfile =
		!username || username === 'me' || username === currentUser?.username

	useEffect(() => {
		const fetchProfileData = async () => {
			let url = '/users/people/' + (username || currentUser?.username)
			let options = {}

			if (isOwnProfile && isAuthenticated) {
				url = '/users/me' // Get private data for own profile
				options = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			}

			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}${url}`,
				options
			)

			// User not found or server errors
			if (response.status === 500)
				return navigate('/not-found', { replace: true })

			const userData = await response.json()
			setUser(userData)
		}

		// Replace /me or empty with actual username
		if (isAuthenticated && (!username || username === 'me')) {
			navigate(`/${currentUser?.username}`, { replace: true })
		}

		fetchProfileData()
	}, [username, currentUser, isAuthenticated, navigate, isOwnProfile])

	return <div>{user?.username}</div>
}

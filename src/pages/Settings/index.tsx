import { useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils'
import { useUser } from '../../context/UserContext'

export default function Settings() {
	const [lightTheme, setLightTheme] = useState(true)
	const navigate = useNavigate()
	const [isDeleting, setIsDeleting] = useState(false)
	const { user, setUser } = useUser()

	const toggleDelete = () => setIsDeleting(!isDeleting)

	const handleDelete = async () => {
		const { data } = await api.delete(`/users/${user!._id}`)
		if (!data) console.log('Server error')

		setUser(null)
		localStorage.removeItem('token')
		navigate('/')
	}

	const toggleTheme = () => setLightTheme(!lightTheme)
	return (
		<div className='px-2'>
			<div className='mb-2' onClick={() => navigate(-1)}>
				<LuArrowLeft size={30} />
			</div>
			<div className='mb-2'>
				<h3 className='text-lg'>Preferences</h3>
				<div
					className='px-2 py-1 border rounded-sm border-gray-400 bg-gray-100'
					onClick={toggleTheme}
				>
					{lightTheme ? (
						<p>Switch to dark theme</p>
					) : (
						<p>Switch to light theme</p>
					)}
				</div>
			</div>
			<div>
				<h3 className='text-lg text-red-400'>Danger zone</h3>
				<div className='relative'>
					<div
						onClick={toggleDelete}
						className='px-2 py-1 border rounded-sm border-red-300 bg-red-100'
					>
						Delete account
					</div>
					{isDeleting && (
						<div className='bg-white border border-gray-400 rounded-sm absolute top-9 left-0 text-nowrap'>
							<h4 className='px-1'>Confirm</h4>

							<div className='flex border-t border-gray-400 text-center'>
								<p className='text-red-500 w-1/2' onClick={handleDelete}>
									Yes
								</p>
								<p
									className='border-l border-gray-400 w-1/2'
									onClick={toggleDelete}
								>
									No
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

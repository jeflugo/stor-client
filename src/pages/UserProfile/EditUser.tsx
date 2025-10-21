import { CgClose } from 'react-icons/cg'
import { useUser } from '../../context/UserContext'
import { MdOutlineEdit } from 'react-icons/md'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { TUser } from '../../types/users'
import { api } from '../../utils'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function EditUser({ toggleEdit }: { toggleEdit: () => void }) {
	const { user, setUser } = useUser()
	const [formData, setFormData] = useState({
		username: user?.username,
		name: user?.name,
		bio: user?.bio,
	})
	const { username, name, bio } = formData
	const changesMade =
		username !== user?.username || name !== user?.name || bio !== user?.bio
	const navigate = useNavigate()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const userInfo: Partial<TUser> = {
			username,
			name,
			bio,
		}

		const { data } = await api.patch(`/users/${user?._id}`, userInfo)
		if (!data) console.log('User profile editing error')

		toast.success('Profile updated successfully.')
		navigate(`/`)
		setUser({ ...user!, ...userInfo })
	}
	return (
		<div className='absolute top-0 left-0 bg-white w-screen h-screen px-2'>
			<div onClick={toggleEdit} className='flex justify-end'>
				<CgClose size={30} />
			</div>
			<div>
				<h2 className='text-center text-2xl mb-2'>Edit profile</h2>
				<div className='h-25 w-25 rounded-full overflow-hidden m-auto relative'>
					{user?.avatar ? (
						<img src={user?.avatar} alt='' className='h-full w-full' />
					) : (
						<img src='/default-user.png' alt='' className='h-full w-full' />
					)}
					<div className='absolute top-3 right-3 bg-white/50 rounded-full p-1'>
						<MdOutlineEdit />
					</div>
				</div>
				<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
					<label>
						<h3 className='text-lg '>Username</h3>
						<input
							className='px-2 py-1 border w-full outline-blue-500'
							type='text'
							name='username'
							value={username}
							onChange={handleChange}
						/>
					</label>
					<label>
						<h3>Name</h3>
						<input
							className='px-2 py-1 border w-full outline-blue-500'
							type='text'
							name='name'
							value={name}
							onChange={handleChange}
						/>
					</label>
					<label>
						<h3>Bio</h3>
						<input
							className='px-2 py-1 border w-full outline-blue-500'
							type='text'
							name='bio'
							value={bio}
							onChange={handleChange}
						/>
					</label>
					<div className='flex justify-end mt-4'>
						<button
							className='disabled:opacity-50 px-3 py-1 rounded-sm bg-green-500'
							type='submit'
							disabled={!changesMade}
						>
							Save changes
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

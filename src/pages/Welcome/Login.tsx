import { useState } from 'react'
import { api } from '../../utils'
import toast from 'react-hot-toast'
import type { TUser } from '../../types/users'
import { useUser } from '../../context/UserContext'

export default function Login({ toggleLogin }: { toggleLogin: () => void }) {
	const { login } = useUser()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { email, password } = formData

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setIsSubmitting(true)
		const { data } = await api.post('/users/login', formData)

		if (!data) {
			toast.error('Login failed')
			return setIsSubmitting(false)
		}

		if (!data.success) {
			toast.error("Email or password don't match")
			return setIsSubmitting(false)
		}

		setFormData({
			email: '',
			password: '',
		})

		const { user, token }: { user: TUser; token: string } = data
		login(user, token)
		toast.success('Login successful!')
		setIsSubmitting(false)
	}

	return (
		<>
			<h2 className='text-2xl text-center'>Login</h2>
			<form className='flex flex-col space-y-4 mt-4' onSubmit={handleSubmit}>
				<input
					type='email'
					placeholder='Enter your email'
					className='border p-2'
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<input
					type='password'
					placeholder='Enter your password'
					className='border p-2'
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<button
					disabled={isSubmitting || !email || !password}
					className='bg-blue-950 text-white p-2 cursor-pointer disabled:opacity-50'
					type='submit'
				>
					Login
				</button>
			</form>
			<div className='mt-2 text-center hover:opacity-60' onClick={toggleLogin}>
				You don't have an account?, create one!
			</div>
		</>
	)
}

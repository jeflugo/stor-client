import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useAuthForm } from '../../hooks/useAuthForm'

export default function Register({ toggleLogin }: { toggleLogin: () => void }) {
	const { clearError, errors, handleSubmit, isSubmitting } = useAuthForm(false)
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		repeatEmail: '',
		password: '',
		repeatPassword: '',
	})
	const { username, email, repeatEmail, password, repeatPassword } = formData

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))

		clearError(name)
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const success = await handleSubmit(formData)
		if (success) {
			setFormData({
				username: '',
				email: '',
				repeatEmail: '',
				password: '',
				repeatPassword: '',
			})
		}
	}
	return (
		<>
			<h2 className='text-2xl text-center'>Register</h2>
			<div className='mt-4 rounded p-2 border flex items-center justify-center space-x-2 cursor-pointer'>
				<FaGoogle />
				<span>Register with google</span>
			</div>
			<form className='flex flex-col space-y-4 mt-4' onSubmit={onSubmit}>
				<input
					type='text'
					placeholder='Enter your username'
					className={
						`border p-2` + (errors.username && ' border border-red-500 m-0')
					}
					onChange={handleChange}
					name='username'
					value={username}
				/>
				{errors.username && (
					<span className='text-xs text-red-500'>{errors.username}</span>
				)}
				<input
					type='email'
					placeholder='Enter your email'
					className={
						`border p-2` + (errors.email && ' border border-red-500 m-0')
					}
					onChange={handleChange}
					name='email'
					value={email}
				/>
				{errors.email && (
					<span className='text-xs text-red-500'>{errors.email}</span>
				)}

				<input
					type='email'
					placeholder='Repeat your email'
					className={
						`border p-2` + (errors.repeatEmail && ' border border-red-500 m-0')
					}
					onChange={handleChange}
					name='repeatEmail'
					value={repeatEmail}
				/>
				{errors.repeatEmail && (
					<span className='text-xs text-red-500'>{errors.repeatEmail}</span>
				)}

				<input
					type='password'
					placeholder='Enter your password'
					className={
						`border p-2` + (errors.password && ' border border-red-500 m-0')
					}
					onChange={handleChange}
					name='password'
					value={password}
				/>
				{errors.password && (
					<span className='text-xs text-red-500'>{errors.password}</span>
				)}

				<input
					type='password'
					placeholder='Repeat your password'
					className={
						`border p-2` +
						(errors.repeatPassword && ' border border-red-500 m-0')
					}
					onChange={handleChange}
					name='repeatPassword'
					value={repeatPassword}
				/>
				{errors.repeatPassword && (
					<span className='text-xs text-red-500'>{errors.repeatPassword}</span>
				)}

				<button
					disabled={isSubmitting}
					className='bg-blue-950 text-white p-2'
					type='submit'
				>
					Register
				</button>
			</form>
			<div className='mt-2 text-center' onClick={toggleLogin}>
				Already have an account? Login
			</div>
		</>
	)
}

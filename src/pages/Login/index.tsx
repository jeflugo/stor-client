import { FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthForm } from '../../hooks/useAuthForm'

export default function Login() {
	const { clearError, errors, handleSubmit, isSubmitting } = useAuthForm(true)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData

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
				email: '',
				password: '',
			})
		}
	}
	return (
		<div className='container mx-auto p-4 max-w-[500px]'>
			<div className='border py-4 px-8 mt-16'>
				<h2 className='text-2xl text-center'>Login</h2>
				<div className='mt-4 rounded p-2 border flex items-center justify-center space-x-2 cursor-pointer'>
					<FaGoogle />
					<span>Login with google</span>
				</div>
				<form className='flex flex-col space-y-4 mt-4' onSubmit={onSubmit}>
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

					<button
						disabled={isSubmitting}
						className='bg-blue-950 text-white p-2'
						type='submit'
					>
						Login
					</button>
				</form>
				<Link to='/register'>
					<div className='mt-2 text-center'>Create an account</div>
				</Link>
			</div>
		</div>
	)
}

import { useState } from 'react'
import { api } from '../../utils'
import toast from 'react-hot-toast'
import { useUser } from '../../context/UserContext'
import type { TUser } from '../../types/users'

export default function Register({ toggleLogin }: { toggleLogin: () => void }) {
	const { register } = useUser()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		username: '',
		email: '',
		repeatEmail: '',
		password: '',
		repeatPassword: '',
	})
	const [errors, setErrors] = useState({
		name: '',
		username: '',
		email: '',
		repeatEmail: '',
		password: '',
		repeatPassword: '',
	})
	const { name, username, email, repeatEmail, password, repeatPassword } =
		formData

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))

		clearError(name)
	}

	const clearError = (fieldName: string) => {
		setErrors(prev => ({
			...prev,
			[fieldName]: '',
		}))
	}

	const validateForm = () => {
		const newErrors = {
			name: '',
			username: '',
			email: '',
			repeatEmail: '',
			password: '',
			repeatPassword: '',
		}

		let isValid = true

		// Registration validations
		if (formData.name.length < 3) {
			newErrors.name = 'name must be at least 3 characters'
			isValid = false
		}

		if (formData.username.length < 3) {
			newErrors.username = 'Username must be at least 3 characters'
			isValid = false
		}

		// Email validation (for both login and register)
		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid'
			isValid = false
		}

		// Confirm email validation
		if (!formData.repeatEmail) {
			newErrors.repeatEmail = 'Please confirm your email'
			isValid = false
		} else if (formData.email !== formData.repeatEmail) {
			newErrors.repeatEmail = 'Emails do not match'
			isValid = false
		}

		// Password validation
		if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
			isValid = false
		}

		// Confirm password validation
		if (!formData.repeatPassword) {
			newErrors.repeatPassword = 'Please confirm your password'
			isValid = false
		} else if (formData.password !== formData.repeatPassword) {
			newErrors.repeatPassword = 'Passwords do not match'
			isValid = false
		}

		setErrors(newErrors)
		return isValid
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validateForm()) return
		setIsSubmitting(true)
		const { data } = await api.post('/users/register', formData)

		if (!data) {
			toast.error('Registration failed')
			return setIsSubmitting(false)
		}

		if (!data.success) {
			if (data.usernameExist)
				setErrors(prev => ({ ...prev, username: 'Username already exists' }))
			if (data.emailExist)
				setErrors(prev => ({ ...prev, email: 'Email already exists' }))
			return setIsSubmitting(false)
		}

		setFormData({
			name: '',
			username: '',
			email: '',
			repeatEmail: '',
			password: '',
			repeatPassword: '',
		})

		const { user, token }: { user: TUser; token: string } = data
		register(user, token)
		toast.success('Registration successful!')
		setIsSubmitting(false)
	}
	return (
		<>
			<h2 className='text-2xl text-center'>Register</h2>
			<form className='flex flex-col space-y-4 mt-4' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Enter your name'
					className={
						`border p-2` + (errors.name && ' border border-red-500 m-0')
					}
					onChange={handleChange}
					name='name'
					value={name}
				/>
				{errors.name && (
					<span className='text-xs text-red-500'>{errors.name}</span>
				)}

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
					disabled={
						isSubmitting ||
						!name ||
						!username ||
						!email ||
						!password ||
						!repeatPassword
					}
					className='bg-blue-950 text-white p-2 disabled:opacity-50'
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

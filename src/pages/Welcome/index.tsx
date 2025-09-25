import { FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthForm } from '../../hooks/useAuthForm'

export default function Welcome() {
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
		<div className='flex justify-between'>
			<div className='border-r p-4 h-screen w-lg hidden lg:block'>
				<div className='p-4 max-w-[500px]'>
					<h2 className='text-3xl text-center'>
						Welcome to <span className='font-bold'>Stor</span>
					</h2>
					<div className='py-4 px-8 mt-4'>
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
									`border p-2` +
									(errors.password && ' border border-red-500 m-0')
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
							<div className='mt-2 text-center hover:opacity-60'>
								You don't have an account?, create one!
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className='self-end p-4'>
				<h1 className='text-7xl text-wrap w-2xs'>
					You create the <span className='text-blue-500'>value.</span>
				</h1>
			</div>
		</div>
	)
}

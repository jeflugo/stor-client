import { FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Register() {
	return (
		<div className='container mx-auto p-4 max-w-[500px]'>
			<div className='border py-4 px-8 mt-16'>
				<h2 className='text-2xl text-center'>Register</h2>
				<div className='mt-4 rounded p-2 border flex items-center justify-center space-x-2 cursor-pointer'>
					<FaGoogle />
					<span>Register with google</span>
				</div>
				<form className='flex flex-col space-y-4 mt-4'>
					<input
						type='text'
						placeholder='Enter your username'
						className='border p-2'
					/>
					<input
						type='email'
						placeholder='Enter your email'
						className='border p-2'
					/>
					<input
						type='email'
						placeholder='Repeat your email'
						className='border p-2'
					/>
					<input
						type='password'
						placeholder='Enter your password'
						className='border p-2'
					/>
					<input
						type='password'
						placeholder='Repeat your password'
						className='border p-2'
					/>
					<button className='bg-blue-950 text-white p-2'>Register</button>
				</form>
				<Link to='/login'>
					<div className='mt-2 text-center'>Already have an account? Login</div>
				</Link>
			</div>
		</div>
	)
}

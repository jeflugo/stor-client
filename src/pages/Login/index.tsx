import { FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Login() {
	return (
		<div className='container mx-auto p-4 max-w-[500px]'>
			<div className='border py-4 px-8 mt-16 text-center'>
				<h2 className='text-2xl'>Login</h2>
				<div className='mt-4 rounded p-2 border flex items-center justify-center space-x-2 cursor-pointer'>
					<FaGoogle />
					<span>Login with google</span>
				</div>
				<form className='flex flex-col space-y-4 mt-4'>
					<input
						type='text'
						placeholder='Username or email'
						className='border p-2'
					/>
					<input
						type='password'
						placeholder='Password'
						className='border p-2'
					/>
					<button className='bg-blue-950 text-white p-2'>Login</button>
				</form>
				<Link to='/register'>
					<div className='mt-2'>Create an account</div>
				</Link>
			</div>
		</div>
	)
}

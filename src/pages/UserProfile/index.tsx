import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import type { TUser } from '../../types/users'
import { useUser } from '../../context/UserContext'

// import { BsTriangleFill } from 'react-icons/bs'
import { CiLogout, CiSettings } from 'react-icons/ci'
import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IoMdClose, IoMdSearch } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { LuArrowLeft } from 'react-icons/lu'
import { TbWorldShare } from 'react-icons/tb'

export default function UserProfile() {
	const [search, setSearch] = useState(false)
	const [options, setOptions] = useState(false)

	const { user: currentUser, isAuthenticated, logout } = useUser()
	const { username } = useParams<{ username: string }>()

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

	const toggleSearch = () => setSearch(!search)
	const toggleOptions = () => setOptions(!options)
	return (
		<div>
			<div className='px-2'>
				<div className='mb-2' onClick={() => navigate(-1)}>
					<LuArrowLeft size={30} />
				</div>
				<div className='flex gap-3'>
					<div className='h-20 w-20 rounded-full border-2 border-blue-500 overflow-hidden'>
						<img src='/user.png' alt='' className='h-full w-full' />
					</div>
					<div className='flex-1'>
						<div className='flex justify-between'>
							<div>
								<div className='flex items-center gap-2'>
									<h2 className='text-2xl'>
										@<span>{user?.username} </span>
									</h2>
									{/* <div className='flex mt-1'>
										<FaStar color='gold' size={20} />
										<FaStar color='gold' size={20} />
										<FaStar color='gold' size={20} />
										<FaStar color='gold' size={20} />
										<FaStar color='gold' size={20} />
									</div> */}
								</div>
								{!isOwnProfile && (
									<div className='flex gap-2 mt-1'>
										<button className='px-2 rounded-md bg-gray-300 font-semibold'>
											Follow
										</button>
										<button className='px-2 rounded-md bg-gray-300 font-semibold'>
											Message
										</button>
									</div>
								)}

								<div className='flex gap-3 text-center mt-2'>
									<div>
										<p className='text-gray-900 font-semibold '>1546</p>
										<h3 className='text-gray-700'>Posts</h3>
									</div>
									<div>
										<p className='text-gray-900 font-semibold '>1546</p>
										<h3 className='text-gray-700'>Follows</h3>
									</div>
									<div>
										<p className='text-gray-900 font-semibold '>1546</p>
										<h3 className='text-gray-700'>Followers</h3>
									</div>
								</div>
							</div>
							{isOwnProfile && (
								<div className='relative'>
									<HiOutlineDotsVertical size={30} onClick={toggleOptions} />
									<div
										className={`absolute top-10 right-2 flex flex-col gap-2 rounded-md p-2 shadow-xl bg-red-300 ${
											options ? '' : 'hidden'
										}`}
									>
										{/* <BsTriangleFill
											className='absolute -top-4 right-0 shadow-xl text-gray-300 -z-10'
											size={20}
										/> */}
										<Link to='/settings'>
											<div className='flex items-center gap-2'>
												<CiSettings size={20} />
												<h3 className='text-gray-900'>settings</h3>
											</div>
										</Link>
										<div className='flex items-center gap-2' onClick={logout}>
											<CiLogout size={20} />
											<h3 className='text-gray-900'>Logout</h3>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='mb-2'>
					<h3 className='font-semibold text-gray-900'>Jeferson Lugo</h3>
					<p className='text-sm w-3/4'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos velit
						fugiat magnam tempore dolore iusto tempora, quae porro quidem quam
						nesciunt fuga quia debitis molestias ullam odio facere voluptatem
						delectus?
					</p>
				</div>
				<div className='flex justify-between'>
					<div className='flex gap-3'>
						<a href='//github.com/jeflugo' target='_blank'>
							<FaWhatsapp size={30} />
						</a>
						<a href='//github.com/jeflugo' target='_blank'>
							<IoLocationOutline size={30} />
						</a>
						<a href='//github.com/jeflugo' target='_blank'>
							<TbWorldShare size={30} />
						</a>
					</div>
					{search ? (
						<IoMdClose size={30} onClick={toggleSearch} />
					) : (
						<IoMdSearch size={30} onClick={toggleSearch} />
					)}
				</div>
			</div>
			<div className='grid grid-cols-3 mt-2'>
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
				<img src='/post.jpeg' alt='Poster' />
			</div>
		</div>
	)
}

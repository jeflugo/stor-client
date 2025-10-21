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
import { api } from '../../utils'
import type { TPost } from '../../types/posts'
import { MdOutlineEdit } from 'react-icons/md'
import EditUser from './EditUser'

export default function UserProfile() {
	const [search, setSearch] = useState(false)
	const [options, setOptions] = useState(false)
	const [editUser, setEditUser] = useState(false)

	const { user: currentUser, isAuthenticated, logout } = useUser()
	const { username: profileUsername } = useParams<{ username: string }>()

	const [user, setUser] = useState<TUser>()
	const [posts, setPosts] = useState<TPost[]>()
	const navigate = useNavigate()

	// Determine what to fetch
	const isOwnProfile =
		!profileUsername ||
		profileUsername === 'me' ||
		profileUsername === currentUser?.username

	useEffect(() => {
		const fetchProfileData = async () => {
			const url =
				isOwnProfile && isAuthenticated
					? 'me'
					: `people/${profileUsername || currentUser?.username}`

			const { data: userData } = await api.get(`/users/${url}`)
			const { data: postData } = await api.get(`/posts/${url}`)

			setPosts(postData)
			setUser(userData)
		}

		// Replace /me or empty with actual username
		if (isAuthenticated && (!profileUsername || profileUsername === 'me'))
			navigate(`/${currentUser?.username}`, { replace: true })

		fetchProfileData()
	}, [profileUsername, currentUser, isAuthenticated, navigate, isOwnProfile])

	const toggleSearch = () => setSearch(!search)
	const toggleOptions = () => setOptions(!options)

	const toggleEdit = () => setEditUser(!editUser)
	return (
		<div>
			<div className='px-2'>
				<div className='mb-2' onClick={() => navigate(-1)}>
					<LuArrowLeft size={30} />
				</div>
				<div className='flex gap-3'>
					<div className='h-20 w-20 rounded-full overflow-hidden'>
						{user?.avatar ? (
							<img src={user?.avatar} alt='' className='h-full w-full' />
						) : (
							<img src='/default-user.png' alt='' className='h-full w-full' />
						)}
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
										className={`absolute top-7 right-2 flex flex-col gap-2 rounded-md p-2 shadow-xl bg-white border border-gray-200 whitespace-nowrap ${
											options ? '' : 'hidden'
										}`}
									>
										{/* <BsTriangleFill
											className='absolute -top-4 right-0 shadow-xl text-gray-300 -z-10'
											size={20}
										/> */}
										<Link to='/settings'>
											<div className='flex items-center gap-1'>
												<CiSettings size={20} />
												<h3 className='text-gray-900'>Settings</h3>
											</div>
										</Link>
										<div
											className='flex items-center gap-1'
											onClick={toggleEdit}
										>
											<MdOutlineEdit size={20} />
											<h3 className='text-gray-900'>Edit profile</h3>
										</div>
										<div className='flex items-center gap-1' onClick={logout}>
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
					<h3 className='font-semibold text-gray-900'>{user?.name}</h3>
					{user?.bio ? (
						<p className='text-sm w-3/4'>{user.bio}</p>
					) : (
						<p className='text-sm w-3/4 opacity-50'>No bio yet</p>
					)}
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
				{posts ? (
					posts.map(post => {
						return <img key={post._id} src='/post.jpeg' alt='Poster' />
					})
				) : (
					<div>No posts yet</div>
				)}
			</div>
			{editUser && <EditUser toggleEdit={toggleEdit} />}
		</div>
	)
}

import { AiOutlineHome } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoAddCircleOutline } from 'react-icons/io5'
import { LuUser } from 'react-icons/lu'
import { RiMessage3Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

export default function Footer() {
	const { user } = useUser()
	return (
		<div className='sticky bottom-0 bg-white'>
			<div className='flex justify-evenly mt-auto py-4 border-t '>
				<Link to='/'>
					<AiOutlineHome size={40} />
				</Link>

				<Link to='/notifications'>
					<IoIosNotificationsOutline size={40} />
				</Link>

				<Link to='/create-post'>
					<IoAddCircleOutline size={40} />
				</Link>

				<Link to='/inbox'>
					<RiMessage3Line size={40} />
				</Link>

				<Link to={`/${user?.username}`}>
					<LuUser size={40} />
				</Link>
			</div>
		</div>
	)
}

import { CiSearch } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoAddCircleOutline } from 'react-icons/io5'
import { LuUser } from 'react-icons/lu'
import { RiMessage3Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export default function Footer() {
	return (
		<div className='sticky bottom-0 bg-white'>
			<div className='flex justify-evenly mt-auto py-4 border-t '>
				<Link to='/search'>
					<CiSearch size={40} />
				</Link>

				<Link to='/notification'>
					<IoIosNotificationsOutline size={40} />
				</Link>

				<Link to='/create-post'>
					<IoAddCircleOutline size={40} />
				</Link>

				<Link to='/messages'>
					<RiMessage3Line size={40} />
				</Link>

				<Link to='/profile'>
					<LuUser size={40} />
				</Link>
			</div>
		</div>
	)
}

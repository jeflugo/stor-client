import { AiOutlineHome } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineLocalOffer, MdOutlineWebStories } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Header({
	isStories,
	toggleStories,
}: {
	isStories: boolean
	toggleStories: () => void
}) {
	return (
		<div className='flex items-center justify-between gap-2 px-2 py-1'>
			<Link to='/'>
				<AiOutlineHome size={40} />
			</Link>
			<Link to='/search' className='flex-1'>
				<div className='border rounded-full relative py-1'>
					<input type='text' />
					<CiSearch size={30} className='absolute top-0 left-2' />
				</div>
			</Link>
			<button>
				{isStories ? (
					<MdOutlineLocalOffer onClick={toggleStories} size={40} />
				) : (
					<MdOutlineWebStories onClick={toggleStories} size={40} />
				)}
			</button>
		</div>
	)
}

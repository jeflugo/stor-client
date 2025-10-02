import { CiSearch } from 'react-icons/ci'
// import { MdOutlineLocalOffer, MdOutlineWebStories } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<div className='flex items-center justify-between gap-2 px-2 py-1'>
			<h1 className='text-2xl font-semibold'>Stor</h1>
			<Link to='/search'>
				<CiSearch size={30} />
			</Link>
			{/* <button>
				{isStories ? (
					<MdOutlineLocalOffer onClick={toggleStories} size={40} />
				) : (
					<MdOutlineWebStories onClick={toggleStories} size={40} />
				)}
			</button> */}
		</div>
	)
}

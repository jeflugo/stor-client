import { CgClose } from 'react-icons/cg'
import type { TAuthor } from '../../types/users'

export default function FollowersList({
	toggle,
	userFollowers,
}: {
	toggle: () => void
	userFollowers: TAuthor[]
}) {
	return (
		<div className='absolute h-screen w-screen bg-black/50 top-0 left-0 flex justify-center items-center'>
			<div className='w-3/4 h-2/3 bg-white rounded-sm'>
				<div className='flex items-center justify-center relative py-1'>
					<h3 className='text-lg'>Following</h3>
					<CgClose
						onClick={toggle}
						className='absolute top-2 right-2'
						size={22}
					/>
				</div>
				{userFollowers.length > 0 ? (
					<div className='px-4'>
						{userFollowers.map(({ _id, username, avatar }) => {
							return (
								<div className='flex items-center justify-between' key={_id}>
									<div className='flex items-center gap-2'>
										<img
											src={`${avatar ? '/user.png' : '/default-user.png'}`}
											alt='User avatar'
											className={`w-10 h-10 rounded-full`}
										/>
										<h4>{username}</h4>
									</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className='text-gray-700 text-center mt-4'>Nothing to show</div>
				)}
			</div>
		</div>
	)
}

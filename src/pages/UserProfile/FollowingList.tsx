import { CgClose } from 'react-icons/cg'
import { api } from '../../utils'
import { useState } from 'react'
import type { TAuthor } from '../../types/users'

export default function FollowingList({
	toggle,
	setVisualFollows,
	isOwnProfile,
	followedUsers,
}: {
	toggle: () => void
	setVisualFollows: React.Dispatch<React.SetStateAction<number>>
	isOwnProfile: boolean
	followedUsers: TAuthor[]
}) {
	const [followingList, setFollowingList] = useState(
		followedUsers.map(follow => ({ ...follow, isFollowing: true }))
	)

	const handleFollow = async (isFollowing: boolean, followedUserId: string) => {
		const requestInfo = {
			isFollowing,
		}
		const { data } = await api.patch(
			`/users/follow-action/${followedUserId}`,
			requestInfo
		)
		if (!data) console.log('follow error')
		setVisualFollows(prev => {
			if (isFollowing) return prev - 1
			return prev + 1
		})
		setFollowingList(prev => {
			const newFollowingList = prev.map(follow => {
				if (follow._id === followedUserId)
					return { ...follow, isFollowing: !follow.isFollowing }
				return follow
			})
			return newFollowingList
		})
	}
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
				{followingList.length > 0 ? (
					<div className='px-4'>
						{followingList.map(({ _id, username, avatar, isFollowing }) => {
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
									{isOwnProfile && (
										<div>
											{isFollowing ? (
												<button
													onClick={() => handleFollow(isFollowing, _id!)}
													className='bg-red-500 rounded-sm text-white px-2'
												>
													Unfollow
												</button>
											) : (
												<button
													onClick={() => handleFollow(isFollowing, _id!)}
													className='bg-green-500 rounded-sm text-white px-2'
												>
													Follow
												</button>
											)}
										</div>
									)}
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

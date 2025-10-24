import { LuArrowLeft } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import type { TNotification } from '../../types/users'
import { formatTimeAgo } from '../../utils'

export default function Notifications({
	notifications,
}: {
	notifications: TNotification[]
}) {
	const navigate = useNavigate()
	return (
		<div>
			<div className='px-2'>
				<div className='mb-2 flex items-center gap-4'>
					<LuArrowLeft size={30} onClick={() => navigate(-1)} />
					<h2 className='text-xl'>Notifications</h2>
				</div>
				<div>
					{notifications.length > 0 ? (
						<div>
							{notifications.map(notification => {
								const { author, postId, postTitle, type, content } =
									notification
								return (
									<Link to={`/posts/${postId}`} key={notification._id!}>
										<div className='flex gap-2 items-center'>
											<img
												src={`${
													author.avatar ? '/user.png' : '/default-user.png'
												}`}
												alt='User avatar'
												className={`w-15 h-15 rounded-full `}
											/>
											<div>
												<h4>
													<span className='font-bold'>{author.username} </span>
													<span className='text-gray-500 text-sm'>
														{formatTimeAgo(notification.createdAt!)}
													</span>
												</h4>
												{type === 'like' && (
													<p>
														Liked your post{' '}
														<span className='font-bold'>{postTitle}</span>
													</p>
												)}
												{type === 'comment' && (
													<p>
														Comment on your post:{' '}
														<span className='font-bold'>{content}</span>
													</p>
												)}
											</div>
										</div>
									</Link>
								)
							})}
						</div>
					) : (
						<div className='text-center'>Nothing to show</div>
					)}
				</div>
			</div>
		</div>
	)
}

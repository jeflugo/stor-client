export default function StoriesAndOffers({
	isStories,
}: {
	isStories: boolean
}) {
	return (
		<div>
			<div className='flex justify-evenly py-2'>
				{isStories ? (
					<>
						<div className='w-25 h-25 rounded-full bg-blue-500'></div>
						<div className='w-25 h-25 rounded-full bg-blue-500'></div>
						<div className='w-25 h-25 rounded-full bg-blue-500'></div>
						<div className='w-25 h-25 rounded-full bg-blue-500'></div>
					</>
				) : (
					<>
						<div className='w-25 h-25 rounded-full bg-green-500'></div>
						<div className='w-25 h-25 rounded-full bg-green-500'></div>
						<div className='w-25 h-25 rounded-full bg-green-500'></div>
						<div className='w-25 h-25 rounded-full bg-green-500'></div>
					</>
				)}
			</div>
		</div>
	)
}

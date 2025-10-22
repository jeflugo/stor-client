export default function Body({
	title,
	content,
}: {
	title: string
	content: string
}) {
	return (
		<>
			<div>
				<h2 className='text-lg font-bold'>{title}</h2>
				<p className='text-wrap'>{content}</p>
			</div>
			<div>
				<img src='/post.jpeg' alt='' />
			</div>
		</>
	)
}

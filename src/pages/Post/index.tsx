import Header from './Header'
import Body from './Body'
import Interactions from './Interactions'
import Comments from './Comments'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../utils'
import type { TPost } from '../../types/posts'
import { LuArrowLeft } from 'react-icons/lu'

export default function Post() {
	const [post, setPost] = useState<TPost>()
	const navigate = useNavigate()
	const [likesAmount, setLikesAmount] = useState(0)
	const [commentsAmount, setCommentsAmount] = useState(0)

	const { postId } = useParams<{ postId: string }>()
	useEffect(() => {
		const fetchPost = async () => {
			const { data }: { data: TPost } = await api.get(
				`/posts/single-post/${postId}`
			)
			setPost(data)
			setLikesAmount(data.likes.length)
			setCommentsAmount(data.comments.length)
		}
		fetchPost()
	}, [postId])

	if (!post) return <div>loading...</div>

	const { _id, author, title, content, likes, createdAt } = post

	return (
		<div>
			<div className='mb-2' onClick={() => navigate(-1)}>
				<LuArrowLeft size={30} />
			</div>
			<Header
				author={author}
				createdAt={createdAt}
				postId={_id}
				title={title}
				content={content}
			/>
			<Body title={title} content={content} />
			<Interactions
				likes={likes}
				postId={_id}
				likesAmount={likesAmount}
				commentsAmount={commentsAmount}
				setLikesAmount={setLikesAmount}
			/>
			<Comments postId={_id} setCommentsAmount={setCommentsAmount} />
		</div>
	)
}

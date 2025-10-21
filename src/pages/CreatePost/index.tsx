import { useRef, useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import type { TFormData } from '../../types/posts'
import { createPost } from '../../services/postService'
import { CgClose } from 'react-icons/cg'
import toast from 'react-hot-toast'

export default function CreatePost() {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [mediaPreview, setMediaPreview] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null)
	const navigate = useNavigate()

	const [formData, setFormData] = useState<TFormData>({
		title: '',
		content: '',
		media: null,
	})

	const removeImage = () => {
		setFormData(prev => ({ ...prev, media: null }))
		setMediaPreview('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setFormData(prev => ({ ...prev, media: file }))

			const isVideo = file.type.startsWith('video/')
			setMediaType(isVideo ? 'video' : 'image')

			// Create preview
			const reader = new FileReader()
			reader.onload = e => {
				setMediaPreview(e.target?.result as string)
			}

			if (isVideo) {
				reader.readAsDataURL(file) // For video, we'll show a thumbnail or video element
			} else {
				reader.readAsDataURL(file)
			}
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const { title, content, media } = formData

		setIsLoading(true)

		try {
			const postData = {
				title,
				content,
				media,
			}
			await createPost(postData)

			// Reset form
			setFormData({
				title: '',
				content: '',
				media: null,
			})
			setMediaPreview('')
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}

			navigate('/')
			toast.success('Post created successfully')
		} catch (error) {
			console.error('Error creating post:', error)
			toast.error('Error creating post')
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className='px-2'>
			<div className='mb-2 flex items-center gap-4'>
				<LuArrowLeft size={30} onClick={() => navigate(-1)} />
				<h2 className='text-xl'>Create post</h2>
			</div>

			<form onSubmit={handleSubmit}>
				<div className='mb-2'>
					<input
						type='text'
						placeholder='Title'
						className='border px-2 py-1 rounded-sm w-full'
						name='title'
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-1'>
					<textarea
						cols={30}
						rows={10}
						placeholder='Content'
						className='border px-2 py-1 rounded-sm  w-full'
						name='content'
						value={formData.content}
						onChange={handleChange}
					></textarea>
				</div>
				{/* Media preview */}
				{mediaType && mediaPreview && (
					<div className='relative mb-2 w-28 h-52 flex justify-center'>
						{mediaType === 'image' ? (
							<img src={mediaPreview} alt='Preview' className='rounded-lg' />
						) : (
							<div className='relative'>
								<video src={mediaPreview} controls className='rounded-lg' />
								<div className='absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm'>
									Video Preview
								</div>
							</div>
						)}
						<CgClose
							type='button'
							size={25}
							onClick={removeImage}
							className='absolute top-2 right-2 bg-black/25 text-white rounded-full p-1'
						/>
						{/* File type info */}
						{formData.media && (
							<div className='absolute bottom-1 left-1 flex items-center text-xs bg-gray-500/50 text-white px-2 py-1 rounded-md'>
								<span className=''>
									{(formData.media.size / 1024 / 1024).toFixed(1)}MB
								</span>
							</div>
						)}
					</div>
				)}
				<div>
					<label className='bg-blue-500 text-white py-1 px-2 rounded-md'>
						<input
							type='file'
							ref={fileInputRef}
							onChange={handleMediaChange}
							accept='image/*,video/*'
							className='hidden'
						/>
						<span>Add media</span>
					</label>
				</div>

				<div className='flex justify-end'>
					<button
						className='bg-green-500 text-white px-2 py-1 text-lg rounded-md mt-4 font-bold w-44 disabled:opacity-50'
						disabled={
							!formData.title ||
							!formData.content ||
							!formData.media ||
							isLoading
						}
					>
						{isLoading ? 'Posting...' : 'Create post'}
					</button>
				</div>
			</form>
		</div>
	)
}

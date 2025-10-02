import { useRef, useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import type { TFormData } from '../../types/posts'
import { createPost } from '../../services/postService'

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

	// const removeImage = () => {
	// 	setImage(null)
	// 	setImagePreview('')
	// 	if (fileInputRef.current) {
	// 		fileInputRef.current.value = ''
	// 	}
	// }

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
		if (!content.trim() && !media) {
			alert('Please add some content or an image')
			return
		}

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

			// Notify parent
			// onPostCreated();
		} catch (error) {
			console.error('Error creating post:', error)
			alert('Failed to create post')
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className='px-2'>
			<div className='mb-2 flex items-center gap-4'>
				<LuArrowLeft size={30} onClick={() => navigate(-1)} />
				<h2 className='text-xl'>Inbox</h2>
			</div>

			<form onSubmit={handleSubmit}>
				<div>
					<input
						type='text'
						placeholder='Title'
						className='border p-2'
						name='title'
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div>
					<textarea
						cols={30}
						rows={10}
						placeholder='Content'
						className='border p-2'
						name='content'
						value={formData.content}
						onChange={handleChange}
					></textarea>
				</div>
				{/* Media preview */}
				{mediaType && mediaPreview && (
					<div className='mt-4 relative'>
						{mediaType === 'image' ? (
							<img
								src={mediaPreview}
								alt='Preview'
								className='max-w-full h-auto max-h-64 rounded-lg'
							/>
						) : (
							<div className='relative'>
								<video
									src={mediaPreview}
									controls
									className='max-w-full h-auto max-h-64 rounded-lg'
								/>
								<div className='absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm'>
									Video Preview
								</div>
							</div>
						)}
						{/* <button
						type='button'
						onClick={removeImage}
						className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600'
					>
						x
					</button> */}
					</div>
				)}
				<div>
					<label className='bg-gray-300 py-1 px-2 rounded-md'>
						<input
							type='file'
							ref={fileInputRef}
							onChange={handleMediaChange}
							accept='image/*,video/*'
							className='hidden'
						/>

						<span>Add Media</span>
					</label>
				</div>
				{/* File type info */}
				{/* {formData.media && (
					<div className='flex items-center text-sm text-gray-500'>
						<span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
							{mediaType === 'video' ? 'Video' : 'Image'} •{' '}
							{(formData.media.size / 1024 / 1024).toFixed(1)}MB
						</span>
					</div>
				)} */}

				<button className='bg-blue-500 text-white p-2 rounded-md mt-4'>
					{isLoading ? 'Posting...' : 'Post'}
				</button>
			</form>
		</div>
	)
}

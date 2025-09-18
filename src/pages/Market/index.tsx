export default function Market() {
	return (
		<div className='container py-4 mx-auto'>
			<div className='flex items-center gap-10'>
				<input type='text' placeholder='search product' />
				<p>1k+ items found</p>
			</div>
			<div className='flex gap-4'>
				<p>100$ or less</p>
				<p>women shoes</p>
				<p>dark</p>
			</div>
			<div className='flex mt-6 gap-4'>
				<div>
					<select name='' id=''>
						<option value='featured'>Featured</option>
						<option value='newest'>Newest</option>
						<option value='price_low_high'>Price: Low to High</option>
						<option value='price_high_low'>Price: High to Low</option>
					</select>
					<select name='' id=''>
						<option value='featured'>Featured</option>
						<option value='newest'>Newest</option>
						<option value='price_low_high'>Price: Low to High</option>
						<option value='price_high_low'>Price: High to Low</option>
					</select>
					<select name='' id=''>
						<option value='featured'>Featured</option>
						<option value='newest'>Newest</option>
						<option value='price_low_high'>Price: Low to High</option>
						<option value='price_high_low'>Price: High to Low</option>
					</select>
				</div>
				<div className='flex flex-wrap gap-4'>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
					<div className='w-64 h-64 bg-red-400'></div>
				</div>
			</div>
		</div>
	)
}

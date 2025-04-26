const Loading = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-12 min-h-screen bg-tertiary-300 relative'>
			<div className='cols-span-1 md:col-span-12 2xl:col-span-12 p-8 flex flex-col justify-center items-center'>
				<div className='flex flex-col justify-center items-center gap-2'>
					<div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
					<p className='text-primary font-medium mt-2'>Loading...</p>
				</div>
			</div>
		</div>
	);
};

export default Loading;

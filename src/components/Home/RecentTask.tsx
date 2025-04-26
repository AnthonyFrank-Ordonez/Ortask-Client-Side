const RecentTask = () => {
	return (
		<div className='bg-tertiary/20 p-6 rounded-lg shadow border-2 border-gray-400/10 h-auto lg:h-auto relative ml-3'>
			<h1 className='text-xl font-bold text-primary mb-4'>
				Recently Added Tasks
			</h1>
			<ul className='space-y-3'>
				<li className='flex justify-between font-normal'>
					<span>Create OrTasks Personal Project</span>
					<span>1 Hour Ago</span>
				</li>
				<li className='flex justify-between font-normal'>
					<span>Create Personal Portfolio</span>
					<span>2 Hour Ago</span>
				</li>
				<li className='flex justify-between font-normal'>
					<span>Create other tasks listed</span>
					<span>1 day Ago</span>
				</li>
			</ul>
		</div>
	);
};

export default RecentTask;

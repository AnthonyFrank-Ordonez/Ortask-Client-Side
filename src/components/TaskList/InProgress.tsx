interface InProgressTaskProps {
	setInProgressOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isInProgressOpen: boolean;
}

const InProgressTask = ({
	setInProgressOpen,
	isInProgressOpen,
}: InProgressTaskProps) => {
	return (
		<div className='bg-tertiary/20 rounded-lg shadow border-2 border-gray-400/10 w-11xl h-auto lg:h-auto relative ml-3'>
			<div className='accordion'>
				<div
					className='flex justify-between items-center rounded-t-lg p-4 bg-primary-400 cursor-pointer'
					onClick={() => {
						setInProgressOpen(!isInProgressOpen);
					}}
				>
					<h2 className='text-xl font-bold text-tertiary'>In progress</h2>
					<svg
						className={`w-6 h-6 text-tertiary transition-transform duration-200 ${isInProgressOpen ? 'transform rotate-180' : ''}`}
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</div>
			</div>

			{isInProgressOpen && (
				<div className='p-4 bg-white rounded-b-lg overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className=''>
							<tr>
								<th className='px-4 py-3 text-left text-sm font-medium text-primary uppercase tracking-wider'>
									Task Name
								</th>
								<th className='px-4 py-3 text-left text-sm font-medium text-primary uppercase tracking-wider'>
									Due Date
								</th>
								<th className='px-4 py-3 text-left text-sm font-medium text-primary uppercase tracking-wider'>
									Priority
								</th>
								<th className='px-4 py-3 text-left text-sm font-medium text-primary uppercase tracking-wider'>
									Status
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							<tr>
								<td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
									Update Dashboard
								</td>
								<td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
									April 25, 2025
								</td>
								<td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
									Highest
								</td>
								<td className='px-4 py-4 whitespace-nowrap text-sm uppercase font-medium text-blue-500'>
									In Progress
								</td>
							</tr>

							<tr>
								<td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
									Fix Login Issue
								</td>
								<td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
									Apr 10, 2025
								</td>
								<td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
									Medium
								</td>
								<td className='px-4 py-4 whitespace-nowrap text-sm uppercase font-medium text-blue-500'>
									In Progress
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default InProgressTask;

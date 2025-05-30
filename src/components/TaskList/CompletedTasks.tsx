import { Tasks } from '@/types';
import { format } from 'date-fns';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Trash } from 'lucide-react';

interface CompletedTasksProps {
	setCompletedOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isCompletedOpen: boolean;
	completedTasks: Tasks[] | undefined;
	handleChangeStatus: (value: string) => Promise<void>;
	showModal: (id: string) => void;
}

const CompletedTasks = ({
	setCompletedOpen,
	isCompletedOpen,
	completedTasks,
	handleChangeStatus,
	showModal,
}: CompletedTasksProps) => {
	return (
		<div className='bg-tertiary/20 rounded-lg shadow border-2 border-gray-400/10 h-auto lg:h-auto relative ml-3'>
			<div className='accordion'>
				<div
					className='flex justify-between items-center rounded-t-lg p-4 bg-primary-400 cursor-pointer'
					onClick={() => {
						setCompletedOpen(!isCompletedOpen);
					}}
				>
					<h2 className='text-xl font-bold text-tertiary'>Completed</h2>
					<svg
						className={`w-6 h-6 text-tertiary transition-transform duration-200 ${isCompletedOpen ? 'transform rotate-180' : ''}`}
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

			{isCompletedOpen && (
				<div className='p-4 bg-white rounded-b-lg overflow-x-auto'>
					{completedTasks && completedTasks.length >= 1 ? (
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
									<th></th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{completedTasks?.map((task) => (
									<tr key={task.id}>
										<td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											{task.taskName}
										</td>
										<td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
											{format(task.dueDate, 'PPP')}
										</td>
										<td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
											{task.priority}
										</td>
										<td className='px-4 py-4 whitespace-nowrap text-sm uppercase font-medium text-green-500'>
											<Select
												onValueChange={handleChangeStatus}
												defaultValue={JSON.stringify({
													id: task.id,
													updatedStatus: 'Completed',
												})}
											>
												<SelectTrigger className='w-full border-0 shadow-none hover:cursor-pointer'>
													<SelectValue placeholder='Select a fruit' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Fruits</SelectLabel>
														<SelectItem
															value={JSON.stringify({
																id: task.id,
																updatedStatus: 'In Progress',
															})}
															className='text-blue-500 font-medium'
														>
															In Progress
														</SelectItem>
														<SelectItem
															value={JSON.stringify({
																id: task.id,
																updatedStatus: 'To Do',
															})}
															className='font-medium'
														>
															Pending
														</SelectItem>
														<SelectItem
															value={JSON.stringify({
																id: task.id,
																updatedStatus: 'Completed',
															})}
															className='text-green-500 font-medium '
														>
															Completed
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</td>
										<td
											onClick={() => showModal(task.id)}
											className='px-4 py-4 whitespace-nowrap text-sm uppercase font-medium text-gray-500 cursor-pointer'
										>
											<Trash size={18} className='hover:text-black' />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p className='text-center font-medium uppercase py-3'>
							You have no completed tasks yet
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default CompletedTasks;

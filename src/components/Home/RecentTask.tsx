import { formatDistanceToNow } from 'date-fns';
import { UserTasksProps } from '@/types';

interface RecentTaskProps {
	userTask: UserTasksProps | undefined;
}

const RecentTask = ({ userTask }: RecentTaskProps) => {
	return (
		<div className='bg-tertiary/20 p-6 rounded-lg shadow border-2 border-gray-400/10 h-auto lg:h-auto relative ml-3'>
			<h1 className='text-xl font-bold text-primary mb-4'>
				Recently Added Tasks
			</h1>
			<ul className='space-y-3'>
				{userTask?.recentAddedTasks?.map((task) => (
					<li key={task.id} className='flex justify-between font-normal'>
						<span>{task.taskName}</span>
						<span>
							{formatDistanceToNow(new Date(task.createdAt), {
								addSuffix: true,
							})}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentTask;

// import { useGetUserTasks } from '@/hooks/tasks';
// import { RootState } from '@/store/store';
import { UserTasksProps } from '@/types';
// import { useSelector } from 'react-redux';

interface TasksStatisticsProps {
	userTasks: UserTasksProps | undefined;
}

const TasksStatistics = ({ userTasks }: TasksStatisticsProps) => {
	return (
		<div className='bg-tertiary/20 p-6 rounded-lg shadow border-2 border-gray-400/10 lg:h-45 relative ml-3'>
			<h1 className='text-xl font-bold text-primary mb-3'>Task Analytics</h1>
			<div className='flex flex-col md:flex-row md:space-x-4 space-y-5 md:space-y-0 md:items-center'>
				<div className='flex-1 bg-primary-400 p-4 rounded text-tertiary'>
					<p className='text-lg font-medium'>Total Tasks</p>
					<p className='text-2xl font-bold'>
						{userTasks && userTasks.allTask?.length >= 1
							? userTasks.allTask?.length
							: 0}
					</p>
				</div>

				<div className='flex-1 bg-primary-400 p-4 rounded text-tertiary'>
					<p className='text-lg font-medium'>Tasks Pending</p>
					<p className='text-2xl font-bold'>
						{userTasks && userTasks.toDo?.length >= 1
							? userTasks.toDo?.length
							: 0}
					</p>
				</div>

				<div className='flex-1 bg-primary-400 p-4 rounded text-tertiary'>
					<p className='text-lg font-medium'>Tasks Inprogress</p>
					<p className='text-2xl font-bold'>
						{userTasks && userTasks.inProgress?.length >= 1
							? userTasks.inProgress?.length
							: 0}
					</p>
				</div>

				<div className='flex-1 bg-primary-400 p-4 rounded text-tertiary'>
					<p className='text-lg font-medium'>Tasks Completed</p>
					<p className='text-2xl font-bold'>
						{userTasks && userTasks.completed?.length >= 1
							? userTasks.completed?.length
							: 0}
					</p>
				</div>
			</div>
		</div>
	);
};

export default TasksStatistics;

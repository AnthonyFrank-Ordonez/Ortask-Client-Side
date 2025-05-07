import { useState } from 'react';
import InProgressTask from './InProgress';
import PendingTasks from './PendingTasks';
import CompletedTasks from './CompletedTasks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetUserTasks, useUpdateTask } from '@/hooks/tasks';
import { UpdateTaskArg } from '@/types';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useToastError, useToastSuccess } from '@/hooks/notification';

const TasksLists = () => {
	const queryClient = useQueryClient();
	const showSuccessMessage = useToastSuccess();
	const showErrorMessage = useToastError();
	const { user } = useSelector((state: RootState) => state.session);
	const { data: userTasks } = useGetUserTasks(user);
	const { mutateAsync: updateTask } = useUpdateTask();
	const [isInProgressOpen, setInProgressOpen] = useState(true);
	const [isPendingOpen, setPendingOpen] = useState(false);
	const [isCompletedOpen, setCompletedOpen] = useState(false);
	const inProgressTasks = userTasks?.inProgress;
	const pendingTasks = userTasks?.toDo;
	const completedTasks = userTasks?.completed;

	const handleChangeStatus = async (value: string) => {
		const parseObj: UpdateTaskArg = JSON.parse(value);

		await updateTask(parseObj, {
			onSuccess: () => {
				showSuccessMessage('Task updated successfully');
				queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
			},
			onError: (error: unknown) => {
				if (error instanceof AxiosError) {
					const errorMsg = error.response?.data.error.message;
					console.error(errorMsg);
					showErrorMessage('Failed to update task, try again');
				}
			},
		});
	};

	return (
		<>
			<div className='p-6 relative'>
				<div className='flex flex-col md:flex-row items-center justify-between max-w-5xl'>
					<div className='w-full'>
						<h1 className='text-6xl  font-bold text-primary mb-3'>
							Tasks Lists
						</h1>
						<p className='text-primary text-xl ml-2 mb-5 md:mb-0'>
							Welcome to your tasks list page! Here are the list of your tasks.
						</p>
					</div>
					<input
						className='shadow border py-2 px-5 w-full md:w-auto rounded-md border-primary-200 appearance-none focus:outline-none'
						type='text'
						placeholder='Search Tasks...'
					/>
				</div>
			</div>

			<InProgressTask
				setInProgressOpen={setInProgressOpen}
				isInProgressOpen={isInProgressOpen}
				inProgressTasks={inProgressTasks}
				handleChangeStatus={handleChangeStatus}
			/>

			<PendingTasks
				setPendingOpen={setPendingOpen}
				isPendingOpen={isPendingOpen}
				pendingTasks={pendingTasks}
				handleChangeStatus={handleChangeStatus}
			/>

			<CompletedTasks
				setCompletedOpen={setCompletedOpen}
				isCompletedOpen={isCompletedOpen}
				completedTasks={completedTasks}
				handleChangeStatus={handleChangeStatus}
			/>
		</>
	);
};

export default TasksLists;

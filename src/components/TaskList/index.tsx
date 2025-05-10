import { useState } from 'react';
import InProgressTask from './InProgress';
import PendingTasks from './PendingTasks';
import CompletedTasks from './CompletedTasks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDeleteTask, useGetUserTasks, useUpdateTask } from '@/hooks/tasks';
import { UpdateTaskArg } from '@/types';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useToastError, useToastSuccess } from '@/hooks/notification';
import DeleteModal from './DeleteModal';

const TasksLists = () => {
	const queryClient = useQueryClient();
	const showSuccessMessage = useToastSuccess();
	const showErrorMessage = useToastError();
	const { user } = useSelector((state: RootState) => state.session);
	const { data: userTasks } = useGetUserTasks(user);
	const { mutateAsync: updateTask } = useUpdateTask();
	const { mutateAsync: deleteTask } = useDeleteTask();
	const [isInProgressOpen, setInProgressOpen] = useState(true);
	const [isPendingOpen, setPendingOpen] = useState(false);
	const [isCompletedOpen, setCompletedOpen] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState({
		show: false,
		taskID: '',
	});
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

	const handleDeleteTask = async () => {
		const taskId = showDeleteModal.taskID;

		await deleteTask(taskId, {
			onSuccess: () => {
				showSuccessMessage('Successfully deleted task');
				setShowDeleteModal({ show: false, taskID: '' });
				queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
			},
			onError: (error: unknown) => {
				if (error instanceof AxiosError) {
					const errorMsg = error.response?.data.error.message;
					console.error(errorMsg);
					showErrorMessage(`${error}`);
				}
			},
		});
	};

	const showModal = (id: string) => {
		setShowDeleteModal({
			show: true,
			taskID: id,
		});
	};

	const closeModal = () => {
		setShowDeleteModal({
			show: false,
			taskID: '',
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
				</div>
			</div>

			<InProgressTask
				setInProgressOpen={setInProgressOpen}
				isInProgressOpen={isInProgressOpen}
				inProgressTasks={inProgressTasks}
				handleChangeStatus={handleChangeStatus}
				showModal={showModal}
			/>

			<PendingTasks
				setPendingOpen={setPendingOpen}
				isPendingOpen={isPendingOpen}
				pendingTasks={pendingTasks}
				handleChangeStatus={handleChangeStatus}
				showModal={showModal}
			/>

			<CompletedTasks
				setCompletedOpen={setCompletedOpen}
				isCompletedOpen={isCompletedOpen}
				completedTasks={completedTasks}
				handleChangeStatus={handleChangeStatus}
				showModal={showModal}
			/>

			{showDeleteModal.show && (
				<DeleteModal
					closeModal={closeModal}
					handleDeleteTask={handleDeleteTask}
				/>
			)}
		</>
	);
};

export default TasksLists;

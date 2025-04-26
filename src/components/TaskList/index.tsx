import { useState } from 'react';
import InProgressTask from './InProgress';
import PendingTasks from './PendingTasks';
import CompletedTasks from './CompletedTasks';

const TasksLists = () => {
	const [isInProgressOpen, setInProgressOpen] = useState(true);
	const [isPendingOpen, setPendingOpen] = useState(false);
	const [isCompletedOpen, setCompletedOpen] = useState(false);

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
			/>

			<PendingTasks
				setPendingOpen={setPendingOpen}
				isPendingOpen={isPendingOpen}
			/>

			<CompletedTasks
				setCompletedOpen={setCompletedOpen}
				isCompletedOpen={isCompletedOpen}
			/>
		</>
	);
};

export default TasksLists;

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import RecentTask from './RecentTask';
import TasksGraph from './TasksGraph';
import TasksStatistics from './TasksStatistics';
import HomeOverview from './HomeOverview';
import { NavLink } from 'react-router-dom';
import { useGetTaskStats, useGetUserTasks } from '@/hooks/tasks';

const Home = () => {
	const { user } = useSelector((state: RootState) => state.session);
	const { data: userTasks } = useGetUserTasks(user);
	const { data: taskData } = useGetTaskStats(user);

	useEffect(() => {
		const storeverifyPageToken = localStorage.getItem(
			'verificationAccountEndTime'
		);

		if (storeverifyPageToken) {
			localStorage.removeItem('verificationAccountEndTime');
		}
	}, []);

	return (
		<>
			{/* HEADER */}
			<div className='p-6 relative'>
				<div className='flex flex-col md:flex-row md:items-center justify-between'>
					<div>
						<h1 className='text-6xl font-bold text-primary mb-3'>
							Hello, {user?.username}
						</h1>
						<p className='text-primary text-xl ml-2 mb-4 md:mb-0'>
							Welcome to your dashboard! Here's your summary for today.
						</p>
					</div>

					<NavLink to='/new-task'>
						<button className='bg-primary-400 text-tertiary rounded-full font-bold p-3 md:p-5 hover:bg-primary-300 cursor-pointer'>
							Add New Task
						</button>
					</NavLink>
				</div>
			</div>

			<HomeOverview />
			<TasksStatistics userTasks={userTasks} />
			<RecentTask userTask={userTasks} />
			<TasksGraph taskData={taskData} />
		</>
	);
};

export default Home;

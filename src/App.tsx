import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetAuthStatus,
	setCurrentPage,
} from '@/store/reducers/sessionReducer';
import { RootState } from '@/store/store';
import { useLogout } from '@/hooks/auth';
import { useToastSuccess } from '@/hooks/notification';

function App() {
	const dispatch = useDispatch();
	const showSuccessMessage = useToastSuccess();
	const { user, currentPage } = useSelector(
		(state: RootState) => state.session
	);
	const { mutateAsync: logoutAuthenticatedUser } = useLogout();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleSetCurrentPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
		const page = event.currentTarget.dataset.page;
		if (page) dispatch(setCurrentPage({ page }));
	};

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const handleLogout = async () => {
		await logoutAuthenticatedUser();
		showSuccessMessage('Logout Successfully');
		dispatch(resetAuthStatus());
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-12 min-h-screen relative'>
			{/* Hamburger Icon */}
			<button
				onClick={toggleSidebar}
				className={`fixed top-4 left-4 z-40 ${sidebarOpen ? 'hidden' : ''} md:hidden bg-secondary text-white p-2 rounded-md shadow-lg`}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='lucide lucide-menu-icon lucide-menu'
				>
					<line x1='4' x2='20' y1='12' y2='12' />
					<line x1='4' x2='20' y1='6' y2='6' />
					<line x1='4' x2='20' y1='18' y2='18' />
				</svg>
			</button>

			{/* NavBar */}
			<aside
				className={`bg-primary w-80 md:max-w-lg md:w-[calc(100%+20px)] 2xl:max-w-full md:col-span-2 text-tertiary h-screen inset-y-0 left-0 fixed transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out top-0 md:sticky md:translate-x-0 z-30 overflow-y-auto nav-scrollbar`}
			>
				{/* Close btn for small screen*/}
				<div className='flex justify-end p-4 md:hidden'>
					<button onClick={toggleSidebar}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='lucide lucide-x-icon lucide-x hover:bg-secondary/10 rounded-full'
						>
							<path d='M18 6 6 18' />
							<path d='m6 6 12 12' />
						</svg>
					</button>
				</div>

				{/* Logo Area */}
				<div className='p-6 border-b border-primary mb-5'>
					<div className='h-12 bg-tertiary/10 rounded flex items-center justify-center'>
						<span className='text-xl font-bold'>OrTasks</span>
					</div>
				</div>

				<div className='p-3'>
					<div className='flex items-center justify-center flex-col'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='w-24 h-24 mb-3 lucide lucide-circle-user-round-icon lucide-circle-user-round'
						>
							<path d='M18 20a6 6 0 0 0-12 0' />
							<circle cx='12' cy='10' r='4' />
							<circle cx='12' cy='12' r='10' />
						</svg>
						<h1 className='text-2xl font-bold mb-3 text-center'>
							{user?.username}
						</h1>

						<div className='flex flex-row space-x-1 items-center border border-tertiary px-2 py-1 rounded-full hover:bg-primary-100/10 cursor-pointer'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-3 h-3 lucide lucide-pencil-icon lucide-pencil'
							>
								<path d='M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z' />
								<path d='m15 5 4 4' />
							</svg>
							<h1 className='text-base font-medium'>Edit Profile</h1>
						</div>
					</div>
				</div>

				{/* Nav Items */}
				<nav className='p-4'>
					<ul className='space-y-3 2xl:space-y-4 2xl:mt-10'>
						<li>
							<NavLink
								onClick={handleSetCurrentPage}
								data-page='home'
								to='/'
								className={`flex items-center p-2 rounded-md hover:bg-tertiary/10 transform hover:-translate-y-0.5 transition-transform duration-200 ${currentPage === 'home' ? 'bg-tertiary/10' : ''}`}
							>
								<div className='mr-3'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='lucide lucide-house-icon lucide-house'
									>
										<path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
										<path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
									</svg>
								</div>
								<span>Home</span>
							</NavLink>
						</li>

						<li>
							<NavLink
								onClick={handleSetCurrentPage}
								data-page='task-list'
								to='/task-lists'
								className={`flex items-center p-2 rounded-md hover:bg-tertiary/10 transform hover:-translate-y-0.5 transition-transform duration-200 ${currentPage === 'task-list' ? 'bg-tertiary/10' : ''}`}
							>
								<div className='mr-3'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='lucide lucide-clipboard-list-icon lucide-clipboard-list'
									>
										<rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
										<path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
										<path d='M12 11h4' />
										<path d='M12 16h4' />
										<path d='M8 11h.01' />
										<path d='M8 16h.01' />
									</svg>
								</div>
								<span>Tasks Lists</span>
							</NavLink>
						</li>

						<li>
							<NavLink
								onClick={handleSetCurrentPage}
								data-page='new-task'
								to='/new-task'
								className={`flex items-center p-2 rounded-md hover:bg-tertiary/10 transform hover:-translate-y-0.5 transition-transform duration-200 ${currentPage === 'new-task' ? 'bg-tertiary/10' : ''}`}
							>
								<div className='mr-3'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='lucide lucide-clipboard-plus-icon lucide-clipboard-plus'
									>
										<rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
										<path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
										<path d='M9 14h6' />
										<path d='M12 17v-6' />
									</svg>
								</div>
								<span>New Task</span>
							</NavLink>
						</li>

						<li>
							<NavLink
								onClick={handleSetCurrentPage}
								data-page='calendar'
								to='/calendar'
								className={`flex items-center p-2 rounded-md hover:bg-tertiary/10 transform hover:-translate-y-0.5 transition-transform duration-200 ${currentPage === 'calendar' ? 'bg-tertiary/10' : ''}`}
							>
								<div className='mr-3'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='lucide lucide-calendar-days-icon lucide-calendar-days'
									>
										<path d='M8 2v4' />
										<path d='M16 2v4' />
										<rect width='18' height='18' x='3' y='4' rx='2' />
										<path d='M3 10h18' />
										<path d='M8 14h.01' />
										<path d='M12 14h.01' />
										<path d='M16 14h.01' />
										<path d='M8 18h.01' />
										<path d='M12 18h.01' />
										<path d='M16 18h.01' />
									</svg>
								</div>
								<span>Calendar</span>
							</NavLink>
						</li>

						<li>
							<NavLink
								onClick={handleLogout}
								data-page='log-out'
								to='/login'
								className={`flex items-center p-2 rounded-md hover:bg-tertiary/10 transform hover:-translate-y-0.5 transition-transform duration-200`}
							>
								<div className='mr-3'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
										className='lucide lucide-log-out-icon lucide-log-out'
									>
										<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
										<polyline points='16 17 21 12 16 7' />
										<line x1='21' x2='9' y1='12' y2='12' />
									</svg>
								</div>
								<span>Logout</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</aside>

			{/* Main Content */}
			<main className='w-full col-span-1 md:col-span-10 bg-tertiary/50 min-h-screen p-6 pt-16 md:pt-6'>
				<div className='grid grid-cols-1 gap-8'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default App;

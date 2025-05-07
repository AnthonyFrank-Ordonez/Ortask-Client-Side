import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.tsx';
import App from '../App.tsx';
import Home from '../components/Home/';
import TasksLists from '../components/TaskList/';
import NewTask from '../components/NewTask/';
import Login from '../components/auth/Login/';
import Register from '../components/auth/Register/';
import VerifyAccount from '../components/VerifyAccount.tsx';
import NotFound from '../components/Errors/NotFound.tsx';
import TokenExpire from '../components/Errors/TokenExpire.tsx';
import CheckAuth from '@/components/CheckAuth.tsx';
import Calendar from '@/components/Calendar';

export const router = createBrowserRouter([
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/expire',
		element: <TokenExpire />,
	},
	{
		element: <CheckAuth />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/verify-account',
				element: <VerifyAccount />,
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: '/',
						element: <App />,
						children: [
							{
								index: true,
								element: <Home />,
							},
							{
								path: '/task-lists',
								element: <TasksLists />,
							},
							{
								path: '/new-task',
								element: <NewTask />,
							},
							{
								path: '/calendar',
								element: <Calendar />,
							},
						],
					},
				],
			},
		],
	},

	{
		path: '*',
		element: <NotFound />,
	},
]);

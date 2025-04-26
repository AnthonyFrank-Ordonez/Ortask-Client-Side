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

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/verify-account',
		element: <VerifyAccount />,
	},
	{
		path: '/expire',
		element: <TokenExpire />,
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
				],
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

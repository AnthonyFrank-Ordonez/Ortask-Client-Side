import { endOfWeek, isWithinInterval, startOfWeek } from 'date-fns';

export const API_URLS = {
	AUTH: '/api/check-auth',
	LOGIN: '/api/login',
	LOGOUT: '/api/users/logout',
	REGISTER: '/api/users/register',
	USERS: '/api/users',
	TASKS: '/api/tasks',
};

export const WEEKDAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
	{
		id: '1',
		title: 'All-day event',
		start: todayStr,
	},
	{
		id: '2',
		title: 'Timed event',
		start: todayStr + 'T12:00:00',
	},
];

export const isThisWeek = (taskDate: Date) => {
	const createdDate = new Date(taskDate);
	const now = new Date();

	return isWithinInterval(createdDate, {
		start: startOfWeek(now, { weekStartsOn: 1 }),
		end: endOfWeek(now, { weekStartsOn: 1 }),
	});
};

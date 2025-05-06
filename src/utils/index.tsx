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

export const isThisWeek = (taskDate: Date) => {
	const createdDate = new Date(taskDate);
	const now = new Date();

	return isWithinInterval(createdDate, {
		start: startOfWeek(now, { weekStartsOn: 1 }),
		end: endOfWeek(now, { weekStartsOn: 1 }),
	});
};

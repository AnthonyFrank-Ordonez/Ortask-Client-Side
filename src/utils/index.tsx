import { Priority, Status } from '../types';

export const API_URLS = {
	AUTH: '/api/check-auth',
	LOGIN: '/api/login',
	LOGOUT: '/api/users/logout',
	REGISTER: '/api/users/register',
	USERS: '/api/users',
};

export const isPriorityObject = (object: unknown): object is Priority => {
	return (
		typeof object === 'object' && object !== null && 'priorityName' in object
	);
};

export const isStatusObject = (object: unknown): object is Status => {
	return (
		typeof object === 'object' && object !== null && 'statusName' in object
	);
};

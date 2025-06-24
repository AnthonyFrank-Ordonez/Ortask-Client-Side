import { endOfWeek, isWithinInterval, startOfWeek } from 'date-fns';
import { Area } from 'react-easy-crop';

export const API_URLS = {
	AUTH: 'https://ortaskbe.afordonez.com/api/check-auth',
	LOGIN: 'https://ortaskbe.afordonez.com/api/login',
	LOGOUT: 'https://ortaskbe.afordonez.com/api/users/logout',
	REGISTER: 'https://ortaskbe.afordonez.com/api/users/register',
	USERS: 'https://ortaskbe.afordonez.com/api/users',
	TASKS: 'https://ortaskbe.afordonez.com/api/tasks',
	PROFILE: 'https://ortaskbe.afordonez.com/api/profile',
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

export const getCroppedImage = (
	imgSrc: string,
	pixelCrop: Area
): Promise<string> => {
	return new Promise((resolve) => {
		const image = new Image();
		image.src = imgSrc;

		image.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				console.error('Could not get canvas context');
				return;
			}

			canvas.width = pixelCrop.width;
			canvas.height = pixelCrop.height;

			ctx.drawImage(
				image,
				pixelCrop.x,
				pixelCrop.y,
				pixelCrop.width,
				pixelCrop.height,
				0,
				0,
				pixelCrop.width,
				pixelCrop.height
			);

			resolve(canvas.toDataURL('image/jpeg', 0.85));
		};
	});
};

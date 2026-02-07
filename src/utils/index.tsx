import { endOfWeek, isWithinInterval, startOfWeek } from 'date-fns';
import { Area } from 'react-easy-crop';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URLS = {
	AUTH: `${BASE_URL}/api/check-auth`,
	LOGIN: `${BASE_URL}/api/login`,
	LOGOUT: `${BASE_URL}/api/users/logout`,
	REGISTER: `${BASE_URL}/api/users/register`,
	USERS: `${BASE_URL}/api/users`,
	TASKS: `${BASE_URL}/api/tasks`,
	PROFILE: `${BASE_URL}/api/profile`,
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

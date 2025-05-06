import { API_URLS } from '@/utils';
import { NewTask, TaskDataType, Tasks } from '@/types';
import { ErrorResponse } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const createTask = async (newTask: TaskDataType) => {
	const response = await axiosInstance.post<NewTask | ErrorResponse>(
		API_URLS.TASKS,
		newTask
	);
	return response.data;
};

const getTasks = async () => {
	const response = await axiosInstance.get<Tasks[]>(API_URLS.TASKS);
	return response.data;
};

export default { createTask, getTasks };

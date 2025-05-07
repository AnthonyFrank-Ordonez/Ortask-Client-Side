import { API_URLS } from '@/utils';
import { NewTask, TaskDataType, Tasks, UpdateTaskArg } from '@/types';
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

const updateTask = async (object: UpdateTaskArg) => {
	const response = await axiosInstance.put<Tasks>(
		`${API_URLS.TASKS}/${object.id}`,
		object
	);
	return response.data;
};

export default { createTask, getTasks, updateTask };

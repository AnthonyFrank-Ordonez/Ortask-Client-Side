import { useMutation } from '@tanstack/react-query';
import taskService from '@/services/tasks';

export const useCreateTask = () => {
	return useMutation({
		mutationFn: taskService.createTask,
	});
};

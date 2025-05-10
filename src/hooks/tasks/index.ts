import { useMutation, useQuery } from '@tanstack/react-query';
import taskService from '@/services/tasks';
import { TaskAnalyticsData, User } from '@/types';
import { getDay, isThisWeek } from 'date-fns';
import { WEEKDAYS } from '@/utils';

export const useCreateTask = () => {
	return useMutation({
		mutationFn: taskService.createTask,
	});
};

export const useUpdateTask = () => {
	return useMutation({
		mutationFn: taskService.updateTask,
	});
};

export const useDeleteTask = () => {
	return useMutation({
		mutationFn: taskService.deleteTask,
	});
};

export const useGetUserTasks = (user: User | null) => {
	return useQuery({
		queryKey: ['tasks', user?.id],
		queryFn: taskService.getTasks,
		refetchOnWindowFocus: false,
		enabled: !!user,
		staleTime: Infinity,
		select: (tasks) => {
			return {
				allTask: tasks,
				toDo: tasks.filter((task) => task.status === 'To Do'),
				completed: tasks.filter((task) => task.status === 'Completed'),
				inProgress: tasks.filter((task) => task.status === 'In Progress'),
				recentAddedTasks: tasks
					.slice()
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
					.slice(0, 3),
			};
		},
	});
};

export const useGetTaskStats = (user: User | null) => {
	return useQuery({
		queryKey: ['task-analytics', user?.id],
		queryFn: taskService.getTasks,
		refetchOnWindowFocus: false,
		enabled: !!user,
		staleTime: Infinity,
		select: (tasks) => {
			const weekData: Record<string, number> = {
				Monday: 0,
				Tuesday: 0,
				Wednesday: 0,
				Thursday: 0,
				Friday: 0,
			};

			tasks.forEach((task) => {
				if (isThisWeek(task.createdAt)) {
					const dayIndex = getDay(new Date(task.createdAt));
					const dayName = WEEKDAYS[dayIndex];
					if (weekData[dayName] !== undefined) {
						weekData[dayName]++;
					}
				}
			});

			return Object.entries(weekData).map(([day, count]) => ({
				day,
				tasks: count,
			})) satisfies TaskAnalyticsData[];
		},
	});
};

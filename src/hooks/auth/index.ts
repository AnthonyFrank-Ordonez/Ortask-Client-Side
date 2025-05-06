import { useMutation, useQuery } from '@tanstack/react-query';
import authService from '../../services/auth';

export const useCheckAuth = () => {
	return useQuery({
		queryKey: ['auth'],
		queryFn: authService.checkUserAuth,
		refetchOnWindowFocus: false,
		refetchOnMount: window.__shouldCheckAuth || false,
		staleTime: 30 * 60 * 1000,
		retry: 0,
	});
};

export const useLogin = () => {
	return useMutation({
		mutationFn: authService.loginUser,
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: authService.logoutUser,
	});
};

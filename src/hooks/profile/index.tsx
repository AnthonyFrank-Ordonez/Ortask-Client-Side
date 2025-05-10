import profileService from '@/services/profile';
import { User } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: profileService.updateProfile,
	});
};

export const useGetUserProfile = (user: User | null) => {
	return useQuery({
		queryKey: ['user-profile', user?.id],
		queryFn: profileService.getProfile,
		enabled: !!user,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	});
};

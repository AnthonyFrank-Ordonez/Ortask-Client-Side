import { useMutation } from '@tanstack/react-query';
import userService from '../../services/user';

export const useRegister = () => {
	return useMutation({
		mutationFn: userService.registerUser,
	});
};

export const useResendVerification = () => {
	return useMutation({
		mutationFn: userService.resendUserVerification,
	});
};

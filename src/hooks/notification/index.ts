import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useToastSuccess = () => {
	return useCallback((message: string) => {
		toast.success(message, { position: 'top-right' });
	}, []);
};

export const useToastError = () => {
	return useCallback((message: string) => {
		toast.error(message, { position: 'top-right' });
	}, []);
};

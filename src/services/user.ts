import { API_URLS } from '../utils';
import {
	MessageResponse,
	RegisterResponse,
	RegisterUser,
	Resend,
} from '../types';
import axiosInstance from './axiosInstance';

const registerUser = async (newUser: RegisterUser) => {
	const response = await axiosInstance.post<RegisterResponse>(
		API_URLS.REGISTER,
		newUser
	);
	return response.data;
};

const resendUserVerification = async (email: Resend) => {
	const response = await axiosInstance.post<MessageResponse>(
		`${API_URLS.USERS}/resend-verification`,
		email
	);
	return response.data;
};

export default { registerUser, resendUserVerification };

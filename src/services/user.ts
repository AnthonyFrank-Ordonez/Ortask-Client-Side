import axios from 'axios';
import { API_URLS } from '../utils';
import {
	MessageResponse,
	RegisterResponse,
	RegisterUser,
	Resend,
} from '../types';
axios.defaults.withCredentials = true;

const registerUser = async (newUser: RegisterUser) => {
	const response = await axios.post<RegisterResponse>(
		API_URLS.REGISTER,
		newUser
	);
	return response.data;
};

const resendUserVerification = async (email: Resend) => {
	const response = await axios.post<MessageResponse>(
		`${API_URLS.USERS}/resend-verification`,
		email
	);
	return response.data;
};

export default { registerUser, resendUserVerification };

import { AuthenticatedUser, Credentials, LoggedUser } from '../types';
import { API_URLS } from '../utils';
import axiosInstance from './axiosInstance';

const checkUserAuth = async () => {
	const response = await axiosInstance.get<AuthenticatedUser>(API_URLS.AUTH);
	return response.data;
};

const loginUser = async (credentials: Credentials) => {
	const response = await axiosInstance.post<LoggedUser>(
		API_URLS.LOGIN,
		credentials
	);
	return response.data;
};

const logoutUser = async () => {
	const response = await axiosInstance.post(API_URLS.LOGOUT);
	return response.data;
};

export default { checkUserAuth, loginUser, logoutUser };

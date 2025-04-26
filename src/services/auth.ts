import axios from 'axios';
import { AuthenticatedUser, Credentials, LoggedUser } from '../types';
import { API_URLS } from '../utils';
axios.defaults.withCredentials = true;

const checkUserAuth = async () => {
	const response = await axios.get<AuthenticatedUser>(API_URLS.AUTH);
	return response.data;
};

const loginUser = async (credentials: Credentials) => {
	const response = await axios.post<LoggedUser>(API_URLS.LOGIN, credentials);
	return response.data;
};

const logoutUser = async () => {
	const response = await axios.post(API_URLS.LOGOUT);
	return response.data;
};

export default { checkUserAuth, loginUser, logoutUser };

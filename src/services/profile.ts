import {
	UserProfile,
	UpdateProfileResponse,
	UserProfileResponse,
} from '@/types';
import axiosInstance from './axiosInstance';
import { API_URLS } from '@/utils';

const updateProfile = async (object: UserProfile) => {
	const response = await axiosInstance.post<UpdateProfileResponse>(
		API_URLS.PROFILE,
		object
	);
	return response.data;
};

const getProfile = async () => {
	const response = await axiosInstance.get<UserProfileResponse>(
		API_URLS.PROFILE
	);
	return response.data;
};

export default { updateProfile, getProfile };

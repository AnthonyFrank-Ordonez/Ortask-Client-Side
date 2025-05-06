import { API_URLS } from '@/utils';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean;
}

const axiosInstance = axios.create({
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: unknown) => {
		if (error instanceof AxiosError) {
			const originalRequest = error.config as ExtendedAxiosRequestConfig;

			if (error.response?.status === 401 && !originalRequest?._retry) {
				originalRequest._retry = true;

				try {
					await axios.post(`${API_URLS.AUTH}/refresh`);
					return axios(originalRequest);
				} catch (refrehError) {
					return Promise.reject(refrehError);
				}
			}

			return Promise.reject(error);
		}
	}
);

export default axiosInstance;

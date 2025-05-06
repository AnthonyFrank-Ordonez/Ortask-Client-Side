import { useCheckAuth } from '@/hooks/auth';
import {
	checkAuthStatus,
	resetAuthStatus,
} from '@/store/reducers/sessionReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loading from './Loading';

declare global {
	interface Window {
		__shouldCheckAuth: boolean;
	}
}

const CheckAuth = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const isNewSession = !sessionStorage.getItem('user_session');

		if (isNewSession) {
			sessionStorage.setItem('user_session', 'true');
			window.__shouldCheckAuth = true;
		}
	}, []);

	const {
		data: authData,
		isSuccess: authenticated,
		isError: notAuthenticated,
		isLoading,
	} = useCheckAuth();

	if (isLoading) return <Loading />;

	if (authenticated) {
		window.__shouldCheckAuth = false;
		dispatch(checkAuthStatus(authData));
	}

	if (notAuthenticated) {
		window.__shouldCheckAuth = false;
		dispatch(resetAuthStatus());
	}

	return <Outlet />;
};

export default CheckAuth;

import { Navigate, Outlet } from 'react-router-dom';
import {
	useSelector,
} from 'react-redux';
import { RootState } from '@/store/store';

const ProtectedRoute = () => {
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.session
	);

	if (!isAuthenticated && !user?.rememberUser) {
		return <Navigate to='/login' replace />;
	}

	if (isAuthenticated && !user?.isVerified) {
		return <Navigate to='/verify-account' replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;

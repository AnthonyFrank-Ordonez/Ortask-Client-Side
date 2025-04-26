import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ProtectedRoute = () => {
	const { user, isAuthenticated } = useSelector(
		(state: RootState) => state.session
	);

	if (isAuthenticated && user?.isVerified) {
		return <Outlet />;
	} else if (isAuthenticated && !user?.isVerified) {
		return <Navigate to='/verify-account' replace />;
	} else {
		return <Navigate to='/login' replace />;
	}
};

export default ProtectedRoute;

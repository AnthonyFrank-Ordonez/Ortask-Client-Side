import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	AuthenticatedUser,
	CurrentPage,
	LoggedUser,
	StoreState,
} from '../../types';

const initialState: StoreState = {
	user: null,
	userLogout: false,
	isAuthenticated: false,
	signingIn: false,
	currentPage: 'home',
};

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		login(state, action: PayloadAction<LoggedUser>) {
			state.signingIn = true;
			state.userLogout = false;

			if (action.payload) {
				state.user = action.payload.user;
				state.isAuthenticated = true;
			} else {
				state.user = null;
				state.isAuthenticated = false;
			}

			state.signingIn = false;
		},
		setCurrentPage(state, action: PayloadAction<CurrentPage>) {
			state.currentPage = action.payload.page;
		},
		resetAuthStatus(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.userLogout = true;
		},
		checkAuthStatus(
			state,
			action: PayloadAction<AuthenticatedUser | undefined>
		) {
			if (action.payload) {
				state.user = action.payload.user;
				state.isAuthenticated = action.payload.isAuthenticated;
			}
		},
	},
});

export const { login, resetAuthStatus, checkAuthStatus, setCurrentPage } =
	sessionSlice.actions;

export default sessionSlice.reducer;

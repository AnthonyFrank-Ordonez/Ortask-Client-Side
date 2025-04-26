import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedUser, LoggedUser, StoreState } from '../../types';

const initialState: StoreState = {
	user: null,
	isAuthenticated: false,
	signingIn: false,
};

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		login(state, action: PayloadAction<LoggedUser>) {
			state.signingIn = true;

			if (action.payload) {
				state.user = action.payload.user;
				state.isAuthenticated = true;
			} else {
				state.user = null;
				state.isAuthenticated = false;
			}

			state.signingIn = false;
		},
		resetAuthStatus(state) {
			state.user = null;
			state.isAuthenticated = false;
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

export const { login, resetAuthStatus, checkAuthStatus } = sessionSlice.actions;

export default sessionSlice.reducer;

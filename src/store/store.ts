import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './reducers/sessionReducer';

const store = configureStore({
	reducer: {
		session: sessionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

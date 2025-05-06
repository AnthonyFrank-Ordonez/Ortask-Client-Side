import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionReducer from './reducers/sessionReducer';

const sessionPersistConfig = {
	key: 'session',
	storage,
	blackList: ['signingIn'],
};

const persistedSession = persistReducer(sessionPersistConfig, sessionReducer);

export const store = configureStore({
	reducer: {
		session: persistedSession,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

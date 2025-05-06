import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Loading.tsx';
import '@/index.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={<Loading />} persistor={persistor}>
					<RouterProvider router={router} />
					<ToastContainer />
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	</StrictMode>
);

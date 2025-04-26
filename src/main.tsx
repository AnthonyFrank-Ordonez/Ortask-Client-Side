import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import store from '@/store/store.ts';
import '@/index.css';
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<MantineProvider>
					<RouterProvider router={router} />
					<ToastContainer />
				</MantineProvider>
			</Provider>
		</QueryClientProvider>
	</StrictMode>
);

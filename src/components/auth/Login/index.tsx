import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLogin } from '@/hooks/auth';
import { useToastError, useToastSuccess } from '@/hooks/notification/';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { login, setCurrentPage } from '@/store/reducers/sessionReducer';
import { useForm } from '@tanstack/react-form';

const Login = () => {
	const showErrorMessage = useToastError();
	const showSuccessMessage = useToastSuccess();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state: RootState) => state.session);
	const { mutateAsync: loginUser } = useLogin();

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
			rememberUser: false,
		},
		onSubmit: async ({ value }) => {
			await loginUser(value, {
				onSuccess: async (data) => {
					dispatch(login(data));
					showSuccessMessage('Login Success!');
					navigate('/');
				},
				onError: (error: unknown) => {
					if (error instanceof AxiosError) {
						if (error.status === 403) {
							const message: string = error.response?.data.error;
							showErrorMessage(message);
						}
					}
				},
			});
		},
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
			dispatch(setCurrentPage({ page: 'home' }));
		}
	}, [dispatch, isAuthenticated, navigate]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-12 min-h-screen bg-tertiary-300 relative'>
			{/* Login Container */}
			<div className='md:col-span-5 2xl:col-span-4 bg-primary p-8 flex flex-col justify-center'>
				<div className='max-w-md mx-auto w-full'>
					<h1 className='text-3xl font-bold text-tertiary mb-8'>OrTasks</h1>

					<h2 className='text-2xl font-semibold text-tertiary mb-8'>
						Log in to your account
					</h2>

					<form
						className='space-y-6'
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<div>
							<form.Field
								name='email'
								children={(field) => {
									return (
										<>
											<label
												htmlFor={field.name}
												className='block text-sm font-medium text-tertiary mb-1'
											>
												Email Address
											</label>
											<input
												type='email'
												name={field.name}
												id={field.name}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												required
												placeholder='Enter your email'
												className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
											/>
										</>
									);
								}}
							/>
						</div>
						<div>
							<form.Field
								name='password'
								children={(field) => (
									<>
										<label
											htmlFor={field.name}
											className='block text-sm font-medium text-tertiary mb-1'
										>
											Password
										</label>
										<input
											type='password'
											name={field.name}
											id={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											required
											placeholder='Enter your password'
											className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
										/>
									</>
								)}
							/>
						</div>

						<div className='flex items-center justify-between'>
							<form.Field
								name='rememberUser'
								children={(field) => (
									<div className='flex items-center'>
										<input
											type='checkbox'
											id={field.name}
											checked={field.state.value}
											onChange={(e) => field.handleChange(e.target.checked)}
											className='h-4 w-4 border-tertiary rounded'
										/>
										<label
											htmlFor={field.name}
											className='ml-2 block text-tertiary text-sm'
										>
											Remember Me
										</label>
									</div>
								)}
							/>

							<a href='#' className='tex-sm text-tertiary hover:underline'>
								Forgot Password?
							</a>
						</div>

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<>
									<button
										type='submit'
										disabled={!canSubmit}
										className={`w-full py-2 px-4 bg-tertiary rounded-md font-medium hover:bg-tertiary/90 transition-colors cursor-pointer ${!canSubmit && 'disabled:cursor-not-allowed'}`}
									>
										{isSubmitting ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 200 200'
												className='w-7 h-7 mx-auto'
											>
												<circle
													fill='#734005'
													stroke='#734005'
													strokeWidth='15'
													r='15'
													cx='40'
													cy='100'
												>
													<animate
														attributeName='opacity'
														calcMode='spline'
														dur='2'
														values='1;0;1;'
														keySplines='.5 0 .5 1;.5 0 .5 1'
														repeatCount='indefinite'
														begin='-.4'
													></animate>
												</circle>
												<circle
													fill='#734005'
													stroke='#734005'
													strokeWidth='15'
													r='15'
													cx='100'
													cy='100'
												>
													<animate
														attributeName='opacity'
														calcMode='spline'
														dur='2'
														values='1;0;1;'
														keySplines='.5 0 .5 1;.5 0 .5 1'
														repeatCount='indefinite'
														begin='-.2'
													></animate>
												</circle>
												<circle
													fill='#734005'
													stroke='#734005'
													strokeWidth='15'
													r='15'
													cx='160'
													cy='100'
												>
													<animate
														attributeName='opacity'
														calcMode='spline'
														dur='2'
														values='1;0;1;'
														keySplines='.5 0 .5 1;.5 0 .5 1'
														repeatCount='indefinite'
														begin='0'
													></animate>
												</circle>
											</svg>
										) : (
											'Sign In'
										)}
									</button>
								</>
							)}
						/>
					</form>

					<p className='mt-6 tex-center text-sm text-tertiary'>
						Don't have an account?{' '}
						<NavLink to='/register' className='font-medium hover-underline'>
							Sign up now
						</NavLink>
					</p>
				</div>
			</div>
			{/* LOgin Image Container */}
			<div className='hidden md:block md:col-span-7 2xl:col-span-8 bg-tertiary-300'>
				<div className='h-full w-full flex items-center justify-center relative'>
					<div className='w-full h-full overflow-hidden'>
						<img
							src='/images/login-bg.jpg'
							alt='Task management illustration'
							className='w-full h-full object-cover'
						/>
						<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/70 to-transparent p-8'>
							<h2 className='text-3xl md:text-4xl 2xl:text-5xl 2xl:mb-5 font-bold text-tertiary'>
								Organize your tasks with OrTasks
							</h2>
							<p className='mt-2 text-tertiary'>
								The simple way to manage your daily tasks and improve your
								productivity
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

import { useEffect } from 'react';
import { Role } from '../../../types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRegister } from '../../../hooks/users';
import { AxiosError } from 'axios';
import { useToastError, useToastSuccess } from '../../../hooks/notification';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setCurrentPage } from '@/store/reducers/sessionReducer';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import FieldInfo from '@/components/FieldInfo';

const rolesData: Role[] = ['Employee', 'Lead', 'Manager'];

const zodSchema = z
	.object({
		email: z.string().email('Must be valid email'),
		username: z.string().min(8, 'Username must be atleast 8 or more'),
		password: z
			.string()
			.min(8, 'Pasword length must be 8 or more')
			.regex(
				/^(?=.*?[A-Z]).+$/,
				'Password must have alteast one capital letter'
			)
			.regex(/^(?=.*?[0-9]).+$/, 'Password nust have atleast 1 digit'),
		confirmPassword: z.string(),
		role: z.enum(['Employee', 'Lead', 'Manager']),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password is not match',
				path: ['confirmPassword'],
			});
		}
	});

const Register = () => {
	const showSuccessMessage = useToastSuccess();
	const showErrorMessage = useToastError();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state: RootState) => state.session);
	const { mutateAsync: userRegister, isPending: creatingUser } = useRegister();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			role: rolesData[0],
		},
		validators: {
			onChange: zodSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
			await userRegister(value, {
				onSuccess: (data) => {
					navigate('/login');
					showSuccessMessage(data.message);
				},
				onError: (error: unknown) => {
					if (error instanceof AxiosError) {
						const message: string = error.response?.data.error;

						if (Array.isArray(message)) {
							const errorMessage: string =
								error.response?.data.error[0].message;

							if (errorMessage.includes('Password'))
								showErrorMessage(errorMessage);
						} else {
							if (message.includes('username')) {
								showErrorMessage('Username is already taken!');
							} else if (message.includes('email')) {
								showErrorMessage('Email is already taken!');
							}
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
		<div className='grid grid-cols-1 md:grid-cols-12 min-h-screen bg-tertiary-300'>
			{/* Signup Container */}
			<div className='md:col-span-5 2xl:col-span-4 bg-primary p-8 flex flex-col justify-center'>
				<div className='max-w-md mx-auto w-full relative'>
					<NavLink to='/login'>
						<button
							disabled={creatingUser}
							className={`absolute text-tertiary flex right-0 top-[-1rem] 2xl:top-[-2rem] justify-end items-center md:md-5 2xl:mb-10 cursor-pointer transform hover:-translate-y-0.5 transition-transform duration-200 ${creatingUser && 'disabled:cursor-not-allowed'}`}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='lucide lucide-chevron-left-icon lucide-chevron-left'
							>
								<path d='m15 18-6-6 6-6' />
							</svg>
							Back to Login
						</button>
					</NavLink>

					<h1 className='text-3xl font-bold text-tertiary mb-8'>OrTasks</h1>

					<h2 className='text-2xl font-semibold text-tertiary mb-8'>
						Register New Account
					</h2>

					<form
						className='space-y-3'
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						{/* EMAIL */}
						<div>
							<form.Field
								name='email'
								children={(field) => (
									<>
										<label
											htmlFor={field.name}
											className='block text-sm font-medium text-tertiary mb-1'
										>
											Email Address <FieldInfo field={field} />
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
								)}
							/>
						</div>

						<div>
							{/* USERNAME */}
							<form.Field
								name='username'
								children={(field) => (
									<>
										<label
											htmlFor={field.name}
											className='block text-sm font-medium text-tertiary mb-1'
										>
											Username <FieldInfo field={field} />
										</label>
										<input
											type='text'
											name={field.name}
											id={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											required
											placeholder='Enter your username'
											className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
										/>
									</>
								)}
							/>
						</div>

						{/* ROLE */}
						<div>
							<form.Field
								name='role'
								children={(field) => (
									<>
										<label
											htmlFor={field.name}
											className='block text-sm font-medium text-tertiary mb-1'
										>
											Role <FieldInfo field={field} />
										</label>
										<div className='relative w-full'>
											<Select
												value={field.state.value}
												onValueChange={(value: Role) => {
													field.handleChange(value);
												}}
												required
											>
												<SelectTrigger
													className={cn(
														"items-center w-full text-left px-4 py-5 hover:bg-primary-100/5 cursor-pointer border border-tertiary text-tertiary focus:outline-none focus:ring-tertiary data-[placeholder]:text-tertiary/50 [&_svg:not([class*='text-'])]:text-tertiary"
													)}
													style={{ backgroundColor: 'transparent' }}
												>
													<SelectValue placeholder='Select Status' />
												</SelectTrigger>
												<SelectContent className='absolute z-10 bg-primary text-tertiary border border-tertiary rounded-b-md shadow-lg focus:outline-none'>
													{rolesData.map((role) => (
														<SelectItem
															value={role}
															key={role}
															className='cursor-pointer'
														>
															{role}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</>
								)}
							/>
						</div>

						{/* PASSWORD */}
						<div>
							<form.Field
								name='password'
								children={(field) => (
									<>
										<label
											htmlFor={field.name}
											className='block text-sm font-medium text-tertiary mb-1'
										>
											Password <FieldInfo field={field} />
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

						{/* CONFIRM PASS */}
						<div>
							<form.Field
								name='confirmPassword'
								children={(field) => (
									<>
										<label
											htmlFor={field.name}
											className='block text-sm font-medium text-tertiary mb-1'
										>
											Confirm Password <FieldInfo field={field} />
										</label>
										<input
											type='password'
											name={field.name}
											id={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											required
											placeholder='Enter again your password'
											className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
										/>
									</>
								)}
							/>
						</div>

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<>
									<button
										type='submit'
										disabled={!canSubmit}
										className={`w-full py-2 px-4 mt-3 bg-tertiary rounded-md font-medium hover:bg-tertiary/90 transition-colors cursor-pointer ${!canSubmit && 'disabled:cursor-not-allowed'}`}
									>
										{isSubmitting ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 200 200'
												className='w-6 h-6 mx-auto'
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
											'Sign Up'
										)}
									</button>
								</>
							)}
						/>
					</form>
				</div>
			</div>

			{/* Sign up Image Container */}
			<div className='hidden md:block md:col-span-7 2xl:col-span-8 bg-tertiary-300'>
				<div className='h-full w-full flex items-center justify-center relative'>
					<div className='w-full h-full overflow-hidden'>
						<img
							src='/images/register-bg.jpg'
							alt='Task management illustration'
							className='w-full h-full object-cover'
						/>
						<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/70 to-transparent p-8'>
							<h2 className='text-3xl md:text-4xl 2xl:text-5xl 2xl:mb-5 font-bold text-tertiary'>
								Start organizing your tasks with OrTasks now!
							</h2>
							<p className='mt-2 text-tertiary'>
								The simple way to manage your daily tasks and improve your
								productivity for free!, resgister now!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;

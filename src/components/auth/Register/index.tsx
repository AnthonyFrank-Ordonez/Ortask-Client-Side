import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { useState } from 'react';
import { RegisterForm, RegisterUser, Role, Roles } from '../../../types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRegister } from '../../../hooks/users';
import { AxiosError } from 'axios';
import { useToastError, useToastSuccess } from '../../../hooks/notification';

// DUMMY DATA FOR NOW
const roles: Roles[] = [
	{ id: 1, name: 'Employee', value: 'employee', tag: 'role' },
	{ id: 2, name: 'Tech Lead', value: 'lead', tag: 'role' },
	{ id: 3, name: 'Manager', value: 'manager', tag: 'role' },
];

const Register = () => {
	const showSuccessMessage = useToastSuccess();
	const showErrorMessage = useToastError();
	const { mutateAsync: userRegister, isPending: creatingUser } = useRegister();
	const navigate = useNavigate();
	const [selectedRole, setSelectedRole] = useState(roles[0]);
	const [registerForm, setRegisterForm] = useState<RegisterForm>({
		email: '',
		username: '',
		confirmPassword: '',
		password: '',
		role: roles[0].value as Role,
	});

	const handleInputChange = (event: React.SyntheticEvent | Roles) => {
		if ('target' in event && event.target instanceof HTMLInputElement) {
			const { name, value } = event.target;

			setRegisterForm((prevData) => ({
				...prevData,
				[name]: value,
			}));
		} else if ('tag' in event) {
			const { tag, value } = event;
			setRegisterForm((prevData) => ({
				...prevData,
				[tag]: value,
			}));
		}
	};

	const handleRegister = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const { confirmPassword, ...registerUser } = registerForm;

		if (registerUser.password !== confirmPassword) {
			showErrorMessage('Password is not matched!');
		} else {
			const newUser: RegisterUser = registerUser;
			await userRegister(newUser, {
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
		}
	};

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
						onSubmit={handleRegister}
						onChange={handleInputChange}
					>
						{/* EMAIL */}
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-tertiary mb-1'
							>
								Email Address
							</label>
							<input
								type='email'
								name='email'
								id='email'
								required
								placeholder='Enter your email'
								className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
							/>
						</div>

						<div>
							<label
								htmlFor='username'
								className='block text-sm font-medium text-tertiary mb-1'
							>
								Username
							</label>
							<input
								type='text'
								name='username'
								id='username'
								required
								placeholder='Enter your username'
								className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
							/>
						</div>

						{/* ROLE */}
						<div>
							<label
								htmlFor='role'
								className='block text-sm font-medium text-tertiary mb-1'
							>
								Role
							</label>
							<div className='relative w-full'>
								<Listbox
									value={selectedRole}
									onChange={(role) => {
										setSelectedRole(role);
										setRegisterForm((prevData) => ({
											...prevData,
											[role.tag]: role.value,
										}));
									}}
									name='role'
								>
									<div className='relative'>
										<ListboxButton
											id='role'
											className='flex justify-between items-center w-full text-left px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
										>
											{selectedRole.name}

											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 9l-7 7-7-7'
												/>
											</svg>
										</ListboxButton>
										<ListboxOptions className='absolute w-full z-10 mt-1 bg-primary text-tertiary border border-tertiary rounded-md shadow-lg focus:outline-none'>
											{roles.map((role) => (
												<ListboxOption
													key={role.id}
													value={role}
													className='cursor-pointer px-4 py-2 data-[focus]:bg-tertiary-500/10'
												>
													{role.name}
												</ListboxOption>
											))}
										</ListboxOptions>
									</div>
								</Listbox>
							</div>
						</div>

						{/* PASSWORD */}
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-tertiary mb-1'
							>
								Password
							</label>
							<input
								type='password'
								name='password'
								id='password'
								required
								placeholder='Enter your password'
								className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
							/>
						</div>

						{/* CONFIRM PASS */}
						<div>
							<label
								htmlFor='confirm-password'
								className='block text-sm font-medium text-tertiary mb-1'
							>
								Confirm Password
							</label>
							<input
								type='password'
								name='confirmPassword'
								id='confirm-password'
								required
								placeholder='Enter your password'
								className='w-full px-4 py-2 rounded-md border border-tertiary bg-transparent text-tertiary focus:outline-none focus:ring-tertiary'
							/>
						</div>

						<button
							type='submit'
							disabled={creatingUser}
							className={`w-full py-2 px-4 mt-3 bg-tertiary rounded-md font-medium hover:bg-tertiary/90 transition-colors cursor-pointer ${creatingUser && 'disabled:cursor-not-allowed'}`}
						>
							{creatingUser ? (
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

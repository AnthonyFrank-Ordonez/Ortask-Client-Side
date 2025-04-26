import { AxiosError } from 'axios';
import { useToastError, useToastSuccess } from '@/hooks/notification';
import { useResendVerification } from '../hooks/users';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const VerifyAccount = () => {
	const { user, isAuthenticated } = useSelector(
		(state: RootState) => state.session
	);
	const showSuccessMessage = useToastSuccess();
	const showErrorMessage = useToastError();
	const navigate = useNavigate();
	const [canVerify, setCanVerify] = useState(true);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const { mutateAsync: resendVerification, isPending: sendingVerification } =
		useResendVerification();

	useEffect(() => {
		if (!isAuthenticated) navigate('/login');
		else if (isAuthenticated && user?.isVerified) navigate('/');
	}, [isAuthenticated, navigate, user]);

	// TIMER FOR INITIAL LOAD
	useEffect(() => {
		const storeEndTime = localStorage.getItem('verificationAccountEndTime');

		if (storeEndTime) {
			const endTime = parseInt(storeEndTime);
			const currentTime = new Date().getTime();

			if (endTime >= currentTime) {
				setCanVerify(false);
				const timeRemaining = Math.ceil((endTime - currentTime) / 1000);
				setCanVerify(false);
				setTimeRemaining(timeRemaining);
			} else {
				localStorage.removeItem('verificationAccountEndTime');
			}
		}
	}, []);

	// USE FOR DECREMENTING TIME
	useEffect(() => {
		let timerId: ReturnType<typeof setInterval>;

		if (!canVerify && timeRemaining > 0) {
			timerId = setInterval(() => {
				setTimeRemaining((prev) => {
					if (prev <= 1) {
						setCanVerify(true);
						localStorage.removeItem('verificationAccountEndTime');
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => {
			if (timerId) clearInterval(timerId);
		};
	}, [canVerify, timeRemaining]);

	// USE FOR RESENDING VERIFICATION
	const handleResend = async () => {
		const endTime = new Date().getTime() + 5 * 60 * 1000;

		if (user?.email) {
			await resendVerification(
				{ email: user.email },
				{
					onSuccess: (data) => {
						showSuccessMessage(data.message);

						localStorage.setItem(
							'verificationAccountEndTime',
							endTime.toString()
						);

						setCanVerify(false);
						setTimeRemaining(5 * 60);
					},
					onError: (error: unknown) => {
						if (error instanceof AxiosError) {
							const message: string = error.response?.data.error;
							showErrorMessage(message);
						}
					},
				}
			);
		}
	};

	const formatTIme = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const sec = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-12 min-h-screen relative bg-tertiary'>
			<main className='col-span-1 md:col-span-12 2xl:col-span-12'>
				<div className='p-5 flex flex-col max-w-md md:max-w-md 2xl:max-w-xl w-full mx-auto my-35 2xl:my-60 justify-center items-center gap-5'>
					<h1 className='font-bold text-4xl 2xl:text-5xl text-primary text-center'>
						Verify your Account
					</h1>
					<p className='text-center text-primary font-light'>
						You neeed first to verify your account before you can access this
						page. If you have not receive an email, Please click the button
						below to resend the verification.
					</p>
					<button
						onClick={handleResend}
						disabled={sendingVerification || !canVerify}
						className={`px-5 py-3 bg-primary text-tertiary rounded-full w-1/2 hover:bg-primary/90 hover:cursor-pointer ${sendingVerification ? 'disabled:cursor-not-allowed' : !canVerify ? 'disabled:cursor-not-allowed' : ''}`}
					>
						{sendingVerification ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 200 200'
								className='w-6 h-6 mx-auto'
							>
								<circle
									fill='#f2f6d0'
									stroke='#f2f6d0'
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
									fill='#f2f6d0'
									stroke='#f2f6d0'
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
									fill='#f2f6d0'
									stroke='#f2f6d0'
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
						) : !canVerify ? (
							`Resend in ${formatTIme(timeRemaining)}`
						) : (
							'Resend Verification'
						)}
					</button>
				</div>
			</main>
		</div>
	);
};

export default VerifyAccount;

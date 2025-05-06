import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const TokenExpire = () => {
	const [countdown, setCountdown] = useState(5);
	const navigate = useNavigate();

	useEffect(() => {
		const fromVerification = document.cookie.includes('fromVerification=true');

		if (!fromVerification) {
			navigate('/login');
			return;
		}

		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					Cookies.remove('fromVerification');
					navigate('/login');
					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [navigate]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-12 min-h-screen relative bg-tertiary'>
			<main className='col-span-1 md:col-span-12 2xl:col-span-12'>
				<div className='flex flex-col max-w-md md:max-w-lg 2xl:max-w-2xl w-full h-screen mx-auto justify-center items-center gap-5'>
					<h1 className='font-bold text-6xl md:text-7xl 2xl:text-7xl text-primary text-center'>
						Token Expired
					</h1>
					<p className='text-center'>
						Your token has expired and exceeded the time limit of 5 minutes you
						you will be redirected to login page in {countdown} secs to login to
						your to be able to resend verification
					</p>
				</div>
			</main>
		</div>
	);
};

export default TokenExpire;

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigigate = useNavigate();
	return (
		<div className='grid grid-cols-1 md:grid-cols-12 min-h-screen relative bg-tertiary'>
			<main className='col-span-1 md:col-span-12 2xl:col-span-12'>
				<div className='flex flex-col max-w-md md:max-w-2xl 2xl:max-w-2xl w-full h-screen mx-auto justify-center items-center gap-5'>
					<h1 className='font-bold text-5xl md:text-7xl 2xl:text-7xl text-primary text-center'>
						404 NOT FOUND
					</h1>
					<button
						onClick={() => navigigate('/')}
						className='px-3 py-2 bg-primary rounded-full text-tertiary hover:bg-primary/80 cursor-pointer'
					>
						Go Back to Home
					</button>
				</div>
			</main>
		</div>
	);
};

export default NotFound;

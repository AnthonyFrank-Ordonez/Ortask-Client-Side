interface StepperProps {
	currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
	return (
		<div className='mb-12 relative py-4'>
			<div className='flex justify-between items-center relative max-w-lg mx-auto'>
				{/* Progress Line */}
				<div className='absolute top-5 left-3 right-2 h-1 bg-gray-500 -z-10'></div>
				<div
					className='absolute top-5 left-3 h-1 bg-primary-500 -z-10 transform-all duration-300'
					style={{
						width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '90%',
						maxWidth: '90',
					}}
				></div>
				{/* Step-circles */}
				{[1, 2, 3].map((step) => (
					<div key={step} className='flex flex-col items-center'>
						<div
							className={`flex items-center justify-center w-10 h-10 rounded-full duration-300 ${currentStep >= step ? 'bg-primary text-white' : 'bg-white border-2 border-gray-300 text-gray-500'}`}
						>
							{currentStep > step ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='lucide lucide-check-icon lucide-check w-5 h-7'
								>
									<path d='M20 6 9 17l-5-5' />
								</svg>
							) : (
								step
							)}
						</div>
						<div
							className={`text-xs mt-2 font-medium text-center transition-colors duration-300 ${currentStep >= step ? 'text-primary' : 'text-gray-500'}`}
						>
							{step === 1 && 'Task Details'}
							{step === 2 && 'Review'}
							{step === 3 && 'Complete'}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Stepper;

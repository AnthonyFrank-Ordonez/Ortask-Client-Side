import { format } from 'date-fns';
import { TaskDataType } from '@/types';

interface ReviewInformationProps {
	formData: TaskDataType;
	handlePrevStep: () => void;
	handleSubmit: (event: React.SyntheticEvent) => void;
}

const ReviewInformation = ({
	formData,
	handlePrevStep,
	handleSubmit,
}: ReviewInformationProps) => {
	return (
		<>
			<div className='mb-10'>
				<h1 className='text-5xl font-bold text-primary text-center '>
					Review Your Information
				</h1>
			</div>

			<div className='shadow shadow-gray-400/50 p-10 rounded-lg space-y-3 max-w-4xl mx-auto'>
				<div className='flex items-start md:items-center space-x-3 gap-2 flex-col md:flex-row'>
					<h1 className='font-bold text-primary text-2xl'>Task Name: </h1>
					<h1 className='font-normal text-xl md:mt-1'>{formData.taskName}</h1>
				</div>

				<div className='flex items-start md:items-center space-x-3 gap-2 flex-col md:flex-row'>
					<h1 className='font-bold text-primary text-2xl'>Due Date: </h1>
					<h1 className='font-normal text-xl md:mt-1'>
						{format(formData.dueDate, 'PPPP')}
					</h1>
				</div>

				<div className='flex items-start md:items-center space-x-3 gap-2 flex-col md:flex-row'>
					<h1 className='font-bold text-primary text-2xl'>Priority: </h1>
					<h1 className='font-normal text-xl md:mt-1'>
						{formData.priority.toLocaleUpperCase()}
					</h1>
				</div>

				<div className='flex items-start md:items-center space-x-3 gap-2 flex-col md:flex-row'>
					<h1 className='font-bold text-primary text-2xl'>Status: </h1>
					<h1
						className={`text-xl md:mt-1 ${formData.status === 'Completed' ? 'text-green-500 font-bold' : formData.status === 'To Do' ? 'text-black font-bold' : 'text-blue-500 font-bold'}`}
					>
						{formData.status.toUpperCase()}
					</h1>
				</div>
			</div>

			<div className='flex justify-end space-x-4'>
				<button
					onClick={handlePrevStep}
					className='px-6 py-3 mt-5 bg-gray-500 text-white rounded-full hover:bg-gray-600 hover:cursor-pointer transition-colors duration-300'
				>
					Prev Step
				</button>
				<button
					onClick={handleSubmit}
					className='px-6 py-3 mt-5 bg-primary text-tertiary rounded-full hover:bg-primary-300 hover:cursor-pointer transition-colors duration-300'
				>
					Submit
				</button>
			</div>
		</>
	);
};

export default ReviewInformation;

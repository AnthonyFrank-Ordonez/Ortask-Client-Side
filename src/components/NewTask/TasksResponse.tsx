import { Priority, Status, TaskDataType } from '@/types';

interface TasksResponseProps {
	setCurrentStep: (value: React.SetStateAction<number>) => void;
	setFormData: (value: React.SetStateAction<TaskDataType>) => void;
	setIsSubmiited: (value: React.SetStateAction<boolean>) => void;
	priorityData: Priority[];
	statusData: Status[];
}

const TasksResponse = ({
	setCurrentStep,
	setFormData,
	setIsSubmiited,
	priorityData,
	statusData,
}: TasksResponseProps) => {
	return (
		<>
			<div className='text-center space-y-4'>
				<div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-300 mb-4 text-primary'>
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
				</div>
				<h2 className='text-2xl font-bold'>Thank You!</h2>
				<p className='text-lg font-mono'>
					Your Task Have been Added Successfully!
				</p>
				<button
					onClick={() => {
						setCurrentStep(1);
						setFormData({
							taskName: '',
							dueDate: new Date(),
							priority: priorityData[0],
							status: statusData[0],
						});
						setIsSubmiited(false);
					}}
					className='px-6 py-3  bg-primary text-tertiary rounded-full hover:bg-primary-300 hover:cursor-pointer transition-colors duration-300'
				>
					Submit Another Response
				</button>
			</div>
		</>
	);
};

export default TasksResponse;

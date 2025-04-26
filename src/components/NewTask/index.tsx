import { useState } from 'react';
import { Priority, Status, TaskDataType } from '@/types';
import TaskInformation from './TaskInformation';
import TasksResponse from './TasksResponse';
import ReviewInformation from './ReviewInformation';
import Stepper from './Stepper';

const priorityData: Priority[] = ['Medium', 'Highest', 'Critical'];
const statusData: Status[] = ['To Do', 'In Progress', 'Completed'];

const NewTask = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [isSubmitted, setIsSubmiited] = useState(false);
	const [formData, setFormData] = useState<TaskDataType>({
		taskName: '',
		dueDate: new Date(),
		priority: priorityData[0],
		status: statusData[0],
	});

	const handleNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const handlePrevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		setIsSubmiited(true);
		setCurrentStep(3);

		console.log('🚀 ~ NewTask ~ isSubmitted:', isSubmitted);
		console.log('🚀 ~ NewTask ~ formData:', formData);
	};

	// On change for inputs
	const handleChange = (event: React.SyntheticEvent) => {
		if ('target' in event && event.target instanceof HTMLInputElement) {
			const { name, value } = event.target;
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	// On change for select
	const handleSelectChange = (value: string) => {
		const priorityValue = priorityData.find((prio) => prio === value);
		const statusValue = statusData.find((status) => status === value);
		if (priorityValue) {
			setFormData((prevData) => ({
				...prevData,
				priority: priorityValue,
			}));
		} else if (statusValue) {
			setFormData((prevData) => ({
				...prevData,
				status: statusValue,
			}));
		}
	};

	const handleSelectDate = (date: Date | undefined) => {
		if (date) {
			const dateNow = new Date();
			const localDate = new Date(date);
			localDate.setHours(
				dateNow.getHours(),
				dateNow.getMinutes(),
				dateNow.getSeconds()
			);

			setFormData((prevData) => ({
				...prevData,
				dueDate: localDate,
			}));
		}
	};

	return (
		<>
			<div className='p-6 relative'>
				<div>
					<h1 className='text-6xl font-bold text-primary mb-3'>Add New Task</h1>
					<p className='text-primary text-xl mb-4 md:mb-0'>
						Welcome! Here is where you can add new tasks
					</p>
				</div>
			</div>

			<div className='bg-tertiary/20 p-6 rounded-lg shadow border-2 border-gray-400/10 h-auto relative ml-3'>
				<Stepper currentStep={currentStep} />

				{currentStep === 1 && (
					<TaskInformation
						formData={formData}
						handleChange={handleChange}
						handleSelectChange={handleSelectChange}
						handleSelectDate={handleSelectDate}
						priorityData={priorityData}
						statusData={statusData}
						handleNextStep={handleNextStep}
					/>
				)}

				{currentStep === 2 && (
					<ReviewInformation
						formData={formData}
						handlePrevStep={handlePrevStep}
						handleSubmit={handleSubmit}
					/>
				)}

				{currentStep === 3 && (
					<TasksResponse
						setCurrentStep={setCurrentStep}
						setFormData={setFormData}
						setIsSubmiited={setIsSubmiited}
						priorityData={priorityData}
						statusData={statusData}
					/>
				)}
			</div>
		</>
	);
};

export default NewTask;

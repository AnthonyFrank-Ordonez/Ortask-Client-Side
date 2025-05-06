import { useState } from 'react';
import { Priority, Status, TaskDataType } from '@/types';
import TaskInformation from './TaskInformation';
import TasksResponse from './TasksResponse';
import ReviewInformation from './ReviewInformation';
import Stepper from './Stepper';
import { useCreateTask } from '@/hooks/tasks';
import { useToastError, useToastSuccess } from '@/hooks/notification';
import { AxiosError } from 'axios';

const priorityData: Priority[] = ['Medium', 'Highest', 'Critical'];
const statusData: Status[] = ['To Do', 'In Progress', 'Completed'];

const NewTask = () => {
	const showSuccessMessage = useToastSuccess();
	const showErrorMessage = useToastError();
	const [currentStep, setCurrentStep] = useState(1);
	const { mutateAsync: createNewTask } = useCreateTask();
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

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		await createNewTask(formData, {
			onSuccess: (data) => {
				if ('taskName' in data) {
					setCurrentStep(3);
					showSuccessMessage(`Task ${data.taskName} successfully created!`);
				}
			},
			onError: (error: unknown) => {
				if (error instanceof AxiosError) {
					if (Array.isArray(error.response?.data.error)) {
						const errorArrayMessage = error.response?.data.error[0].message;
						showErrorMessage(errorArrayMessage);
					} else {
						const errorMesage = error.response?.data.error.message;
						showErrorMessage(errorMesage);
					}
				}
				setCurrentStep(2);
			},
		});
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
				dueDate: date,
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
						priorityData={priorityData}
						statusData={statusData}
					/>
				)}
			</div>
		</>
	);
};

export default NewTask;

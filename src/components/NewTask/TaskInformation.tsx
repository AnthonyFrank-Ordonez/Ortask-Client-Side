import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Priority, Status, TaskDataType } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

interface TaskInformationProps {
	formData: TaskDataType;
	handleChange: (event: React.SyntheticEvent) => void;
	handleSelectChange: (value: string) => void;
	handleSelectDate: (date: Date | undefined) => void;
	priorityData: Priority[];
	statusData: Status[];
	handleNextStep: () => void;
}

const TaskInformation = ({
	formData,
	handleChange,
	handleSelectChange,
	handleSelectDate,
	priorityData,
	statusData,
	handleNextStep,
}: TaskInformationProps) => {
	return (
		<>
			<div className='mb-15'>
				<h1 className='text-5xl font-bold text-primary text-center'>
					{' '}
					Enter Task Information
				</h1>
			</div>

			<div className='mb-7'>
				<label
					htmlFor='task-name'
					className='block text-primary text-xl font-bold mb-3'
				>
					Task Name
				</label>
				<input
					onChange={handleChange}
					value={formData.taskName}
					className='border-0 border-b-2 border-primary/50 w-full appearance-none px-1 py-2 focus:outline-none leading-tight'
					type='text'
					id='task-name'
					name='taskName'
					placeholder='Input Task Name'
					required
				/>
			</div>

			<div className='mb-7'>
				<label
					htmlFor='due-date'
					className='block text-primary text-xl font-bold mb-3'
				>
					Due Date
				</label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={'outline'}
							className={cn(
								'relative w-full justify-start text-left font-normal items-center bg-transparent hover:bg-primary-100/5 cursor-pointer border-0 border-b-2 border-primary/50 text-primary focus:outline-none focus:ring-tertiary rounded-b-none rounded-t-none',
								!formData.dueDate && 'text-muted-foreground'
							)}
						>
							<div className='flex items-center gap-1 absolute left-1.5'>
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
									className='lucide lucide-calendar-icon lucide-calendar'
								>
									<path d='M8 2v4' />
									<path d='M16 2v4' />
									<rect width='18' height='18' x='3' y='4' rx='2' />
									<path d='M3 10h18' />
								</svg>
								{formData.dueDate ? (
									format(formData.dueDate, 'PPPP')
								) : (
									<span>Pick a date</span>
								)}
							</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className='w-full bg-primary text-tertiary'
						align='start'
					>
						<Calendar
							mode='single'
							selected={formData.dueDate}
							onSelect={handleSelectDate}
							initialFocus
							classNames={{
								day_selected: 'bg-tertiary text-black',
								day_today: 'bg-tertiary-500/10',
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>

			<div className='mb-7'>
				<label
					htmlFor='priority'
					className='block text-primary text-xl font-bold mb-3'
				>
					Priority
				</label>
				<div className='relative w-full'>
					<Select onValueChange={handleSelectChange} required>
						<SelectTrigger className='items-center w-full text-left px-1 py-2 hover:bg-primary-100/5 cursor-pointer border-0 border-b-2 border-primary/50 text-primary focus:outline-none focus:ring-tertiary rounded-b-none'>
							<SelectValue placeholder='Select Priority' />
						</SelectTrigger>
						<SelectContent className='absolute z-10 bg-primary text-tertiary border border-tertiary rounded-b-md shadow-lg focus:outline-none'>
							{priorityData.map((priority) => (
								<SelectItem value={priority} key={priority}>
									{priority}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='mb-7'>
				<label
					htmlFor='status'
					className='block text-primary text-xl font-bold mb-3'
				>
					Status
				</label>
				<div className='relative w-full'>
					<Select onValueChange={handleSelectChange} required>
						<SelectTrigger className='items-center w-full text-left px-1 py-2 hover:bg-primary-100/5 cursor-pointer border-0 border-b-2 border-primary/50 text-primary focus:outline-none focus:ring-tertiary rounded-b-none'>
							<SelectValue placeholder='Select Status' />
						</SelectTrigger>
						<SelectContent className='absolute z-10 bg-primary text-tertiary border border-tertiary rounded-b-md shadow-lg focus:outline-none'>
							{statusData.map((status) => (
								<SelectItem value={status} key={status}>
									{status}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='flex justify-end'>
				<button
					onClick={handleNextStep}
					disabled={
						!formData.taskName ||
						!formData.status ||
						!formData.priority ||
						!formData.dueDate
					}
					className='px-6 py-3 mt-5 bg-primary text-tertiary rounded-full hover:bg-primary-300 hover:cursor-pointer disabled:cursor-not-allowed transition-colors duration-300'
				>
					Next Step
				</button>
			</div>
		</>
	);
};

export default TaskInformation;

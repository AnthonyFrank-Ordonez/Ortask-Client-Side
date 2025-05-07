import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetUserTasks } from '@/hooks/tasks';
import { format } from 'date-fns';
import { useState } from 'react';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { Tasks } from '@/types';

const Calendar = () => {
	const { user } = useSelector((state: RootState) => state.session);
	const { data: userTasks } = useGetUserTasks(user);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [clickedEvent, setClickedEvent] = useState<Tasks | undefined>(
		undefined
	);

	const initialEvents = userTasks?.allTask.map((task) => ({
		id: task.id,
		title: task.taskName,
		date: format(task.dueDate, 'yyyy-MM-dd'),
	}));

	const handleEventClick = (clickInfo: EventClickArg) => {
		const selectedEvent = userTasks?.allTask?.find(
			(task) => task.id === clickInfo.event.id
		);
		setClickedEvent(selectedEvent);
		setIsModalOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setClickedEvent(undefined);
	};

	return (
		<>
			<div className='p-4 relative'>
				<div>
					<h1 className='text-6xl font-bold text-primary mb-3'>Calendar</h1>
				</div>
			</div>

			<div className='bg-tertiary/20 p-6 rounded-lg shadow border-2 border-gray-400/10 h-auto relative ml-3'>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					initialView='dayGridMonth'
					editable={true}
					selectable={true}
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay',
					}}
					events={initialEvents}
					eventClick={handleEventClick}
				/>
			</div>

			{isModalOpen && (
				<div className='fixed inset-0 z-50 bg-black/20 flex items-center justify-center'>
					<div className='bg-primary p-6 rounded-lg shadow-lg max-w-sm w-full'>
						<div className='flex justify-between items-center mb-5'>
							<h2 className='text-tertiary text-2xl font-bold'>
								Event Details
							</h2>
							<button
								onClick={closeModal}
								className='text-tertiary-500 hover:text-tertiary/20 hover:cursor-pointer'
							>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
						{clickedEvent && (
							<>
								<div className='mb-4 flex flex-col space-x-2 gap-5'>
									<div>
										<h1 className='text-tertiary font-medium text-l'>
											Task Name:{' '}
										</h1>
										<p className='text-tertiary font-normal'>
											{clickedEvent.taskName}
										</p>
									</div>

									<div>
										<h1 className='text-tertiary font-medium text-l'>
											Due Date:{' '}
										</h1>
										<p className='text-tertiary font-normal'>
											{format(clickedEvent.dueDate, 'PPPP')}
										</p>
									</div>

									<div>
										<h1 className='text-tertiary font-medium text-l'>
											Status & Priority:{' '}
										</h1>
										<p className='text-tertiary font-normal'>
											{clickedEvent.status} | {clickedEvent.priority}
										</p>
									</div>

									<div>
										<h1 className='text-tertiary font-medium text-l'>
											Task Created:{' '}
										</h1>
										<p className='text-tertiary font-normal'>
											{format(clickedEvent.createdAt, 'PPPP')}
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Calendar;

import {
	CartesianGrid,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	LineChart,
} from 'recharts';

interface TasksGraphProps {
	taskData:
		| {
				day: string;
				tasks: number;
		  }[]
		| undefined;
}

const TasksGraph = ({ taskData }: TasksGraphProps) => {
	return (
		<>
			<div className='bg-tertiary/20 p-6 rounded-lg shadow border-2 border-gray-400/10 h-auto lg:h-auto relative ml-3'>
				<h1 className='text-xl font-bold text-primary mb-4'>
					Completed Tasks Statistics
				</h1>
				<div className='p-4 w-auto h-auto'>
					<ResponsiveContainer height={300}>
						<LineChart data={taskData}>
							<CartesianGrid opacity={0.5} />
							<XAxis dataKey='day' tick={{ fill: '#574438' }} />
							<YAxis tick={{ fill: '#574438' }} />
							<Tooltip
								contentStyle={{
									background: '#f2f6d0',
									borderColor: '#f2f6d0',
									borderRadius: '0.5rem',
								}}
							/>
							<Line
								type='monotone'
								dataKey='tasks'
								stroke='#574438'
								fill='#574438'
								animationDuration={1500}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</>
	);
};

export default TasksGraph;

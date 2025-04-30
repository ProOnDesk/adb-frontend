import { useState } from 'react';
import { useMeasurements } from '@/app/_hooks/useMeasurements';
import Spinner from '../Spinner';
import {
	CartesianGrid,
	ResponsiveContainer,
	Scatter,
	ScatterChart,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function MeasurementList({ sensorId }: { sensorId: number }) {
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split('T')[0]
	);
	const today = new Date().toISOString().split('T')[0];
	const { data, isFetching } = useMeasurements({
		sensor_id: sensorId,
		date_filter: selectedDate,
		page: 1,
		size: 50,
	});
	const measurements = data?.items || [];
	const filledMeasurements = (() => {
		const result = [];
		const measurementsByHour = new Map();

		measurements.forEach(({ timestamp, value }) => {
			const hour = new Date(timestamp).getHours();
			measurementsByHour.set(hour, value);
		});

		for (let hour = 0; hour < 24; hour++) {
			result.push({
				timestamp: `${hour.toString().padStart(2, '0')}:00`,
				value: measurementsByHour.get(hour) ?? null,
			});
		}

		return result;
	})();

	const changeDate = (direction: 'prev' | 'next') => {
		const currentDate = new Date(selectedDate);
		currentDate.setDate(
			currentDate.getDate() + (direction === 'next' ? 1 : -1)
		);

		const newDate = currentDate.toISOString().split('T')[0];

		if (newDate <= today) {
			setSelectedDate(newDate);
		}
	};

	if (isFetching) {
		return (
			<div className='py-10 flex justify-center items-center'>
				<Spinner text='Ładowanie pomiarów...' />
			</div>
		);
	}
	return (
		<div className='measurement-list'>
			{measurements.length === 0 ? (
				<div className='py-10'>
					<p className='text-center text-gray-500 flex items-center justify-center gap-2'>
						<span>Brak pomiarów do wyświetlenia</span>
						<span>😔</span>
					</p>
				</div>
			) : (
				<>
					<div className='flex justify-between items-center'>
						<ResponsiveContainer width='90%' height={400}>
							<ScatterChart>
								<CartesianGrid />
								<XAxis dataKey='timestamp' name='Czas' />
								<YAxis dataKey='value' name='Wartość' />
								<Tooltip cursor={{ strokeDasharray: '3 3' }} />
								<Scatter
									data={filledMeasurements}
									fill='#3b82f6'
									legendType='circle'
								/>
							</ScatterChart>
						</ResponsiveContainer>
					</div>
				</>
			)}
			<div className='flex justify-center items-center mt-5 gap-2'>
				<button
					className='py-2 px-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white disabled:opacity-50'
					onClick={() => changeDate('prev')}
				>
					<FaArrowLeft />
				</button>
				<input
					type='date'
					id='date-picker'
					className='border rounded px-2 py-1'
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
					max={new Date().toISOString().split('T')[0]}
				/>

				<button
					className={`py-2 px-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white disabled:opacity-50 disabled:hover:bg-blue-500 disabled:cursor-not-allowed`}
					onClick={() => changeDate('next')}
					disabled={selectedDate === today}
				>
					<FaArrowRight />
				</button>
			</div>
		</div>
	);
}

import { useState } from 'react';
import { useMeasurements } from '@/app/_hooks/useMeasurements';
import Spinner from '../Spinner';
import ClientPagination from '../ClientPagination';
import {
	CartesianGrid,
	ResponsiveContainer,
	Scatter,
	ScatterChart,
	XAxis,
	YAxis,
} from 'recharts';

export default function MeasurementList({ sensorId }: { sensorId: number }) {
	const [page, setPage] = useState(1);
	const { data, isFetching } = useMeasurements({
		sensor_id: sensorId,
		page,
		size: 12,
	});
	const measurements = data?.items || [];
	const hoursMeasurements = (() => {
		const sortedMeasurements = measurements.sort(
			(a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
		);

		const filledMeasurements = [];
		let currentTime = new Date(sortedMeasurements[0]?.timestamp).setMinutes(0, 0, 0);
		const endTime = new Date(sortedMeasurements[sortedMeasurements.length - 1]?.timestamp).setMinutes(0, 0, 0);

		let index = 0;
		while (currentTime <= endTime) {
			const currentDate = new Date(currentTime);
			const formattedTime = currentDate.toLocaleTimeString('pl-PL', {
				hour: '2-digit',
				minute: '2-digit',
			});

			if (
				index < sortedMeasurements.length &&
				new Date(sortedMeasurements[index].timestamp).getTime() === currentTime
			) {
				filledMeasurements.push({
					...sortedMeasurements[index],
					timestamp: formattedTime,
				});
				index++;
			} else {
				filledMeasurements.push({
					timestamp: formattedTime,
					value: null, // No value for this hour
				});
			}

			currentTime += 60 * 60 * 1000; // Increment by 1 hour
		}

		return filledMeasurements;
	})();

	if (isFetching) {
		return (
			<div className='py-10 flex justify-center items-center'>
				<Spinner text='Ładowanie pomiarów...' />
			</div>
		);
	}
	console.log(measurements);
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
					{/* <ul>
						{measurements.map((measurement: Measurement) => (
							<li key={measurement.id} className='measurement-item'>
								<div className='flex justify-between items-center p-4 border-b'>
									<span className='font-medium text-lg'>
										{measurement.value}
									</span>
									<span className='text-gray-500'>
										{new Date(measurement.timestamp).toLocaleString('pl-PL', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})}
									</span>
								</div>
							</li>
						))}
					</ul> */}
					<div className='flex justify-between items-center'>
						<ResponsiveContainer width='100%' height={400}>
							<ScatterChart>
								<CartesianGrid />
								<XAxis dataKey='timestamp' />
								<YAxis dataKey='value' />
								<Scatter
									name='A school'
									data={hoursMeasurements}
									fill='#8884d8'
								/>
							</ScatterChart>
						</ResponsiveContainer>
					</div>
					<ClientPagination page={page} setPage={setPage} pages={data?.pages} />
				</>
			)}
		</div>
	);
}

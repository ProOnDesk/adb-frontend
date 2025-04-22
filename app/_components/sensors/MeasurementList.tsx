import { useState } from 'react';
import { Measurement, useMeasurements } from '@/app/_hooks/useMeasurements';
import Spinner from '../Spinner';
import ClientPagination from '../ClientPagination';

export default function MeasurementList({ sensorId }: { sensorId: number }) {
	const [page, setPage] = useState(1);
	const { data, isFetching } = useMeasurements({
		sensor_id: sensorId,
		page,
		size: 10,
	});
	const measurements = data?.items || [];

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
					<ul>
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
					</ul>
					<ClientPagination page={page} setPage={setPage} pages={data?.pages} />
				</>
			)}
		</div>
	);
}

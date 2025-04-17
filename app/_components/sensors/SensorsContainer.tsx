'use client';

import SensorsFilters from './SensorsFilters';
import ClientPagination from '../ClientPagination';
import { useState } from 'react';
import { Sensor, useSensors } from '@/app/_hooks/useSensors';
import Spinner from '../Spinner';

interface SensorsContainerProps {
	stationCode: string;
}

export default function SensorsContainer({
	stationCode,
}: SensorsContainerProps) {
	const { data, isLoading } = useSensors({
		station_code: stationCode,
		size: 4,
	});
	const sensors = data?.items;
	const currPage = data?.page || 1;
	const pages = data?.pages || 1;
	const [page, setPage] = useState(currPage);

	if (isLoading) {
		return (
			<div className='py-10'>
				<Spinner text='Ładowanie sensorów...' />;
			</div>
		);
	}

	return (
		<div>
			{/* <SensorsFilters /> */}
			<table className='min-w-full bg-white border border-gray-300 shadow'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='px-4 py-2 border'>Kod</th>
						<th className='px-4 py-2 border'>Nazwa wskaźnika</th>
						<th className='px-4 py-2 border'>Kod wskaźnika</th>
						<th className='px-4 py-2 border'>Typ pomiaru</th>
						<th className='px-4 py-2 border'>Czas uśredniania</th>
						<th className='px-4 py-2 border'>Aktywny</th>
					</tr>
				</thead>
				<tbody>
					{sensors?.map((sensor: Sensor) => (
						<tr key={sensor.id}>
							<td className='px-4 py-2 border'>{sensor.code}</td>
							<td className='px-4 py-2 border'>{sensor.indicator_name}</td>
							<td className='px-4 py-2 border'>{sensor.indicator_code}</td>
							<td className='px-4 py-2 border'>{sensor.measurement_type}</td>
							<td className='px-4 py-2 border'>{sensor.averaging_time}</td>
							<td className='px-4 py-2 border text-center'>
								{sensor.is_active ? '✅' : '❌'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ClientPagination page={page} pages={pages} setPage={setPage} />
		</div>
	);
}

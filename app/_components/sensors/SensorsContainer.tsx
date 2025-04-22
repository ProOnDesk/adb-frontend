'use client';

import SensorsFilters from './SensorsFilters';
import ClientPagination from '../ClientPagination';
import { useState } from 'react';
import { useSensors } from '@/app/_hooks/useSensors';
import Spinner from '../Spinner';
import SensorsList from './SensorsList';

interface SensorsContainerProps {
	stationCode: string;
}

export default function SensorsContainer({
	stationCode,
}: SensorsContainerProps) {
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(20);
	const [includeInactive, setIncludeInactive] = useState<boolean>(false);
	const [measurementType, setMeasurementType] = useState<
		'automatyczny' | 'manualny'
	>();
	const { data, isFetching: isSensorsFetching } = useSensors({
		station_code: stationCode,
		size: size,
		page: page,
		include_inactive: includeInactive,
		measurement_type: measurementType,
	});

	const sensors = data?.items;
	const pages = data?.pages || 1;

	if (isSensorsFetching) {
		return (
			<div className='py-10'>
				<Spinner text='Ładowanie listy sensorów...' />
			</div>
		);
	}

	return (
		<div className='px-2'>
			<p className='text-2xl font-semibold mb-4'>
				Lista sensorów: <span className='text-blue-600'>{data?.total}</span>
			</p>
			<SensorsFilters
				includeInactive={includeInactive}
				setIncludeInactive={setIncludeInactive}
				measurementType={measurementType}
				setMeasurementType={setMeasurementType}
				setPage={setPage}
				size={size}
				setSize={setSize}
			/>
			{sensors && sensors?.length > 0 && <SensorsList sensors={sensors} />}
			{sensors?.length === 0 && (
				<div className='py-10'>
					<p className='text-center text-gray-500 flex items-center justify-center gap-2'>
						<span>Brak sensorów do wyświetlenia</span>
						<span>😔</span>
					</p>
				</div>
			)}
			{sensors && sensors?.length > 0 && (
				<ClientPagination page={page} pages={pages} setPage={setPage} />
			)}
		</div>
	);
}

import React from 'react';
import { useSensors } from '../_hooks/useSensors';
import { Station } from '../_actions/stationActions';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';

interface StationDetailsModalProps {
	stationCode: string;
	station: Station;
	onCloseModal: () => void;
}

function formatDate(timestamp?: string): string {
	if (!timestamp) return '—';

	const date = new Date(timestamp);
	return new Intl.DateTimeFormat('pl-PL', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
}

export default function StationDetailsModal({
	stationCode,
	station,
	onCloseModal,
}: StationDetailsModalProps) {
	const { data: stationsData } = useSensors({
		station_code: stationCode,
		include_inactive: false,
		page: 1,
		size: 50,
	});

	return (
		<div className='px-6 py-2 mx-auto'>
			<div className='flex flex-row justify-between items-center mb-4'>
				<h1 className='text-2xl font-semibold text-gray-800'>
					{station.name}
				</h1>
				<button
					className='p-2 text-3xl hover:bg-gray-50 self-end'
					onClick={onCloseModal}
				>
					<IoClose />
				</button>
			</div>
			<div className='py-5'>
				{stationsData?.items.length ? (
					stationsData.items.map((sensor) => (
						<div
							key={sensor.id}
							className='grid grid-cols-3 gap-4 items-center p-4 text-sm border-b last:border-b-0'
						>
							<div className='font-medium text-gray-700'>
								{sensor.indicator_name}
							</div>
							<div className='text-gray-600'>
								{sensor.latest_measurement?.value ?? (
									<span className='italic text-red-500'>Brak danych</span>
								)}
							</div>
							<div className='text-gray-400 text-right text-xs'>
								{formatDate(sensor.latest_measurement?.timestamp)}
							</div>
						</div>
					))
				) : (
					<div className='text-center text-gray-500 italic py-5'>
						Brak aktywnych sensorów
					</div>
				)}
			</div>

			{/* Link do szczegółów stacji */}
			<div className='text-right mt-6'>
				<Link
					href={`/stations/${station.code}`}
					className='text-blue-500 hover:underline inline-block'
				>
					Przejdź do szczegółów stacji →
				</Link>
			</div>
		</div>
	);
}

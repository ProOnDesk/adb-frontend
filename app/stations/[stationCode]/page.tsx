import { getSensorsWithFilters, Sensor } from '@/app/_actions/stationActions';
import Pagination from '@/app/_components/Pagination';
import ReturnToStationButton from '@/app/_components/sensors/ReturnToStationButton';
import SensorsFilters from '@/app/_components/sensors/SensorsFilters';
import Link from 'next/link';

export interface SensorsSearchParams {
	measurement_type?: string;
	include_inactive?: boolean;
	page?: number;
	size?: number;
}

interface PageProps {
	searchParams: SensorsSearchParams;
	params: {
		stationCode: string;
	};
}

export const revalidate = 0;

export default async function page({ params, searchParams }: PageProps) {
	const { stationCode } = params;

	const {
		items: sensors,
		page,
		pages,
	} = await getSensorsWithFilters(stationCode, searchParams);

	if (!sensors || sensors.length === 0) {
		return (
			<div className='p-6 text-center space-y-6'>
				<p className='text-2xl font-semibold text-gray-700'>
					Brak sensorów dla stacji z kodem{' '}
					<span className='text-blue-600'>{stationCode}</span>.
				</p>
				<ReturnToStationButton />
			</div>
		);
	}

	return (
		<main className='p-6'>
			<Link
				className='text-blue-600 hover:underline mb-4 inline-block'
				href='/stations'
			>
				← Powrót do listy stacji
			</Link>
			<h1 className='text-2xl font-bold mb-4'>
				Sensory dla stacji <span className='text-blue-600'>{stationCode}</span>
			</h1>
			<SensorsFilters searchParams={searchParams} />
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
					{sensors.map((sensor: Sensor) => (
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
			<Pagination page={page} pages={pages} searchParams={searchParams} />
		</main>
	);
}

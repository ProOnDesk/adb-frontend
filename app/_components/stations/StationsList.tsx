'use client';

import { Station } from '@/app/_actions/stationActions';
import { useRouter } from 'next/navigation';

export default function StationsList({ stations }: { stations: Station[] }) {
	const router = useRouter();
	return (
		<table className='min-w-full border border-gray-200 rounded-lg overflow-hidden'>
			<thead className='bg-gray-100'>
				<tr>
					<th className='px-4 py-2 text-left'>ID</th>
					<th className='px-4 py-2 text-left'>Kod</th>
					<th className='px-4 py-2 text-left'>Nazwa</th>
					<th className='px-4 py-2 text-left'>Miasto</th>
					<th className='px-4 py-2 text-left'>Aktywne czujniki</th>
				</tr>
			</thead>
			<tbody>
				{stations.map((station: Station) => (
					<tr
						onClick={() => {
							router.push(`/stations/${station.code}`);
						}}
						key={station.id}
						className='border-t border-gray-200 hover:bg-gray-50 cursor-pointer'
					>
						<td className='px-4 py-2'>{station.id}</td>
						<td className='px-4 py-2'>{station.code}</td>
						<td className='px-4 py-2'>{station.name}</td>
						<td className='px-4 py-2'>{station.city}</td>
						<td className='px-4 py-2'>{station.count_working_sensors}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

'use client';

import { Station } from '@/app/_actions/stationActions';
import { useRouter } from 'next/navigation';

export default function StationsList({ stations }: { stations: Station[] }) {
	const router = useRouter();
	return (
		<table className='min-w-full border border-gray-200 rounded-lg overflow-hidden'>
			<thead className='bg-gray-100'>
				<tr>
					{/* <th className='px-4 py-2 text-left'>ID</th> */}
					<th className='px-4 py-2 text-left'>Kod</th>
					<th className='px-4 py-2 text-left'>Nazwa</th>
					{/* <th className='px-4 py-2 text-left'>Data rozpoczęcia</th> */}
					{/* <th className='px-4 py-2 text-left'>Data zakończenia</th> */}
					{/* <th className='px-4 py-2 text-left'>Typ stacji</th> */}
					<th className='px-4 py-2 text-left'>Typ obszaru</th>
					<th className='px-4 py-2 text-left'>Rodzaj stacji</th>
					<th className='px-4 py-2 text-left'>Województwo</th>
					<th className='px-4 py-2 text-left'>Miasto</th>
					{/* <th className='px-4 py-2 text-left'>Adres</th> */}
					{/* <th className='px-4 py-2 text-left'>Szerokość geograficzna</th> */}
					{/* <th className='px-4 py-2 text-left'>Długość geograficzna</th> */}
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
						{/* <td className='px-4 py-2'>{station.id}</td> */}
						<td className='px-4 py-2'>{station.code}</td>
						<td className='px-4 py-2'>{station.name}</td>
						{/* <td className='px-4 py-2'>{station.start_date}</td> */}
						{/* <td className='px-4 py-2'>{station.end_date}</td> */}
						{/* <td className='px-4 py-2'>{station.station_type}</td> */}
						<td className='px-4 py-2'>{station.area_type}</td>
						<td className='px-4 py-2'>{station.station_kind}</td>
						<td className='px-4 py-2'>{station.voivodeship}</td>
						<td className='px-4 py-2'>{station.city}</td>
						{/* <td className='px-4 py-2'>{station.address}</td> */}
						{/* <td className='px-4 py-2'>{station.latitude}</td> */}
						{/* <td className='px-4 py-2'>{station.longitude}</td> */}
						<td className='px-4 py-2'>{station.count_working_sensors}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

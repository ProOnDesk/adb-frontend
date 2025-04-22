import { Sensor } from '@/app/_hooks/useSensors';

interface SensorsListProps {
	sensors?: Sensor[];
}

export default function SensorsList({ sensors }: SensorsListProps) {
	return (
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
	);
}

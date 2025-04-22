import { Sensor } from '@/app/_hooks/useSensors';
import Modal from '../ui/Modal';
import SensorModal from './SensorModal';

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
					{/* <th className='px-4 py-2 border'>Data rozpoczęcia</th> */}
					{/* <th className='px-4 py-2 border'>Data zakończenia</th> */}
					<th className='px-4 py-2 border'>Ostatni pomiar</th>
				</tr>
			</thead>
			<tbody>
				{sensors?.map((sensor: Sensor) => {
					return (
						<Modal key={sensor.id}>
							<Modal.Open opens='sensor-modal'>
								<tr className='hover:bg-gray-50 cursor-pointer'>
									<td className='px-4 py-2 border'>{sensor.code}</td>
									<td className='px-4 py-2 border'>{sensor.indicator_name}</td>
									<td className='px-4 py-2 border'>{sensor.indicator_code}</td>
									<td className='px-4 py-2 border'>
										{sensor.measurement_type}
									</td>
									<td className='px-4 py-2 border'>{sensor.averaging_time}</td>
									<td className='px-4 py-2 border text-center'>
										{sensor.is_active ? '✅' : '❌'}
									</td>
									{/* <td className='px-4 py-2 border'>{sensor.start_date}</td> */}
									{/* <td className='px-4 py-2 border'>{sensor.end_date || 'N/A'}</td> */}
									<td className='px-4 py-2 border text-center'>
										{sensor.latest_measurement ? (
											<span className='flex flex-col items-center'>
												<span className='font-semibold'>
													{sensor.latest_measurement.value}
												</span>
												<span>
													{sensor.latest_measurement?.timestamp &&
														`(${new Date(
															sensor.latest_measurement.timestamp
														).toLocaleString('pl-PL', {
															hour: '2-digit',
															minute: '2-digit',
															year: 'numeric',
															month: '2-digit',
															day: '2-digit',
														})})`}
												</span>
											</span>
										) : (
											'Brak danych'
										)}
									</td>
								</tr>
							</Modal.Open>
							<Modal.Window name='sensor-modal'>
								<SensorModal sensor={sensor} onCloseModal={() => undefined} />
							</Modal.Window>
						</Modal>
					);
				})}
			</tbody>
		</table>
	);
}

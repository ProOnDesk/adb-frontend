import { Sensor } from '@/app/_hooks/useSensors';

export default function SensorInfo({ sensor }: { sensor: Sensor }) {
	return (
		<ul className="divide-y overflow-hidden text-gray-800">
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Kod sensora</span>
				<span className="font-medium">{sensor.code}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Kod stacji</span>
				<span className="font-medium">{sensor.station_code}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Kod wskaźnika</span>
				<span className="font-medium">{sensor.indicator_code}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Nazwa wskaźnika</span>
				<span className="font-medium">{sensor.indicator_name}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Czas uśredniania</span>
				<span className="font-medium">{sensor.averaging_time}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Typ pomiaru</span>
				<span className="font-medium">{sensor.measurement_type}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Data rozpoczęcia</span>
				<span className="font-medium">{sensor.start_date}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Data zakończenia</span>
				<span className="font-medium">{sensor.end_date || 'Brak'}</span>
			</li>
			<li className="flex justify-between items-center p-4">
				<span className="text-gray-600">Aktywny</span>
				<span
					className={sensor.is_active ? 'text-green-600 font-semibold' : 'text-red-500 font-medium'}
				>
					{sensor.is_active ? '✅' : '❌'}
				</span>
			</li>
		</ul>
	);
}

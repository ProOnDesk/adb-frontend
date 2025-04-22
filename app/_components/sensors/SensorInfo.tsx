import { Sensor } from '@/app/_hooks/useSensors';

export default function SensorInfo({ sensor }: { sensor: Sensor }) {
	return (
		<ul className="list-disc mx-auto w-fit py-5 space-y-2 text-gray-700">
			<li>
				<span className="font-semibold">Kod sensora:</span> {sensor.code}
			</li>
			<li>
				<span className="font-semibold">Kod stacji:</span> {sensor.station_code}
			</li>
			<li>
				<span className="font-semibold">Kod wskaźnika:</span> {sensor.indicator_code}
			</li>
			<li>
				<span className="font-semibold">Nazwa wskaźnika:</span> {sensor.indicator_name}
			</li>
			<li>
				<span className="font-semibold">Czas uśredniania:</span> {sensor.averaging_time}
			</li>
			<li>
				<span className="font-semibold">Typ pomiaru:</span> {sensor.measurement_type}
			</li>
			<li>
				<span className="font-semibold">Data rozpoczęcia:</span> {sensor.start_date}
			</li>
			<li>
				<span className="font-semibold">Data zakończenia:</span>{' '}
				{sensor.end_date || 'Brak'}
			</li>
			<li>
				<span className="font-semibold">Aktywny:</span> {sensor.is_active ? 'Tak' : 'Nie'}
			</li>
		</ul>
	);
}

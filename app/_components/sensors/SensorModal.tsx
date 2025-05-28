import { useState } from 'react';
import { Sensor } from '@/app/_hooks/useSensors';
import { IoClose } from 'react-icons/io5';
import SensorInfo from './SensorInfo';
import MeasurementList from './MeasurementList';

interface SensorModalProps {
	sensor: Sensor;
	onCloseModal: () => void;
}

export default function SensorModal({
	sensor,
	onCloseModal,
}: SensorModalProps) {
	const [activeTab, setActiveTab] = useState<'info' | 'measurements'>('info');

	return (
		<div className='flex flex-col bg-white pb-10'>
			<button
				className='p-2 text-3xl hover:bg-gray-50 transition duration-300 self-end'
				onClick={onCloseModal}
			>
				<IoClose />
			</button>
			<div className='flex mx-auto my-4'>
				<button
					className={`px-4 py-2 rounded-lg rounded-r-none transition-colors duration-300 ${
						activeTab === 'info'
							? 'bg-blue-500 text-white hover:bg-blue-600 '
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300 '
					}`}
					onClick={() => setActiveTab('info')}
				>
					Wyświetl Informacje
				</button>
				<button
					className={`px-4 py-2 rounded-lg rounded-l-none transition-colors duration-300 ${
						activeTab === 'measurements'
							? 'bg-blue-500 text-white hover:bg-blue-600'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}
					onClick={() => setActiveTab('measurements')}
				>
					Wyświetl Pomiary
				</button>
			</div>

			<div>
				{activeTab === 'info' && <SensorInfo sensor={sensor} />}
				{activeTab === 'measurements' && (
					<MeasurementList sensorId={sensor.id} sensor={sensor}/>
				)}
			</div>
		</div>
	);
}

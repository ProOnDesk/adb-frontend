import { useSensors } from '@/app/_hooks/useSensors';
import { Station } from '@/app/lib/getStationsWithFiltersClient';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Spinner from '../Spinner';
import { useCsvReport, usePdfReport } from '@/app/_hooks/useReport';

export default function ReportModal({
	onCloseModal,
	station,
}: {
	onCloseModal: () => void;
	station: Station;
}) {
	const { data: sensors, isFetching: isSensorsFetching } = useSensors({
		station_code: station?.code,
		size: 50,
		page: 1,
		include_inactive: false,
	});
	const { mutate: generatePdfReport, isPending: isPdfPending } =
		usePdfReport(onCloseModal);
	const { mutate: generateCsvReport, isPending: isCsvPending } =
		useCsvReport(onCloseModal);
	const isPending = isPdfPending || isCsvPending;
	const [dateRange, setDateRange] = useState({
		start_time: new Date(),
		end_time: new Date(),
	});
	const [choosedSensors, setChoosedSensors] = useState<number[]>([]);
	const [choosedFileType, setChoosedFileType] = useState<'pdf' | 'csv'>('pdf');

	const formatDate = (date: Date) => date.toISOString().split('T')[0];

	const handleSensorToggle = (sensorId: number) => {
		setChoosedSensors((prev) =>
			prev.includes(sensorId)
				? prev.filter((id) => id !== sensorId)
				: [...prev, sensorId]
		);
	};

	const handleGenerateReport = () => {
		if (choosedSensors.length === 0) {
			alert('Wybierz przynajmniej jeden sensor!');
			return;
		}
		if (choosedFileType === 'pdf') {
			generatePdfReport({
				station_id: station.id,
				start_time: dateRange.start_time.toISOString(),
				end_time: dateRange.end_time.toISOString(),
				sensor_ids: choosedSensors.map(Number),
			});
		}
		if (choosedFileType === 'csv') {
			generateCsvReport({
				station_id: station.id,
				start_time: dateRange.start_time.toISOString(),
				end_time: dateRange.end_time.toISOString(),
				sensor_ids: choosedSensors.map(Number),
			});
		}
	};

	return (
		<div className='flex flex-col gap-5 bg-white py-2'>
			<div className='flex flex-row justify-between items-center px-2'>
				<p className='text-2xl font-semibold text-gray-800'>
					Generowanie raportu
				</p>
				<button
					className='p-2 text-3xl hover:bg-gray-50 transition duration-300 self-end'
					onClick={onCloseModal}
				>
					<IoClose />
				</button>
			</div>

			{!isSensorsFetching ? (
				<div className='px-2'>
					<p className='font-semibold text-lg pb-2'>Wybierz sensory</p>
					{sensors?.items.map((sensor) => (
						<div key={sensor.id} className='flex flex-row items-center gap-2'>
							<input
								type='checkbox'
								id={`sensor-${sensor.id}`}
								checked={choosedSensors.includes(sensor?.id)}
								onChange={() => handleSensorToggle(sensor?.id)}
							/>
							<label htmlFor={`sensor-${sensor.id}`}>
								{sensor.indicator_name}
							</label>
						</div>
					))}
				</div>
			) : (
				<Spinner text='Ładowanie sensorów' />
			)}

			<div className='px-2'>
				<p className='font-semibold text-lg pb-2'>Wybierz zakres dat</p>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col'>
						<label htmlFor='start-date' className='text-sm font-medium'>
							Data początkowa
						</label>
						<input
							id='start-date'
							type='date'
							className='border rounded px-2 py-1'
							value={formatDate(dateRange.start_time)}
							onChange={(e) =>
								setDateRange((prev) => ({
									...prev,
									start_time: new Date(e.target.value),
								}))
							}
							max={formatDate(new Date())}
						/>
					</div>

					<div className='flex flex-col'>
						<label htmlFor='end-date' className='text-sm font-medium'>
							Data końcowa
						</label>
						<input
							id='end-date'
							type='date'
							className='border rounded px-2 py-1'
							value={formatDate(dateRange.end_time)}
							onChange={(e) =>
								setDateRange((prev) => ({
									...prev,
									end_time: new Date(e.target.value),
								}))
							}
							max={formatDate(new Date())}
							min={formatDate(dateRange.start_time)}
						/>
					</div>
				</div>
			</div>
			<div className='px-2'>
				<p className='font-semibold text-lg pb-2'>Wybierz typ pliku</p>
				<fieldset>
					<div className='flex flex-row items-center gap-2'>
						<input
							type='radio'
							id='pdf'
							name='fileType'
							value='pdf'
							checked={choosedFileType === 'pdf'}
							onChange={() => setChoosedFileType('pdf')}
						/>
						<label htmlFor='pdf'>PDF</label>
					</div>

					<div className='flex flex-row items-center gap-2'>
						<input
							type='radio'
							id='csv'
							name='fileType'
							value='csv'
							checked={choosedFileType === 'csv'}
							onChange={() => setChoosedFileType('csv')}
						/>
						<label htmlFor='csv'>CSV</label>
					</div>
				</fieldset>
			</div>

			<button
				type='button'
				className='px-4 py-2 mx-2 self-center w-fit bg-blue-500 text-white rounded hover:bg-blue-600 transition'
				onClick={handleGenerateReport}
				disabled={isPending}
			>
				{isPending ? 'Generowanie...' : 'Generuj raport'}
			</button>
		</div>
	);
}

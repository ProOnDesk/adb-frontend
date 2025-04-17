import ReturnToStationButton from '@/app/_components/sensors/ReturnToStationButton';
import SensorsContainer from '@/app/_components/sensors/SensorsContainer';

interface PageProps {
	params: {
		stationCode: string;
	};
}

export default async function page({ params }: PageProps) {
	const { stationCode } = params;

	return (
		<main className='p-6'>
			<ReturnToStationButton />
			<h1 className='text-2xl font-bold mb-4'>
				Sensory dla stacji <span className='text-blue-600'>{stationCode}</span>
			</h1>
			<SensorsContainer stationCode={stationCode} />
		</main>
	);
}

import ReturnToStationButton from '@/app/_components/sensors/ReturnToStationButton';
import SensorsContainer from '@/app/_components/sensors/SensorsContainer';
import StationDetails from '@/app/_components/stations/StationDetails';

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
			<StationDetails stationCode={stationCode} />
			<span className='block w-full h-[2px] bg-black/10 my-10 rounded-full'></span>
			<SensorsContainer stationCode={stationCode} />
		</main>
	);
}

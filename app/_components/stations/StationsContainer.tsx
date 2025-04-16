import { StationsSearchParams } from '@/app/stations/page';
import { getStationsWithFilters } from '@/app/_actions/stationActions';
import StationsList from './StationsList';
import Pagination from '../Pagination';

export default async function StationsContainer({
	searchParams,
}: {
	searchParams: StationsSearchParams;
}) {
	const data = await getStationsWithFilters(searchParams);

	return (
		<div>
			{data.items.length > 0 ? (
				<>
					<StationsList stations={data.items} />
					<Pagination
						page={data.page}
						pages={data.pages}
						searchParams={searchParams}
					/>
				</>
			) : (
				<p className='text-xl text-center py-10'>Nie znaleziono stacji</p>
			)}
		</div>
	);
}

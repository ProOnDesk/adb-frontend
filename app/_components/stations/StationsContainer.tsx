// StationsContainer.tsx (client)
'use client';

import { useEffect, useState } from 'react';
import { StationsSearchParams } from '@/app/stations/page';
import { getStationsWithFilters, Station } from '@/app/_actions/stationActions';
import StationsList from './StationsList';
import StationsPagination from './StationsPagination';
import Spinner from '../Spinner';

export default function StationsContainer({
	searchParams,
}: {
	searchParams: StationsSearchParams;
}) {
	const [stations, setStations] = useState<Station[]>([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			const data = await getStationsWithFilters(searchParams);
			console.log(data);
			setStations(data.items);
			setPage(data.page);
			setPages(data.pages);
			setLoading(false);
		};

		fetchData();
	}, [searchParams]);

	return (
		<>
			{loading ? (
				<div className='w-full flex flex-col justify-center py-10'>
					<Spinner text='Ładowanie stacji' />
				</div>
			) : (
				<>
					<StationsList stations={stations} />
					<StationsPagination
						page={page}
						pages={pages}
						searchParams={searchParams}
					/>
				</>
			)}
		</>
	);
}

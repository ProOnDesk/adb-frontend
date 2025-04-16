import StationsFilters from '../_components/stations/StationsFilters';
import StationsContainer from '../_components/stations/StationsContainer';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';

export const VOIVODESHIPS = [
	'PODKARPACKIE',
	'MAZOWIECKIE',
	'POMORSKIE',
	'WIELKOPOLSKIE',
	'ZACHODNIOPOMORSKIE',
	'LUBUSKIE',
	'DOLNOŚLĄSKIE',
	'OPOLSKIE',
	'ŁÓDZKIE',
	'ŚWIĘTOKRZYSKIE',
	'MAŁOPOLSKIE',
	'ŚLĄSKIE',
	'KUJAWSKO-POMORSKIE',
	'WARMINSKO-MAZURSKIE',
];

export interface StationsSearchParams {
	voivodeship?: string;
	include_inactive?: boolean;
	page?: number;
	size?: number;
	only_with_active_sensors?: boolean;
}

interface PageProps {
	searchParams: StationsSearchParams;
}

export default async function page({ searchParams }: PageProps) {
	return (
		<main className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Lista stacji</h1>
			<StationsFilters searchParams={searchParams} />
			<Suspense
				fallback={
					<div className='w-full flex flex-col justify-center py-10'>
						<Spinner text='Ładowanie stacji...' />
					</div>
				}
				key={searchParams.page}
			>
				<StationsContainer searchParams={searchParams} />
			</Suspense>
		</main>
	);
}

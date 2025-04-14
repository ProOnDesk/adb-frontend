import { getStationsWithFilters, Station } from '../_actions/stationActions';

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
	const {
		items: stations,
		page,
		pages,
	} = await getStationsWithFilters(searchParams);

	return (
		<main className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Lista stacji</h1>
			<form
				method='GET'
				className='mb-6 flex flex-col md:flex-row flex-wrap items-center gap-4'
			>
				<select
					name='voivodeship'
					defaultValue={searchParams.voivodeship ?? ''}
					className='border rounded px-3 py-2'
				>
					<option value=''>-- Wybierz województwo --</option>
					{VOIVODESHIPS.map((v) => (
						<option key={v} value={v}>
							{v}
						</option>
					))}
				</select>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='include_inactive'
						defaultChecked={searchParams.include_inactive ?? false}
						className='form-checkbox'
					/>
					Pokaż nieaktywne
				</label>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						name='only_with_active_sensors'
						defaultChecked={searchParams.only_with_active_sensors ?? false}
						className='form-checkbox'
					/>
					Pokaż tylko z aktywnymi sensorami
				</label>

				<select
					name='size'
					defaultValue={searchParams.size ?? 10}
					className='border rounded px-3 py-2'
				>
					<option value='10'>10 na stronę</option>
					<option value='20'>20 na stronę</option>
					<option value='30'>30 na stronę</option>
					<option value='40'>40 na stronę</option>
					<option value='50'>50 na stronę</option>
				</select>

				<button
					type='submit'
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
				>
					Filtruj
				</button>
			</form>

			<table className='min-w-full border border-gray-200 rounded-lg overflow-hidden'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='px-4 py-2 text-left'>ID</th>
						<th className='px-4 py-2 text-left'>Kod</th>
						<th className='px-4 py-2 text-left'>Nazwa</th>
						<th className='px-4 py-2 text-left'>Miasto</th>
						<th className='px-4 py-2 text-left'>Typ</th>
						<th className='px-4 py-2 text-left'>Czujniki</th>
					</tr>
				</thead>
				<tbody>
					{stations.map((station: Station) => (
						<tr key={station.id} className='border-t border-gray-200'>
							<td className='px-4 py-2'>{station.id}</td>
							<td className='px-4 py-2'>{station.code}</td>
							<td className='px-4 py-2'>{station.name}</td>
							<td className='px-4 py-2'>{station.city}</td>
							<td className='px-4 py-2'>{station.station_type}</td>
							<td className='px-4 py-2'>{station.count_working_sensors}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='mt-4 flex flex-col md:flex-row items-center justify-center gap-4'>
				{page > 1 && (
					<a
						href={`?${new URLSearchParams(
							Object.entries({
								...searchParams,
								page: page - 1,
							})
								.filter(([_, v]) => v !== undefined)
								.map(([k, v]) => [k, String(v)])
						).toString()}`}
						className='px-4 py-2 border rounded hover:bg-gray-200 transition'
					>
						« Poprzednia
					</a>
				)}

				<span className='text-gray-700'>
					Strona <strong>{page}</strong> z <strong>{pages}</strong>
				</span>

				<form method='GET' className='flex items-center gap-2'>
					<input
						type='number'
						name='page'
						min={1}
						max={pages}
						defaultValue={page}
						className='w-20 border rounded px-2 py-1 text-center'
					/>

					{Object.entries(searchParams)
						.filter(([key]) => key !== 'page')
						.map(([key, value]) => (
							<input key={key} type='hidden' name={key} value={String(value)} />
						))}

					<button
						type='submit'
						className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
					>
						Idź
					</button>
				</form>

				{page < pages && (
					<a
						href={`?${new URLSearchParams(
							Object.entries({
								...searchParams,
								page: page + 1,
							})
								.filter(([_, v]) => v !== undefined)
								.map(([k, v]) => [k, String(v)])
						).toString()}`}
						className='px-4 py-2 border rounded hover:bg-gray-200 transition'
					>
						Następna »
					</a>
				)}
			</div>
		</main>
	);
}

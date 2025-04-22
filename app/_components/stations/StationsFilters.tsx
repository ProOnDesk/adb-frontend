'use client';

import { StationsSearchParams, VOIVODESHIPS } from '@/app/stations/page';
import { FieldValues, useForm } from 'react-hook-form';

export default function StationsFilters({
	searchParams,
}: {
	searchParams: StationsSearchParams;
}) {
	const { register } = useForm<FieldValues>();
	return (
		<form
			method='GET'
			className='mb-6 flex flex-col md:flex-row flex-wrap items-center gap-4'
		>
			<select
				defaultValue={searchParams.voivodeship ?? ''}
				className='border rounded px-3 py-2'
				{...register('voivodeship')}
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
					{...register('include_inactive')}
					defaultChecked={searchParams.include_inactive ?? false}
					className='form-checkbox'
					value='true'
				/>
				Pokaż nieaktywne stacje
			</label>

			<label className='flex items-center gap-2'>
				<input
					type='checkbox'
					{...register('only_with_active_sensors')}
					defaultChecked={searchParams.only_with_active_sensors ?? false}
					className='form-checkbox'
					value='true'
				/>
				Pokaż tylko z aktywnymi sensorami
			</label>

			<select
				{...register('size')}
				defaultValue={searchParams.size ?? 50}
				className='border rounded px-3 py-2'
			>
				<option value='10'>10 na stronę</option>
				<option value='20'>20 na stronę</option>
				<option value='30'>30 na stronę</option>
				<option value='40'>40 na stronę</option>
				<option value='50'>50 na stronę</option>
			</select>

			<button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
				Filtruj
			</button>
		</form>
	);
}

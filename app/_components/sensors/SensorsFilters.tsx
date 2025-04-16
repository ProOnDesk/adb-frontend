'use client';

import { SensorsSearchParams } from '@/app/stations/[stationCode]/page';
import { FieldValues, useForm } from 'react-hook-form';

export default function SensorsFilters({
	searchParams,
}: {
	searchParams: SensorsSearchParams;
}) {
	const { register } = useForm<FieldValues>();
	return (
		<form
			method='GET'
			className='mb-6 flex flex-col md:flex-row flex-wrap items-center gap-4'
		>
			<label className='flex items-center gap-2'>
				<input
					type='checkbox'
					{...register('include_inactive')}
					defaultChecked={searchParams.include_inactive ?? false}
					className='form-checkbox'
					value='true'
				/>
				Pokaż nieaktywne sensory
			</label>

			<button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
				Filtruj
			</button>
		</form>
	);
}

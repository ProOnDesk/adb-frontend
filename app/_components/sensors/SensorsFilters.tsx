import { FieldValues, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

export interface SensorsFiltersProps {
	includeInactive: boolean;
	measurementType?: 'automatyczny' | 'manualny';
	setIncludeInactive?: (value: boolean) => void;
	setMeasurementType?: (value: 'automatyczny' | 'manualny') => void;
	setPage?: (value: number) => void;
	size?: number;
	setSize?: (value: number) => void;
}

export default function SensorsFilters({
	includeInactive,
	setIncludeInactive,
	measurementType,
	setMeasurementType,
	setPage,
	size,
	setSize,
}: SensorsFiltersProps) {
	const { register, handleSubmit } = useForm<FieldValues>();
	const queryClient = useQueryClient();

	const onSubmit = (data: FieldValues) => {
		setIncludeInactive?.(data.include_inactive);
		setMeasurementType?.(data.measurement_type);
		setSize?.(data.size);
		setPage?.(1);
		queryClient.invalidateQueries({
			queryKey: ['sensors'],
		});
	};

	return (
		<form
			className='mb-6 flex flex-col md:flex-row flex-wrap items-center gap-4'
			onSubmit={handleSubmit(onSubmit)}
		>
			<label className='flex items-center gap-2'>
				<input
					type='checkbox'
					{...register('include_inactive')}
					defaultChecked={includeInactive}
					className='form-checkbox'
					value='true'
				/>
				Pokaż nieaktywne sensory
			</label>

			<label className='flex items-center gap-2'>
				<select
					{...register('measurement_type')}
					className='form-select border rounded px-2 py-1'
					defaultValue={measurementType}
				>
					<option value=''>-- Wybierz typ pomiaru --</option>
					<option value='automatyczny'>Automatyczny</option>
					<option value='manualny'>Manualny</option>
				</select>
			</label>

			<select
				{...register('size')}
				defaultValue={size ?? 50}
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
	);
}

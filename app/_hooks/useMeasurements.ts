import { useQuery } from '@tanstack/react-query';
import { PaginatedResponse } from '../_actions/stationActions';

export interface Measurement {
	id: number;
	value: number;
	timestamp: string;
	sensor_id: number;
}

export function useMeasurements({
	sensor_id,
	date_filter,
	page,
	size,
}: {
	sensor_id: number;
	date_filter?: string;
	page?: number;
	size?: number;
}) {
	return useQuery<PaginatedResponse<Measurement[]>>({
		queryKey: ['measurements', sensor_id, page, size, date_filter],

		queryFn: async () => {
			let link = `${process.env.NEXT_PUBLIC_HOST}/measurements/${sensor_id}?`;
			if (date_filter) {
				link += `&date_filter=${date_filter}`;
			}
			if (page) {
				link += `&page=${page}`;
			}
			if (size) {
				link += `&size=${size}`;
			}

			try {
				const response = await fetch(link, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error(`Błąd serwera: ${response.status}`);
				}

				const data = await response.json();
				return data;
			} catch (error) {
				console.log('getMeasurements error:', error);
				throw error;
			}
		},
	});
}

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
	page,
	size,
}: {
	sensor_id: number;
	page?: number;
	size?: number;
}) {
	return useQuery<PaginatedResponse<Measurement[]>>({
		queryKey: ['measurements', sensor_id, page, size],

		queryFn: async () => {
			let link = `${process.env.NEXT_PUBLIC_HOST}/measurements/${sensor_id}?`;
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

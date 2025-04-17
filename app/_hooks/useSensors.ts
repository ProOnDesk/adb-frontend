import { useQuery } from '@tanstack/react-query';

export interface Sensor {
	id: number;
	code: string;
	station_code: string;
	indicator_code: string;
	indicator_name: string;
	averaging_time: string;
	measurement_type: string;
	start_date: string;
	end_date: string | null;
	is_active: boolean;
}

export interface PaginatedResponse<Response> {
	items: Response;
	total: number;
	page: number;
	pages: number;
}

export interface StationsSearchParams {
	station_code: string;
	include_inactive?: boolean;
	measurement_type?: 'automatyczny' | 'manualny';
	page?: number;
	size?: number;
}

export function useSensors({
	station_code,
	include_inactive,
	measurement_type,
	page,
	size,
}: StationsSearchParams) {
	return useQuery<PaginatedResponse<Sensor[]>>({
		queryKey: ['sensors'],
		queryFn: async () => {
			let link = `${process.env.NEXT_PUBLIC_HOST}/sensors?station_code=${station_code}`;
			if (include_inactive) {
				link += `&include_inactive=true`;
			}
			if (measurement_type) {
				link += `&measurement_type=${measurement_type}`;
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
					cache: 'no-store',
				});

				if (!response.ok) {
					throw new Error(`Błąd serwera: ${response.status}`);
				}

				const data = await response.json();
				return data;
			} catch (error) {
				console.log('getSensorsWithFilters error:', error);
				throw error;
			}
		},
	});
}

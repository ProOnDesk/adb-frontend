import { useQuery } from '@tanstack/react-query';
import { Station } from '../_actions/stationActions';

export function useStation({ station_code }: { station_code: string }) {
	return useQuery<Station>({
		queryKey: ['sensor', station_code],

		queryFn: async () => {
			const link = `${process.env.NEXT_PUBLIC_HOST}/stations/${station_code}`;

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
				console.log('getStaionDetails error:', error);
				throw error;
			}
		},
	});
}

import { useMutation } from '@tanstack/react-query';

export function usePdfReport(onSuccessCallback: () => void) {
	return useMutation({
		mutationFn: async ({
			station_id,
			start_time,
			end_time,
			sensor_ids,
		}: {
			station_id: number;
			start_time: string;
			end_time: string;
			sensor_ids: number[];
		}) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_HOST}/station/generate-pdf-report/${station_id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
					body: JSON.stringify({
						sensor_ids,
						start_time,
						end_time,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`Błąd serwera: ${response.status}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `raport-stacja-${station_id}.pdf`;
			document.body.appendChild(link);
			link.click();
			link.remove();

			return true;
		},
		onSuccess: () => {
			onSuccessCallback();
		},
		onError: (error) => {
			console.error('Błąd generowania raportu:', error);
		},
	});
}

export function useCsvReport(onSuccessCallback: () => void) {
	return useMutation({
		mutationFn: async ({
			station_id,
			start_time,
			end_time,
			sensor_ids,
		}: {
			station_id: number;
			start_time: string;
			end_time: string;
			sensor_ids: number[];
		}) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_HOST}/station/generate-csv-report/${station_id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
					body: JSON.stringify({
						sensor_ids,
						start_time,
						end_time,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`Błąd serwera: ${response.status}`);
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `raport-stacja-${station_id}.csv`;
			document.body.appendChild(link);
			link.click();
			link.remove();

			return true;
		},
		onSuccess: () => {
			onSuccessCallback();
		},
		onError: (error) => {
			console.error('Błąd generowania raportu:', error);
		},
	});
}
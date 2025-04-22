'use server';

import { notFound } from 'next/navigation';
import { StationsSearchParams } from '../stations/page';

export interface Station {
	id: number;
	code: string;
	name: string;
	start_date: string;
	end_date: string | null;
	station_type: string;
	area_type: string;
	station_kind: string;
	voivodeship: string;
	city: string;
	address: string;
	latitude: number;
	longitude: number;
	count_working_sensors: number;
}

export interface PaginatedResponse<Response> {
	items: Response;
	total: number;
	page: number;
	size: number;
	pages: number;
}

export async function getStationsWithFilters(
	params: StationsSearchParams
): Promise<PaginatedResponse<Station[]>> {
	let link = `${process.env.NEXT_PUBLIC_HOST}/stations?`;

	if (!params.page) {
		params.page = 1;
	}
	if (!params.size) {
		params.size = 50;
	}

	if (params.voivodeship) {
		link += `&voivodeship=${params.voivodeship}`;
	}
	if (params.include_inactive) {
		link += `&include_inactive=true`;
	}
	if (params.only_with_active_sensors) {
		link += `&only_with_active_sensors=true`;
	}

	if (params.page) {
		link += `&page=${params.page}`;
	}
	if (params.size) {
		link += `&size=${params.size}`;
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
		console.log('getStationsWithFilters error:', error);
		notFound();
	}
}

import { StationsSearchParams } from "@/app/stations/page";

interface GetStationsWithFiltersResponse {
  items: Station[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

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

export async function getStationsWithFiltersClient(
  params: StationsSearchParams,
  signal?: AbortSignal
): Promise<GetStationsWithFiltersResponse> {
  const query = new URLSearchParams();

  query.append("page", params.page?.toString() || "1");
  query.append("size", params.size?.toString() || "30");

  if (params.voivodeship) {
    query.append("voivodeship", params.voivodeship);
  }
  if (params.include_inactive) {
    query.append("include_inactive", "true");
  }
  if (params.only_with_active_sensors) {
    query.append("only_with_active_sensors", "true");
  }

  const link = `${process.env.NEXT_PUBLIC_HOST}/stations?${query.toString()}`;

  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Błąd pobierania stacji: ${res.status}`);
  }

  return res.json();
}

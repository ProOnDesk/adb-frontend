import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getStationsWithFiltersClient } from "../lib/getStationsWithFiltersClient";
import { Station } from "../_actions/stationActions";
import { StationsSearchParams } from "../stations/page";
import { ClipLoader, PulseLoader } from "react-spinners";
import Modal from "./ui/Modal";
import StationDetailsModal from "./StationDetailsModal";

// Fix ikon w Leaflet
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  params: StationsSearchParams;
}

export default function Map({ params }: MapProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setStations([]);
    setInitialLoading(true);
    setLoading(true);

    const fetchAllStations = async () => {
      try {
        const seenIds = new Set<number>();

        while (true) {
          const data = await getStationsWithFiltersClient(
            {
              ...params,
            },
            signal
          );

          const newItems = data.items.filter((item) => !seenIds.has(item.id));
          newItems.forEach((item) => seenIds.add(item.id));

          setStations((prev) => {
            const newStations = data.items.filter(
              (station) => !prev.some((s) => s.id === station.id)
            );
            return [...prev, ...newStations];
          });

          if (params.page === 1) {
            setInitialLoading(false);
            setLoading(true);
          }

          if (params.page! >= data.pages) break;
          params.page!++;
        }
      } catch (err) {
        console.error("Błąd podczas ładowania stacji:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStations();

    return () => {
      controller.abort();
      setStations([]);
      setInitialLoading(true);
      setLoading(true);
    };
  }, [params]);

  return (
    <div className="flex justify-center items-center p-4 w-full h-full ">
      <Modal>
        <div className="w-full h-full flex justify-center items-center rounded-lg shadow-2xl overflow-hidden bg-white">
          {initialLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <PulseLoader size={40} color="#3b82f6 " />
            </div>
          ) : (
            <div className="relative w-full h-full ">
              <MapContainer
                center={[52.2297, 21.0122]}
                zoom={6}
                scrollWheelZoom
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {stations.map((station) => (
                  <Marker
                    key={station.id}
                    position={[station.latitude, station.longitude]}
                  >
                    <Popup>
                      <div className="flex flex-col items-start">
                        <strong>{}</strong>
                        {station.city}, {station.address}
                        <Modal.Open opens={`stationDetails ${station.id}`}>
                          <button className="mt-2 text-blue-500 hover:underline">
                            Zobacz szczegóły
                          </button>
                        </Modal.Open>
                        <Modal.Window name={`stationDetails ${station.id}`}>
                          <StationDetailsModal stationCode={station.code} station={station} />
                        </Modal.Window>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              {loading && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[9999]">
                  <PulseLoader size={40} color="#fff" />
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

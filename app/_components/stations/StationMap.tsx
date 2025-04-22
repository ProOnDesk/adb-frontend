import { Station } from '@/app/_actions/stationActions';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

export default function StationMap({ station }: { station: Station }) {
  useEffect(() => {
    // Fix icon in Leaflet (runs only on client)
    delete (L.Icon.Default as any).prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[station.latitude, station.longitude]}
        zoom={6}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[station.latitude, station.longitude]}>
          <Popup>
            <div className="flex flex-col items-start">
              <strong>{station.name}</strong>
              {station.city}, {station.address}
              <button className="mt-2 text-blue-500 hover:underline">
                Zobacz szczegóły
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
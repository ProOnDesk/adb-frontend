"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// Fix domyślnego markera (bo Leaflet nie ładuje domyślnej ikony w Next)
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Map() {
  useEffect(() => {
    // Mapy potrzebują "document" więc to zabezpiecza przed błędami SSR
  }, []);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-2xl h-[500px]">
        <MapContainer
          center={[50.00414379836039, 21.653926003585845]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[50.00414379836039, 21.653926003585845]}>
            <Popup>Tutaj mieszka pawel kox</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

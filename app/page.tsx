import dynamic from "next/dynamic";
import Important from "./_components/Important";

// Dynamiczny import Map, z wyłączeniem SSR
const Map = dynamic(() => import("./_components/Map"), { ssr: false });

export default function Home() {
  return (
    <div>
      <p>Analiza danych biznesowych</p>
      <Important />
      <Map />
    </div>
  );
}

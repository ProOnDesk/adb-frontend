
"use client";

import { useState } from "react";
import AsidePanel from "./_components/AsidePanel";
import Map from "./_components/Map";
import { StationsSearchParams } from "./stations/page";

export default function Home() {
  const [params, setParams] = useState<StationsSearchParams>({
    voivodeship: undefined,
    include_inactive: false,
    only_with_active_sensors: false,
    size: 50,
    page: 1,
  });

  return (
    <div className="h-screen w-screen grid grid-rows-[2fr_9fr] grid-cols-[8fr_2fr] place-items-center pb-10">
      <div className="space-y-4 col-span-2">
        <h1 className="font-semibold text-center text-5xl">
          Analiza danych biznesowych - projekt
        </h1>
        <p className="font-medium text-center text-3xl">
          System pomiaru zanieczyszczenia powietrza Web-API
        </p>
        <p className="text-center">
          L09 - Mateusz Pazdan - Paweł Ochał - Michał Pazdan - Łukasz Michnik
        </p>
      </div>
      <Map params={params} />
      <AsidePanel params={params} setParams={setParams} />
    </div>
  );

}

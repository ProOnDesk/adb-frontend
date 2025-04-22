import React, { Dispatch, SetStateAction } from "react";
import { StationsSearchParams, VOIVODESHIPS } from "../stations/page";
import Link from "next/link";
import { VscGoToFile } from "react-icons/vsc";

interface AsidePanelProps {
  params: StationsSearchParams;
  setParams: Dispatch<SetStateAction<StationsSearchParams>>;
}

export default function AsidePanel({ params, setParams }: AsidePanelProps) {
  return (
    <div className="w-full h-full py-12 px-4 flex flex-col justify-between items-start ">
      <div className="mb-6 flex flex-col md:flex-row flex-wrap items-center gap-4">
        <select
          name="voivodeship"
          defaultValue={params.voivodeship ?? ""}
          className="border rounded px-3 py-2"
          onChange={(e) => {
            const value = e.target.value;
            setParams((prev) => ({
              ...prev,
              voivodeship: value === "" ? undefined : value,
              page: 1,
            }));
          }}
        >
          <option value="">-- Wybierz województwo --</option>
          {VOIVODESHIPS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="include_inactive"
            defaultChecked={params.include_inactive ?? false}
            className="form-checkbox"
            onChange={(e) => {
              const value = e.target.checked;
              setParams((prev) => ({
                ...prev,
                include_inactive: value,
                page: 1,
              }));
            }}
          />
          Pokaż nieaktywne
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="only_with_active_sensors"
            defaultChecked={params.only_with_active_sensors ?? false}
            className="form-checkbox"
            onChange={(e) => {
              const value = e.target.checked;
              setParams((prev) => ({
                ...prev,
                only_with_active_sensors: value,
                page: 1,
              }));
            }}
          />
          Pokaż tylko z aktywnymi sensorami
        </label>
      </div>
      <Link
        href="/stations"
        className="font-semibold underline hover:text-blue-500 transition-colors duration-300"
      >
        <span className="inline-block mr-2 mt-1">
          <VscGoToFile />
        </span>
        Przejdź do strony ze stacjami
      </Link>
    </div>
  );
}

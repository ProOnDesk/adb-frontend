import React from "react";

interface StationDetailsModalProps {
  stationCode: string;
}

export default function StationDetailsModal({
  stationCode,
}: StationDetailsModalProps) {
  return <div>StationDetailsModal {stationCode}</div>;
}

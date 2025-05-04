import React, { useState } from "react";
import SectorOverview from "./SectorOverview";
import StocksInSector from "./StocksInSector";

export default function SectorListPage() {
  const [selectedSector, setSelectedSector] = useState(null);

  const handleSelectSector = (sectorName) => {
    setSelectedSector((prev) => (prev === sectorName ? null : sectorName));
  };

  return (
    <>
      <SectorOverview onSelectSector={handleSelectSector} />
      {selectedSector && <StocksInSector sectorName={selectedSector} />}
    </>
  );
}

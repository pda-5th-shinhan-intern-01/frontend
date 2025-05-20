import React, { useState, useRef, useEffect } from "react";
import SectorOverview from "./SectorOverview";
import StocksInSector from "./StocksInSector";

export default function SectorListPage() {
  const [selectedSector, setSelectedSector] = useState("기술");
  const stockSectionRef = useRef(null);
  const isFirstRender = useRef(true);

  const handleSelectSector = (sectorName) => {
    setSelectedSector((prev) => (prev === sectorName ? null : sectorName));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (selectedSector && stockSectionRef.current) {
      stockSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedSector]);

  return (
    <>
      <SectorOverview onSelectSector={handleSelectSector} />
      <div ref={stockSectionRef}>
        <StocksInSector sector={selectedSector} />
      </div>
    </>
  );
}

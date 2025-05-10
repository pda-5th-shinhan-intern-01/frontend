import React, { useState, useRef, useEffect } from "react";
import SectorOverview from "./SectorOverview";
import StocksInSector from "./StocksInSector";

export default function SectorListPage() {
  const [selectedSector, setSelectedSector] = useState(null);
  const stockSectionRef = useRef(null);

  const handleSelectSector = (sectorName) => {
    // 클릭 시 동일 섹터면 닫기 (토글)
    setSelectedSector((prev) => (prev === sectorName ? null : sectorName));
  };

  // 섹터가 선택될 때마다 부드럽게 이동
  useEffect(() => {
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

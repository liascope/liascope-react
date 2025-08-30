import { useEffect, useState } from "react";

export default function AspectFilter({chartID}) {
  const [selectedAspect, setSelectedAspect] = useState("all");

  useEffect(() => {
    const container = document.getElementById(chartID);
    if (!container) return;

    const allAspects = ["opposition", "square", "trine", "sextile", "quincunx", "semiSextile"];

    allAspects.forEach((aspect) => {
      const lines = container.querySelectorAll(`svg line[data-name='${aspect}']`);
      lines.forEach((line) => {
        if (selectedAspect === "all" || selectedAspect === aspect) {
          line.style.display = "inline";
        } else {
          line.style.display = "none";
        }
      });
    });
  }, [selectedAspect, chartID]);

  return (
    <div className="text-xs text-left">
      <p className="sm:mb-1">Filter Aspects:</p>
      <select
        value={selectedAspect}
        onChange={(e) => setSelectedAspect(e.target.value)}
      >
        <option value="all">All Aspects</option>
        <option value="opposition">Opposition</option>
        <option value="square">Square</option>
        <option value="trine">Trine</option>
        <option value="sextile">Sextile</option>
        <option value="quincunx">Quincunx</option>
        <option value="semiSextile">Semi-Sextile</option>
      </select>
    </div>
  );
};


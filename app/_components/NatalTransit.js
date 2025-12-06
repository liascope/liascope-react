 'use client'
import * as astrochart from '@astrodraw/astrochart';
import { motion } from 'framer-motion';
import { useAstroForm } from '../_lib/context/AstroContext';
import { useEffect } from 'react';
import AspectTableTransitNatal from './AspectTableTransitNatal';
import { settings } from '@/app/_lib/config';
import NatalTransitHouseSign from './NatalTransitHouseSign';
import useTimeunknown from '@/app/_lib/hooks/useTimeunknown';
import useRetroPlanets from '@/app/_lib/hooks/useRetroPlanets';
import { calculateAspectsBetweenCharts } from '@/app/_lib/data-service';
import AspectFilter from './AspectFilter';

export default function NatalTransitWrapper({ chartID }) {
  const { natalData, transitData, unknownTime, retro } = useAstroForm();

  useTimeunknown(chartID, unknownTime);
  useRetroPlanets(chartID, retro);

  // render combined Natal + Transit chart
  useEffect(() => {
    if (!natalData || !transitData) return;

    const chart = new astrochart.Chart(chartID, 750, 750, settings);
    chart.radix(natalData).transit(transitData).aspects(calculateAspectsBetweenCharts(natalData, transitData));

    const container = document.getElementById(chartID); if (!container) return;

    const svg = container.querySelector("svg"); if (!svg) return;

    // hide transit cusps if transit time unknown
    if (unknownTime.transit) {const el = svg.querySelector(`g#${chartID}-astrology-transit-cusps`);
      if (el) el.classList.add("hidden");}

    // add "r" for retro planets
    retro?.transit?.forEach((retroPlanet) => {
      const gEl = svg.querySelector(`g#${chartID}-astrology-transit-planets-${retroPlanet}`); if (!gEl) return;
      const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textEl.textContent = "r";
      const bbox = gEl.getBBox();
      textEl.setAttribute("x", bbox.x + bbox.width + 3);
      textEl.setAttribute("y", bbox.y + bbox.height / 2);
      svg.appendChild(textEl); });

    return () => {container.innerHTML = "";};
  }, [chartID, natalData, transitData, unknownTime, retro]);

  return (
    <motion.div
      className="w-screen sm:w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col-reverse sm:flex-row justify-around w-screen sm:w-full h-fit relative">
        {/* Left panel: tables */}
        <div className="flex flex-col sm:items-baseline items-center sm:w-[40rem] h-fit gap-5 w-screen p-2">
          <NatalTransitHouseSign natalData={natalData} transitData={transitData} />
          <AspectTableTransitNatal natalData={natalData} transitData={transitData} />
        </div>

        {/* Right panel: chart + filter */}
        <div className="relative">
          <div className="absolute top-0 left-2 z-25">
            <AspectFilter chartID={chartID} />
          </div>
          <div className="sm:block flex items-center justify-center h-svw sm:h-fit" id={chartID} />
        </div>
      </div>
    </motion.div>
  );
}

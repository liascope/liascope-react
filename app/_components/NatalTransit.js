'use client'
import * as astrochart from '@astrodraw/astrochart';
import { useAstroForm } from './context/AstroContext';
import { useEffect } from 'react';
import AspectTableTransitNatal from './AspectTableTransitNatal';
import { settings } from '@/app/_lib/config';
import NatalTransitHouseSign from './NatalTransitHouseSign';
import useTimeunknown from '@/app/_lib/hooks/useTimeunknown';
import useRetroPlanets from '@/app/_lib/hooks/useRetroPlanets';
import { calculateAspectsBetweenCharts } from '@/app/_lib/data-service';
import AspectFilter from './AspectFilter';

export default function NatalTransit({chartID}) {  
const { natalData, transitData, unknownTime, retro} = useAstroForm()

useTimeunknown(chartID, unknownTime)
useRetroPlanets(chartID, retro)
useEffect(()=>{
         const natalTransit = new astrochart.Chart("natalTransit", 750, 750, settings); 
         natalTransit.radix(natalData).transit(transitData).aspects(calculateAspectsBetweenCharts(natalData, transitData))
       const container = document.getElementById(chartID)
        const svg = container.querySelector('svg');

      if (unknownTime?.transit) {
          const el = svg.querySelector(`g#${chartID}-astrology-transit-cusps`);
          if (el) {
            el.classList.add('hidden'); 
          }
        }
if ( retro?.transit) {
      retro.transit.forEach((retroPlanet) => {
const gEl = svg.querySelector(`g#${chartID}-astrology-transit-planets-${retroPlanet}`);
  if (gEl) {
    // create new 'r' element
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.textContent = "r";
    // position of the r-element
    const bbox = gEl.getBBox();
    textEl.setAttribute("x", bbox.x + bbox.width + 3);
    textEl.setAttribute("y", bbox.y + bbox.height / 2); 
    svg.appendChild(textEl);
  }
 });
  }
     return () => {
    const chart = document.getElementById(chartID);
    if (chart) chart.innerHTML = '';
  };
    },[natalData, transitData, unknownTime, retro, chartID])

  return <div className='flex flex-col-reverse sm:flex-row justify-around w-screen sm:w-full h-fit relative'>
  <div className='flex flex-col sm:items-baseline items-center sm:w-[40rem] h-fit gap-5 w-screen p-2'> 
    <NatalTransitHouseSign natalData={natalData} transitData={transitData}></NatalTransitHouseSign> 
  <AspectTableTransitNatal natalData={natalData} transitData={transitData}></AspectTableTransitNatal> 
  </div><div className='relative'><div className='absolute top-0 left-2 z-25'><AspectFilter chartID={chartID}></AspectFilter></div>
  <div className='sm:block flex items-center justify-center h-svw sm:h-fit' id={chartID}/> </div>
  </div>
}


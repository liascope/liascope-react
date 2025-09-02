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
        const selector = `g#${chartID}-astrology-transit-planets-${retroPlanet} path`;
        const pathEl = svg.querySelector(selector);
        if (pathEl) {
          pathEl.setAttribute('stroke', 'red');
          pathEl.setAttribute('stroke-width', '2');
        }
      });
  }
     return () => {
    const chart = document.getElementById(chartID);
    if (chart) chart.innerHTML = '';
  };
    },[natalData, transitData, unknownTime, retro, chartID])

  return <div className='flex flex-col-reverse sm:flex-row w-screen sm:w-fit h-fit relative'>
  <div className='flex flex-col '> 
    <NatalTransitHouseSign natalData={natalData} transitData={transitData}></NatalTransitHouseSign> 
  <AspectTableTransitNatal natalData={natalData} transitData={transitData}></AspectTableTransitNatal> 
  </div><div className='relative'><div className='absolute top-0 sm:left-2 left-0 z-25'><AspectFilter chartID={chartID}></AspectFilter></div>
  <div className='sm:block flex items-center justify-center h-svw p-5 sm:p-0 -ml-12 sm:ml-0' id={chartID}/> </div>
  </div>
}


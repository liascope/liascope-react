'use client';

import { motion } from 'framer-motion';
import AspectTable from '@/app/_components/AspectTable';
import { useRenderCharts } from '@/app/_lib/hooks/useRenderCharts.';
import HouseSignList from './HouseSignList';
import AspectList from './AspectList';
import ToggleAspectListBtn from './ToggleAspectListBtn';
import { useAstroForm } from '../_lib/context/AstroContext';
import useTimeunknown from '@/app/_lib/hooks/useTimeunknown';
import useRetroPlanets from '@/app/_lib/hooks/useRetroPlanets';
import AspectFilter from './AspectFilter';
import CopyChart from './CopyChart';
import { usePathname } from 'next/navigation';
import { capitalize, zodiac } from '../_lib/config';

export default function Charts({ chartID }) {
  const { unknownTime, retro} = useAstroForm();
 
 // Chart & Aspect Table & Aspect List, House and Planet Positions Lists
  const { aspect, aspectList, planetList, cuspList } = useRenderCharts(chartID);

  // CopyChart Feature
const pathname = usePathname()
const timeUnknown = (["natal", "draconic", "progression"].includes(chartID) && unknownTime?.birth) || (chartID === "transit" && unknownTime?.transit);
const copyChart = [`${capitalize(pathname.split('/').at(-1))}-Chart:`, "",
  ...(timeUnknown ? ["Unknown time, house placements unavailable.", ""] : ["Signs:", ...cuspList.map(c => `${c.house}: ${c.sign}`), ""]),
 "Planets:", ...planetList.map(p => {const house = p.planet === "As" ? 1 : p.planet === "Mc" ? 10 : p.house;
  return `${p.planet} ${retro[chartID]?.includes(p.planet) ? "Retrograde" : ""} ${Object.keys(zodiac).find(s => zodiac[s] === p.symbol)} ${!timeUnknown ? `in House ${house}` : ""}`;}),"",
  "Aspects:", ...aspect,"",].join("\n");

  useTimeunknown(chartID, unknownTime)
  useRetroPlanets(chartID, retro)

  return (
    <motion.div
      className="flex flex-row max-[1000px]:flex-col-reverse w-screen md:w-full justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -7 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-[1000px]:w-[40%] min-w-0 h-fit flex flex-col">

      <CopyChart copy={copyChart}/>

        <div className="w-screen min-[1000px]:w-full flex flex-col gap-5 ">
        <HouseSignList data={{ planetList, cuspList }} />
        <AspectTable aspect={aspect} />
       </div>
        <ToggleAspectListBtn
          buttonLabel="Aspect List"
          className="relative z-1 -mt-15 sm:ml-12 ml-6 right-2"
          position="bottom-1"
          dropdownClassName="absolute w-fit -left-5 sm:left-0 p-2 h-[12rem] text-center overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        >
          <AspectList data={{ aspectList }} />
        </ToggleAspectListBtn>
        
      </div>
    <div className='relative min-[1000px]:w-[60%] min-w-0'>
    
    <div className='absolute sm:top-0 top-6 left-2 z-25'><AspectFilter chartID={chartID}></AspectFilter></div>

      <div className='flex items-center justify-center max-[1000px]:h-svw' id={chartID}/>
       </div>
    </motion.div>
  );
}

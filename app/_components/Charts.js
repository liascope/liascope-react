'use client';

import { motion } from 'framer-motion';
import AspectTable from '@/app/_components/AspectTable';
import { useRenderCharts } from '@/app/_lib/hooks/useRenderCharts.';
import HouseSignList from './HouseSignList';
import AspectList from './AspectList';
import ToggleAspectListBtn from './ToggleAspectListBtn';
import { useAstroForm } from './context/AstroContext';
import useTimeunknown from '@/app/_lib/hooks/useTimeunknown';
import useRetroPlanets from '@/app/_lib/hooks/useRetroPlanets';
import AspectFilter from './AspectFilter';

export default function Charts({ chartID }) {
  const { unknownTime, retro} = useAstroForm();

 // Chart & Aspect Table & Aspect List, House and Planet Positions Lists
  const { aspect, aspectList, planetList, cuspList } = useRenderCharts(chartID);

  useTimeunknown(chartID, unknownTime)
  useRetroPlanets(chartID, retro)

  return (
    <motion.div
      className="flex flex-row w-full justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-[35%] h-fit flex flex-col">
        <HouseSignList data={{ planetList, cuspList }} />
        <AspectTable aspect={aspect} />

        <ToggleAspectListBtn
          buttonLabel="Aspect List"
          className="relative z-1 -mt-25 ml-12 right-2"
          position="bottom-1"
          dropdownClassName="absolute w-fit left-0 p-2 h-[15rem] text-center overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        >
          <AspectList data={{ aspectList }} />
        </ToggleAspectListBtn>
      </div>
    <div className='relative'><div className='absolute top-0 left-2 z-25'><AspectFilter chartID={chartID}></AspectFilter></div>
      <div id={chartID}/> </div>
    </motion.div>
  );
}
 
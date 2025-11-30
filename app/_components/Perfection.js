'use client'
 import { useRenderCharts } from "@/app/_lib/hooks/useRenderCharts."
import { useAstroForm } from "../_lib/context/AstroContext"
import { findSign, calculateAge } from "@/app/_lib/helper"
import { perfectionDegrees } from "@/app/_lib/config"
import { perfectionSignDescriptions, perfectionHouseDescriptions } from "@/app/_lib/data"
import { motion } from "framer-motion"

export default function Perfection({chartID}) {
const {perfectionData, formState, unknwownTime} = useAstroForm()
useRenderCharts(chartID)
if (unknwownTime?.birth) return null;

const zodiacArray = perfectionData?.cusps.map((c)=>findSign(c))
const index = calculateAge(formState?.birthDate) % 12
 const perfectionHouse = index + 1
 const degree = perfectionDegrees[index];
 const perfectionSign = zodiacArray[perfectionHouse - 1];
       
 return (
  <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.4 }}
    >
 <div className="flex flex-col-reverse sm:flex-row w-screen sm:w-full h-fit">
    <div className="sm:text-2xl text-md flex flex-col gap-5 sm:gap-10 sm:my-20 space-x-20 px-5 sm:pl-6 "><p><strong className="text-[#4fa091]" >Perfection in the {perfectionHouse}th house </strong> {perfectionHouseDescriptions[perfectionHouse]}</p><p><strong className="text-[#4fa091]"> {perfectionSign}</strong> {perfectionSignDescriptions[perfectionSign]}</p>
</div>

 <div className="relative sm:w-225 sm:h-225 w-screen">
    <div className='sm:block flex items-center justify-center h-svw sm:h-fit ' id={chartID}></div> 
    {/* center:<div className="absolute top-[49%] bottom-[49%] left-[49%] right-[49%] z-20"> +</div> */}
     <div style={{ transform: `rotate(${degree}deg)` }} className="absolute w-[93%] h-[24%] sm:w-[88%] sm:h-[33%] bg-[rgb(232,155,83,0.3)] z-10 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]   top-[38%] right-[4%] sm:top-[34%] sm:right-[6%]"></div>  
    </div>
    </div></motion.div> )
 }

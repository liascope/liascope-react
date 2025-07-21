'use client'
 import { useRenderCharts } from "@/app/_lib/hooks/useRenderCharts."
import { useAstroForm } from "./context/AstroContext"
import { findSign, calculateAge } from "@/app/_lib/helper"
import { perfectionDegrees } from "@/app/_lib/config"
import { perfectionSignDescriptions, perfectionHouseDescriptions } from "@/app/_lib/data"

export default function Perfection({chartID}) {
const {perfectionData, formState} = useAstroForm()
const {unknwownTime} = useAstroForm();
useRenderCharts(chartID)
if (unknwownTime?.birth) return null;

const zodiacArray = perfectionData?.cusps.map((c)=>findSign(c))
const index = calculateAge(formState?.birthDate) % 12
 const perfectionHouse = index + 1
 const degree = perfectionDegrees[index];
 const perfectionSign = zodiacArray[perfectionHouse - 1];
       

 return <div className="flex flex-row w-full">

    <div className="text-2xl flex flex-col gap-10 my-20 space-x-20 pl-6 "><p><strong className="text-[#4fa091]" >Perfection in the {perfectionHouse}th house </strong> {perfectionHouseDescriptions[perfectionHouse]}</p><p><strong className="text-[#4fa091]"> {perfectionSign}</strong> {perfectionSignDescriptions[perfectionSign]}</p>
</div>

 <div className="relative w-225 h-225">
    <div className="w-full h-full" id={chartID}></div> 
    {/* <div className="absolute top-[49%] bottom-[49%] left-[49%] right-[49%] z-20"> +</div> */}
     <div style={{ transform: `rotate(${degree}deg)` }} className="absolute w-[88%] h-[33%] bg-[rgb(232,155,83,0.3)] z-10 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)] top-[34%] right-[6%]"></div>  
    </div>
    </div> 
 }

'use client'
import SaveProfileButton from "./SaveProfileButton"
import { useAstroForm } from "./context/AstroContext"
import { formatDate } from "@/app/_lib/helper"
import { useMemo } from "react";
import Button from "./Button"

export default function NatalTransitInfo() {
 const {formState, chartData} = useAstroForm()

  const birthDate = useMemo(() => {
  return formatDate(formState?.birthDate);
}, [formState?.birthDate]);

const transitDate = useMemo(()=>{return formatDate(formState?.transitDate)}, [formState?.transitDate])

    return<div className=" bg-white/30 backdrop-blur-md p-4 rounded-xl h-fit w-full flex flex-col gap-2">
      <div className="flex flex-row w-full gap-1 sm:justify-between justify-end">
      <Button type='savedCharts'></Button><div className="h-7 w-0.5 bg-[rgb(232,155,83,0.3)] sm:w-0 mx-3"></div> <Button type='openForm'> <svg className="sm:w-7 sm:h-7 w-6 h-6 mt-0.5 mr-1 sm:mt-0 " viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor">
    <polyline points="20,3 7,18 5,25 12,23 25,8 20,3" />
  </g>
</svg></Button>
      </div>
     <div className="h-fit p-4 border-gray-300 border-b  ">
<div className="w-full h-fit  flex flex-row justify-between">
  <h2 className=" font-bold mb-2 text-[#e89b53] font-[Dancing_Script] text-xl sm:text-3xl">Natal Dates for {formState?.user}</h2>
  <SaveProfileButton></SaveProfileButton></div>
  <div className="text-xs sm:text-base space-y-2">
    <div className="flex justify-between">
      <span className="font-medium ">Birth Date</span>
      <span>{birthDate}</span>
    </div>
    <div className="flex justify-between ">
      <span className="font-medium ">Birth Time</span>
      <div className="flex flex-col">
      <span className="text-end">{formState?.birthTimeUnknown ? '-- : --' : `${formState?.birthTime} ${chartData?.natalData?.localTime || ''}` }</span>
       <p className="scale-[80%] text-end"> {formState?.birthTimeUnknown ? "" : chartData?.natalData?.utcTime || ''}</p> 
       </div>
    </div>
    <div className="flex justify-between">
      <span className="font-medium ">Birth Place</span>
  <span>
  {formState?.birthPlaceData?.city}, {formState?.birthPlaceData?.country}
</span>

    </div>
  </div>
</div>
 <div className=" h-fit sm:p-4 p-1">
  <h2 className="text-xl sm:text-3xl font-bold mb-2 text-[#e89b53] font-[Dancing_Script]">Transit Dates for {formState?.moment}</h2>
  <div className="text-xs sm:text-base space-y-2">
    <div className="flex justify-between  ">
      <span className="font-medium ">Transit Date</span>
      <span>{transitDate}</span>
    </div>
    <div className="flex justify-between  ">
      <span className="font-medium ">Transit Time</span><div className="flex flex-col">
      <span className=" text-end">{formState?.transitTimeUnknown ? '-- : --' : `${formState?.transitTime} ${chartData?.transitData?.localTime || '' }` }</span>
      <p className=" scale-[80%] text-end"> {formState?.transitTimeUnknown ? "" : chartData?.transitData?.utcTime || ''}</p> 
       </div>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Transit Place</span>
      <span>
  {formState?.transitPlaceData?.city}, {formState?.transitPlaceData?.country}
</span>
    </div>
  </div>
</div>
 </div>
}
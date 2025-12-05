'use client'
import SaveProfileButton from "./SaveProfileButton"
import { useAstroForm } from "../_lib/context/AstroContext"
import { formatDate } from "@/app/_lib/helper"
import Button from "./Button"
import Loader from "./Loader";
import Edit from "./navicons/Edit";
import { houseSystem } from "../_lib/config";

export default function NatalTransitInfo() {
 const {formState, chartData} = useAstroForm()

 if (!formState) {return ( <Loader size='w-[6rem]'></Loader> );}

return ( 
<div className=" bg-white/30 backdrop-blur-md p-4 rounded-xl h-fit w-full flex flex-col gap-2">
 <div className="flex flex-row w-full gap-1 sm:justify-between justify-end">
  <Button type='savedCharts'/>
  <div className="h-7 w-0.5 bg-[rgb(232,155,83,0.3)] sm:w-0 mx-3"></div> <Button type='openForm'><Edit/></Button>
  </div>

<div className="h-fit p-4 border-gray-300 border-b  ">
<div className="w-full h-fit  flex flex-row justify-between">
  <h2 className=" font-bold mb-4 text-[#e89b53] tracking-wider font-[Dancing_Script] text-xl sm:text-2xl">Natal Dates for {formState?.user || "..."}</h2>
  <SaveProfileButton/>
  </div>
  <div className="text-xs sm:text-sm space-y-3">
    <div className="flex justify-between">
    <span className="font-medium ">Birth Date</span>
    <span>{formatDate(formState?.birthDate) || "..."}</span>
    </div>
    <div className="flex justify-between ">
    <span className="font-medium ">Birth Time</span>
     <div className="flex flex-col">
    <span className="text-end">{formState?.birthTimeUnknown ? '-- : --' : `${formState?.birthTime || "..."} ${chartData?.natalData?.localTime || ''}` }</span>
       <p className="scale-[80%] text-end"> {formState?.birthTimeUnknown ? "" : chartData?.natalData?.utcTime || ''}</p> 
    </div>
    </div>
    <div className="flex justify-between">
     <span className="font-medium ">Birth Place</span>
     <span>{formState?.birthPlaceData?.city.split(',')[0] || "..."}, {formState?.birthPlaceData?.country.split(',')[0] || "..."}
     </span>
    </div>
  </div>
  <div className="text-xs tracking-widest text-end overline mt-3">{houseSystem[formState?.natalHouseSystem]} Chart</div>
</div>

<div className=" h-fit sm:p-4 p-1">
 <h2 className="text-xl sm:text-2xl tracking-wider font-bold mb-4 text-[#e89b53] font-[Dancing_Script]">Transit Dates for {formState?.moment || "..."}</h2>
  <div className="text-xs sm:text-sm space-y-3">
   <div className="flex justify-between  ">
      <span className="font-medium ">Transit Date</span>
      <span>{formatDate(formState?.transitDate) || "..."}</span>
    </div>
    <div className="flex justify-between  ">
      <span className="font-medium ">Transit Time</span>
      <div className="flex flex-col">
      <span className=" text-end">{formState?.transitTimeUnknown ? '-- : --' : `${formState?.transitTime || "..."} ${chartData?.transitData?.localTime || '' }` }</span>
      <p className=" scale-[80%] text-end"> {formState?.transitTimeUnknown ? "" : chartData?.transitData?.utcTime || ''}</p> 
       </div>
    </div>
    <div className="flex justify-between">
     <span className="font-medium">Transit Place</span>
     <span>{formState?.transitPlaceData?.city.split(',')[0] || "..."}, {formState?.transitPlaceData?.country.split(',')[0] || "..."}</span>
    </div>
  </div>
  <div className="text-xs tracking-widest text-end overline mt-3">{houseSystem[formState?.transitHouseSystem]} Chart</div>
</div>
</div>)
}
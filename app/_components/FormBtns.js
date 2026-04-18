import Button from "./Button"
import RoundArrow from "./navicons/RoundArrow"
import ChartCircle from "./navicons/ChartCircle"

export default function FormBtns({onClick, type}){
    return(<div className="flex flex-col py-10 sm:py-0 h-full w-fit justify-between">
    <div className="w-fit flex-col flex justify-between h-fit gap-3"> 
   <Button type='savedCharts'/> 

   <button type="button" className={`${type === 'birth' ? 'btnEffect' : 'hidden' } flex items-center gap-2`} onClick={type === 'birth' ? onClick : null}>Transits Now <RoundArrow /></button>
    
   </div> 
   <button type="submit" className="md:text-sm lg:text-xl btnEffect flex flex-row items-center gap-1"> Show Charts <ChartCircle/></button>
    </div> )
}
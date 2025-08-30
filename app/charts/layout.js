import NatalTransitInfo from "@/app/_components/NatalTransitInfo";
import Navigation from "@/app/_components/Navigation";
import ChartsWrapper from "../_components/ChartsWrapper";
import ToggleAspectListBtn from "../_components/ToggleAspectListBtn";
import InfoTable from "../_components/InfoTable";


export default function ChartsLayout({ children }) {
  return (
  <div className="overflow-x-hidden flex flex-col-reverse sm:flex sm:flex-row relative w-screen px-6 sm:p-10">
      <div className="sm:flex-1 transition-all duration-500 ease-in-out relative pb-40">
  
<ToggleAspectListBtn
            buttonLabel="Info"    
           className='z-20 w-[7rem] absolute top-4 sm:top-2 sm:right-0 right-[-3rem] scale-[80%]' 
            position="sm:top-6 top-8 right-10 sm:right-0"
            dropdownClassName="absolute w-[12rem] sm:p-2 sm:h-[20rem] h-[10em] text-right overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scale-[87%]"
            reverseIconOrder='true'
          > <InfoTable></InfoTable>
          </ToggleAspectListBtn>

        <ChartsWrapper>{children}</ChartsWrapper>
      </div>
      <div className="w-full sm:w-[20%] z-10 flex flex-col">
        <NatalTransitInfo />
        <Navigation />
      </div>
    </div>
  );
}

          

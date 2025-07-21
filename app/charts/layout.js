import NatalTransitInfo from "@/app/_components/NatalTransitInfo";
import Navigation from "@/app/_components/Navigation";
import ChartsWrapper from "../_components/ChartsWrapper";
import ToggleAspectListBtn from "../_components/ToggleAspectListBtn";
import InfoTable from "../_components/InfoTable";


export default function ChartsLayout({ children }) {
  return (
    <div className="flex flex-row relative w-full h-[85rem] p-10 overflow-hidden">
      <div className="flex-1 transition-all duration-500 ease-in-out relative">
  
<ToggleAspectListBtn
            buttonLabel="Info"    
           className='z-20 w-[7rem] absolute top-2 right-[3rem] scale-[90%]' 
            position="top-6"
            dropdownClassName="absolute w-[12rem] p-2 h-[20rem] text-left overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scale-[87%]"
            reverseIconOrder='true'
          > <InfoTable></InfoTable>
          </ToggleAspectListBtn>

        <ChartsWrapper>{children}</ChartsWrapper>
      </div>
      <div className="w-[20%] z-10">
        <NatalTransitInfo />
        <Navigation />
      </div>
    </div>
  );
}

          

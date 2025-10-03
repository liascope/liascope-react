import { items } from "@/app/_lib/data";
import Button from "./Button";
import Sun from "./navicons/Sun";

 export default function Homepage (){
  
  const orderedGroups = [
  ["Natal Chart", "Transit Chart"],
  ["Draconic Chart", "Progressed Chart"],
  ["Perfection Chart", "Aspects & Configurations"],
];
  return  <main className="sm:px-0 px-7">  <h2 className="text-[#e89b53] sm:text-xl text-md text-center sm:py-8 sm:mb-14 sm:-mt-4"> A quick & precise way to get an insight of the most important astrological charts of your scope.
      </h2> <div className="sm:flex hidden items-center justify-center top-0 tracking-wider relative min-h-screen w-full pb-72">  
      <Button type="openForm"><div className="btnEffect flex flex-row items-center">Your<Sun/>Scope</div> </Button>
        {items.map((item, i) => {
          const angle = (360 / items.length) * i;
          return (
            <div
              key={i}
              className="absolute transform sm:w-100 lg:w-120 text-center lg:p-28"
              style={{
                transform:`rotate(${angle}deg) translate(300px) rotate(-${angle}deg)`, // Arrange items in circular orbit with rotation
              }}
            >
              <h3 className="text-[#607f6a]">{item.title}</h3>
              <p className="text-sm leading-relaxed">{item.description}</p>
            </div>
          );
        }
        )}</div>
          {/* small screen: */}
       <div className="flex sm:hidden flex-col items-center mt-6 min-h-screen w-full sm:text-sm text-xs gap-6">
 <div className="grid grid-rows-3 gap-4 w-full">
      {orderedGroups.map((group, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-2 gap-4 sm:text-center"
        >
          {group.map((title) => {
            const item = items.find((i) => i.title === title);
            return (
              <div key={item.title}>
                <h3 className="text-[#607f6a]">{item.title}</h3>
                <p className="text-xs">{item.description}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  <Button type="openForm"><div className="btnEffect flex flex-row items-center">Your<Sun/>Scope</div> </Button>
</div>
</main>
}
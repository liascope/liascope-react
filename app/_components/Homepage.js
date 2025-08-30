import { items } from "@/app/_lib/data";
import Button from "./Button";

 export default function Homepage (){
  return  <main>  <h2 className="text-[#e89b53] sm:text-xl text-md text-center sm:py-8 sm:mb-14 sm:-mt-4"> A quick & precise way to get an insight of the most important astrological charts of your scope.
      </h2> <div className="sm:flex hidden items-center justify-center top-0 tracking-wider relative min-h-screen w-full pb-72">  
    <Button type='openForm'>Your🔆Scope </Button>
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
       <div className="flex sm:hidden flex-col items-center mt-4 min-h-screen w-full text-sm gap-6">
  {/* Grid für die Items */}
  <div className="grid grid-cols-2 gap-4 w-full">
    {items.map((item, i) => (
      <div key={i} className="text-center">
        <h3 className="text-[#607f6a]">{item.title}</h3>
        <p className="text-xs">{item.description}</p>
      </div>
    ))}
  </div>

  {/* Button ganz unten */}
  <Button type="openForm">Your🔆Scope </Button>
</div>
</main>
}
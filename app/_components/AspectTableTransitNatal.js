import { aspectSymbols, symbols } from "@/app/_lib/config";
import ToggleAspectListBtn from "./ToggleAspectListBtn";

export default function AspectTableTransitNatal({aspects, planets, aspectMatrix}) {

  return (
    <div className="flex lg:flex-row flex-col md:w-fit w-full relative">
  <div className="w-full h-fit sm:rounded-none lg:w-[39rem] lg:h-[39rem]">
  <div
    className="grid text-[clamp(0.6rem, 1.5vw, 1rem)] sm:text-[clamp(0.8rem, 1vw, 1.2rem)]"
    style={{
      gridTemplateColumns: `repeat(${planets.length + 1}, minmax(0, 1fr))`,
      gridAutoRows: "1fr" 
    }}
  >
   {/* header */}
    <div></div>
    {planets.map((p) => (
      <div
        key={p}
        className="font-bold text-sm gridContainer text-[#3f638d]"
      >
        {symbols.find((s) => s[1] === p)?.[0]}
        {/* {(selected === 'birth' ? "ᵗ" : 'ᵖ')} */}
      </div>
    ))}

    {aspectMatrix.map((row) => [
      <div
        key={`${row.planet}-header`}
        className="text-[#4fa091] font-bold text-sm gridContainer"
      >
        {symbols.find((s) => s[1] === row.planet)?.[0]}
      </div>,

      ...row.aspects.map((symbol, idx) => (
        <div
          key={`${row.planet}-${idx}`}
          className=" text-center gridContainer"
        >
          {symbol}
        </div>
      ))
    ])}
  </div>
</div>

<ToggleAspectListBtn
  buttonLabel="Aspect List"
  className="min-[1000px]:absolute z-20 top-6 left-10/10 w-2xl"
  dropdownClassName="relative top-9 h-[20rem] w-fit overflow-x-hidden rounded-md scrollbar-thin scrollbar-thumb-gray-400" reverseIconOrder={true}
>
  <table className="no-border-table text-center border-separate border-spacing-0">
    <tbody>
      {aspects.map((aspect, idx) => (
        <tr key={idx}>
          <td className="px-4 py-1 text-[#4fa091]">{aspect.point.name}</td> 
          <td className="px-4 py-1">{aspectSymbols[aspect.aspect.name]}</td>
          <td className="px-4 py-1 text-[#3f638d]">{aspect.toPoint.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</ToggleAspectListBtn>
    </div>);}

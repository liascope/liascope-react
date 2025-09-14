'use client';

import { calculateAspectsBetweenCharts } from "@/app/_lib/data-service";
import { aspectSymbols, symbols } from "@/app/_lib/config";
import ToggleAspectListBtn from "./ToggleAspectListBtn";
export default function AspectTableTransitNatal({ natalData, transitData}) {

  const aspects = calculateAspectsBetweenCharts(natalData, transitData);
  const planets = symbols.map(([, name]) => name);

  const aspectMatrix = planets.map((natalPlanet) => {
    return {
      planet: natalPlanet,
      aspects: planets.map((transitPlanet) => {
        const match = aspects.find(
          (a) => a.point.name === natalPlanet && a.toPoint.name === transitPlanet
        );
        return match ? aspectSymbols[match.aspect.name] : "";
      }),
    };
  });

  return (
    <div className="flex sm:flex-row flex-col sm:w-fit w-full relative">
      {/* 
  Note: Table version kept for semantic correctness & accessibility.
  Grid version is used instead for cleaner responsive design.
       <div className="overflow-hidden sm:rounded-md sm:w-[40rem] sm:h-[40rem]">
        <table className="w-full h-full table-fixed border-collapse text-xs sm:text-md">
          <thead>
            <tr>
              <th></th>
              {planets.map((p) => (
                <th className="font-bold" key={p}>{symbols.find((s) => s[1] === p)?.[0]}ᵗ</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aspectMatrix.map((row) => (
              <tr key={row.planet}>
                <th className="text-[#4fa091] font-bold">{symbols.find((s) => s[1] === row.planet)?.[0]}</th>
                {row.aspects.map((symbol, idx) => (
                  <td className="font-bold" key={idx}>{symbol}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
<div className="w-full h-full sm:rounded-none sm:w-[39rem] sm:h-[39rem]">
  <div
    className="grid text-[clamp(0.6rem, 1.5vw, 1rem)] sm:text-[clamp(0.8rem, 1vw, 1.2rem)]"
    style={{
      gridTemplateColumns: `repeat(${planets.length + 1}, minmax(0, 1fr))`,
      gridAutoRows: "1fr" // all same hight
    }}
  >
   {/* header */}
    <div></div>
    {planets.map((p) => (
      <div
        key={p}
        className="font-bold text-sm gridContainer"
      >
        {symbols.find((s) => s[1] === p)?.[0]}ᵗ
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
  className="sm:absolute z-20 top-6 left-10/10 w-2xl"
  dropdownClassName="relative top-9 h-[20rem] w-fit overflow-x-hidden rounded-md scrollbar-thin scrollbar-thumb-gray-400" reverseIconOrder={true}
>
  <table className="no-border-table text-center border-separate border-spacing-0">
    <tbody>
      {aspects.map((aspect, idx) => (
        <tr key={idx}>
          <td className="px-4 py-1 ">{aspect.point.name}</td> 
          <td className="px-4 py-1">{aspectSymbols[aspect.aspect.name]}</td>
          <td className="px-4 py-1">{aspect.toPoint.name + "ᵗ"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</ToggleAspectListBtn>
    </div>);}

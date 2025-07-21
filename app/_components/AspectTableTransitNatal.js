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
    <div className="flex flex-row w-fit relative">
      <div className="overflow-hidden border rounded-md w-[40rem] scale-[88%] -mt-3 -ml-7">
        <table className="w-full h-full table-fixed border-collapse">
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
      </div>
<ToggleAspectListBtn
  buttonLabel="Aspect List"
  className="absolute z-20 top-6 left-11/12 w-2xl ml-2"
  dropdownClassName="relative top-9 h-[20rem] w-fit overflow-x-hidden rounded-md scrollbar-thin scrollbar-thumb-gray-400" reverseIconOrder={true}
>
  <table className="no-border-table text-center border-separate border-spacing-0">
    <tbody>
      {aspects.map((aspect, idx) => (
        <tr key={idx}>
          <td className="px-4 py-1">{aspect.point.name}</td> 
          <td className="px-4 py-1">{aspectSymbols[aspect.aspect.name]}</td>
          <td className="px-4 py-1">{aspect.toPoint.name + "ᵗ"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</ToggleAspectListBtn>
    </div>);}

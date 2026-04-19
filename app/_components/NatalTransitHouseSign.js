import { generateComparisonTable } from "@/app/_lib/data-service";
import { useAstroForm } from "../_lib/context/AstroContext";
export default function NatalTransitHouseSign ({comparison, selected}) {

  return <div className="rounded-sm py-5 sm:rounded-md sm:w-full h-fit">
  <div
    className="grid text-center text-xs sm:text-sm md:text-base"
    style={{
      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    }}
  >

    {/* Header */}
    <div className="font-bold pb-1 gridContainer">Planet</div>
    <div className="font-bold text-[#4fa091] gridContainer ">Natal</div>
    <div className="font-bold text-[#4fa091] gridContainer ">NH</div>
    <div className="gridContainer font-bold text-[#3f638d]">{selected === 'birth' ? 'TH' : 'PH'}</div>
    <div className="gridContainer font-bold text-[#3f638d] ">{selected === 'birth' ? 'Transit' : 'Partner'}</div>
    <div className="gridContainer font-bold text-[#3f638d] ">{selected === 'birth' ? 'TH' : 'PH'}</div>
    <div className="font-bold text-[#4fa091] border-b border-gray-300">NH</div>

    {/* Rows */}
    {comparison.map((row, idx) => [
      <div key={`${idx}-Planet`} className="font-bold p-1 gridContainer">{row.Planet}</div>,
      <div key={`${idx}-Natal`} className="gridContainer">{row.Natal}</div>,
      <div key={`${idx}-NH`} className="gridContainer">{row.NH}</div>,
      <div key={`${idx}-TH`} className="gridContainer">{row.TH}</div>,
      <div key={`${idx}-Transit`} className="gridContainer ">{row.Transit}</div>,
      <div key={`${idx}-TH2`} className="gridContainer">{row.TH2}</div>,
      <div key={`${idx}-NH2`} className="border-b flex items-center justify-center border-gray-300">{row.NH2}</div>
    ])}
  </div>
</div>
}
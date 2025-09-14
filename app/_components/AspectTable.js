import { symbols } from "@/app/_lib/config";
import { getSymbolFromAspect } from "@/app/_lib/helper";

export default function AspectTable({ aspect }) {
  const planetNames = symbols.map((s) => s[1]);

  return ( <div className="w-screen sm:w-full sm:ml-5 p-1">
  <div
    className="grid text-center text-sm sm:text-base"
    style={{
      gridTemplateColumns: `repeat(${planetNames.length}, minmax(0, 1fr))`,
      gridAutoRows: "1fr"
    }}
  >
    {/* Rows */}
    {planetNames.map((planet, i) => {
      const planetAspects = aspect?.filter((a) => a.includes(planet));

      // empty cells before header
      const emptyCells = Array.from({ length: i }).map((_, k) => (
        <div key={`empty-${i}-${k}`} className=""></div>
      ));

      // header
      const headerCell = (
        <div
          key={`header-${i}`}
          className="text-[#4fa091] text-sm p-1 font-bold gridContainer"
        >
          {symbols.find((s) => s[1] === planet)?.[0] || planet}
        </div>
      );

      // rest
      const dataCells = planetNames.slice(i + 1).map((p, j) => {
        const asp = planetAspects?.find((a) => a.includes(p));
        const symbol = asp ? getSymbolFromAspect(asp) : "";
        return (
          <div
            key={`cell-${i}-${j}`}
            className="p-1  gridContainer"
          >
            {symbol}
          </div>
        );
      });

      // all together
      return [...emptyCells, headerCell, ...dataCells];
    })}
  </div>
</div>

    // Note: Table version kept for semantic correctness & accessibility.  Grid version is used instead for cleaner responsive design.
    //  <table className="table-fixed aspect-table sm:w-full sm:h-[20rem] w-screen h-svw sm:scale-none scale-[90%] border-collapse text-center sm:mt-0 -mt-5">
    //   <tbody>
    //     {planetNames.map((planet, i) => {
    //       const planetAspects = aspect?.filter((a) => a.includes(planet));
    //       return (
    //         <tr key={planet}>
    //           {Array.from({ length: i }).map((_, k) => (
    //             <td key={k} className="empty"></td>
    //           ))}
    //           <th className="text-[#4fa091] font-bold" >{symbols.find((s) => s[1] === planet)?.[0] || planet}</th>
    //           {planetNames.slice(i + 1).map((p, j) => {
    //             const asp = planetAspects?.find((a) => a.includes(p));
    //             const symbol = asp ? getSymbolFromAspect(asp) : "";
    //             return <td className="font-bold" key={j}>{symbol}</td>;
    //           })}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>
  );
}

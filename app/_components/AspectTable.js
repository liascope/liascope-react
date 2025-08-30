import { symbols } from "@/app/_lib/config";
import { getSymbolFromAspect } from "@/app/_lib/helper";

export default function AspectTable({ aspect }) {
  const planetNames = symbols.map((s) => s[1]);

  return (
    <table className="table-fixed aspect-table sm:w-[120%] h-full border-collapse text-center scale-80 -mt-10 -ml-9">
      <tbody>
        {planetNames.map((planet, i) => {
          const planetAspects = aspect?.filter((a) => a.includes(planet));
          return (
            <tr key={planet}>
              {Array.from({ length: i }).map((_, k) => (
                <td key={k} className="empty"></td>
              ))}
              <th className="text-[#4fa091] font-bold" >{symbols.find((s) => s[1] === planet)?.[0] || planet}</th>
              {planetNames.slice(i + 1).map((p, j) => {
                const asp = planetAspects?.find((a) => a.includes(p));
                const symbol = asp ? getSymbolFromAspect(asp) : "";
                return <td className="font-bold" key={j}>{symbol}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

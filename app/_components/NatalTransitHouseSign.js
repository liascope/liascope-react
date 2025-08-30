import { generateComparisonTable } from "@/app/_lib/data-service";
import { useAstroForm } from "./context/AstroContext";
export default function NatalTransitHouseSign ({natalData, transitData}) {
const {unknownTime} = useAstroForm()

const comparison = generateComparisonTable(natalData, transitData, [unknownTime?.birth, unknownTime?.transit]);

  return <div className="overflow-none rounded-sm sm:rounded-md sm:w-full h-fit w-screen sm:scale-none scale-[85%] -ml-7 sm:-ml-5 ">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th>Planet</th>
              <th className="text-[#4fa091]">Natal</th>
              <th className="text-[#4fa091]">NH</th>
              <th>TH</th>
              <th >Transit</th>
              <th >TH</th>
              <th  className="text-[#4fa091]">NH</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, idx) => (
              <tr key={idx}>
                <td className="font-bold">{row.Planet}</td>
                <td>{row.Natal}</td>
                <td>{row.NH}</td>
                <td>{row.TH}</td>
                <td>{row.Transit}</td>
                <td>{row.TH2}</td>
                <td>{row.NH2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
}
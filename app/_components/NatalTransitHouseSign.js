import { generateComparisonTable } from "@/app/_lib/data-service";
import { useAstroForm } from "./context/AstroContext";
export default function NatalTransitHouseSign ({natalData, transitData}) {
const {unknownTime} = useAstroForm()

const comparison = generateComparisonTable(natalData, transitData, [unknownTime?.birth, unknownTime?.transit]);

  return <div className="overflow-auto border rounded-md w-full h-fit">
        <table className="min-w-full text-center border-collapse">
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
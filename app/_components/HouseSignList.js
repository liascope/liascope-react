import { useAstroForm } from "./context/AstroContext";
import { usePathname } from "next/navigation";

export default function HouseSignList({ data }) {
  const { unknownTime } = useAstroForm();
  const pathname = usePathname();
  const path = pathname.replace('/charts/', '');
  const isNatalType = ['natal', 'progression', 'draconic'].includes(path);
  const showHouses = !(
    (isNatalType && unknownTime?.birth) ||
    (path === 'transit' && unknownTime?.transit)
  );

  if (!showHouses) {
    return (
      <ul className="ml-[6rem]">
        {data.planetList
          .filter((p) => !["Mc", "As", "SNode"].includes(p.planet))
          .map((p, i) => (
            <li key={i} className="text-justify space-x-2 flex gap-2">
              <span className="w-[20%] ">{p.planet}</span>
              <span className="grayscale">{p.symbol}</span>
            </li>
          ))}
      </ul>
    );
  }

  return (
    <div className="w-screen sm:w-full flex flex-row justify-evenly -ml-5 sm:p-3 sm:ml-0 ">
      {data.cuspList?.length > 0 && (
        <ul className="sm:pr-7 sm:border-r border-gray-300 ">
          {data.cuspList.map((cusp, i) => (
            <li key={i} className="flex gap-4 sm:gap-6">
              <span className="w-[70%]">{cusp.house}</span>
              <span>{cusp.sign}</span>
            </li>
          ))}
        </ul>
      )}
      <ul>
        {data.planetList
          .filter((p) => !["Mc", "As", "SNode"].includes(p.planet))
          .map((p, i) => (
            <li key={i} className="text-justify sm:space-x-2 flex gap-2">
              <span className="w-[40%] ">{p.planet}</span>
              <span className="w-[40%]  text-end px-1">{`${p.house} H`}</span>
              <span className="grayscale">{p.symbol}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}


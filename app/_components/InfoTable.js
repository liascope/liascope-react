import { aspectSymbols, dignity } from "@/app/_lib/config";
export default function InfoTable() {
  return (<>
    <ul className="py-3"> 
        <li className="text-[#ca400d] text-xm font-bold tracking-wider">Retrograde Planets are Red</li>
         <h3 className="pt-3">Letter Meanings:</h3>
      {dignity.map(([symbol, meaning]) => (
        <li key={symbol}>
          {symbol} {meaning}
        </li>
      ))}
    </ul>  
      <ul> <h3>Symbol Meanings:</h3>
      {Object.entries(aspectSymbols).map(([name, symbol]) => (
        <li key={name}>
          {symbol} – {name}
        </li>
      ))}
    </ul>
    </>
  );
}

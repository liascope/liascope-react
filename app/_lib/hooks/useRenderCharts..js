import { useMemo, useEffect} from "react";
import { calculateAspects, generateTableAspects, generateAllListData, } from "../data-service";
import { aspectToSymbol } from "../helper";
// import * as astrochart from "@astrodraw/astrochart";
import { settings, zodiac } from "../config";
import { useAstroForm } from "@/app/_lib/context/AstroContext";

// Custom Hook for SVG Chart & Aspect Table
export function useRenderCharts(chartID) {
  const context = useAstroForm();

  const data = context[`${chartID}Data`] ?? null;

  // Chart Rendering
 useEffect(() => {if (!data) return;

  let chartInstance;
//dynamic import:
  import('@astrodraw/astrochart').then((astrochart) => {const el = document.getElementById(chartID);
  if (el) el.innerHTML = "";
    const chart = new astrochart.Chart(chartID, 900, 900, settings);zodiac
    chartID === "perfection" ? chart.radix(data) : chart.radix(data).aspects(calculateAspects(data));
    chartInstance = chart;
  });

  return () => {const el = document.getElementById(chartID); if (el) el.innerHTML = ""; chartInstance = null; };
}, [data, chartID]);

  // Aspects Table
  const aspect = useMemo(() => { if (!data) return []; return generateTableAspects(data);}, [data]);

  const aspectList = useMemo(() => aspectToSymbol(aspect), [aspect]);

  // List Data (Planets, Cusps)
  const { planetList, cuspList } = useMemo(() => {
    if (!data) return { planetList: [], cuspList: [] };
    const generated = generateAllListData(data, chartID === "transit" ? "uT" : "");
    return { planetList: generated?.planetList || [], cuspList: generated?.cuspList || [],};
  }, [data, chartID]);

  return { aspect, aspectList, planetList, cuspList, };
}

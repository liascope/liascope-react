import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getChartType } from "../helper";

export default function useTimeunknown(id, unknownTime) {
  const pathname = usePathname();
  useEffect(() => {

    let timeout;
    const chart = getChartType(pathname)
    const shouldHide = (chart === 'natal' || chart === 'progression') ? unknownTime?.birth : chart === 'transit' ? unknownTime?.transit : null
    
// svg manipulation for hiding lines if time unknown
    if (shouldHide){ 
    timeout = setTimeout(() => {
      const container = document.getElementById(id);
      if (!container) return;

      const svg = container.querySelector("svg");
      if (!svg) return;

      const selectorsToHide = [
        `g#${id}-astrology-radix-axis`,
        `g#${id}-astrology-radix-cusps`,
      ]

      selectorsToHide.forEach((selector) => {
        const el = svg.querySelector(selector);
        if (el) el.classList.add("hidden");
      });
    }, 100);}
    
    return () => {
      clearTimeout(timeout);
      const container = document.getElementById(id);
      if (!container) return;

      const svg = container.querySelector("svg");
      if (!svg) return;

      const selectorsToRestore =[
        `g#${id}-astrology-radix-axis`,
        `g#${id}-astrology-radix-cusps`,
      ];

      selectorsToRestore.forEach((selector) => {
        const el = svg.querySelector(selector);
        if (el) el.classList.remove("hidden");
      });
    };
  }, [id, unknownTime, pathname]);
}

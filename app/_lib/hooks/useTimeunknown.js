import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getChartType } from "../helper";

export default function useTimeunknown(id, unknownTime) {
  const pathname = usePathname();

  useEffect(() => {
 const chart = getChartType(pathname);
 const shouldHide = chart === "natal" || chart === "progression" ? unknownTime?.birth : chart === "transit" ? unknownTime?.transit : null;

 const container = document.getElementById(id); if (!container) return;

 const hideSelectors = [`g#${id}-astrology-radix-axis`,`g#${id}-astrology-radix-cusps`,];

 const apply = (hide) => { const svg = container.querySelector("svg"); if (!svg) return;
     hideSelectors.forEach((sel) => svg.querySelector(sel)?.classList.toggle("hidden", hide));};

 const observer = new MutationObserver(() => apply(shouldHide));
    observer.observe(container, { childList: true, subtree: true });

    apply(shouldHide);

    return () => observer.disconnect();}, [id, unknownTime, pathname]);
}

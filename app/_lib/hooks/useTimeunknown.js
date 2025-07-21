import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useTimeunknown(id, unknownTime) {
  const pathname = usePathname();
  useEffect(() => {

    let timeout;
    const natalPath = ["/charts/natal", "/charts/progression", "/charts/draconic", "/charts/natal&transit" ].includes(
        pathname
      )
      const transitPath =["/charts/transit"].includes(
        pathname
      )

 const shouldHide = natalPath ? unknownTime?.birth : transitPath ? unknownTime?.transit : null

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

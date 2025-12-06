import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getChartType } from "../helper";

export default function useRetroPlanets(id, retro) {
  const pathname = usePathname();

 useEffect(() => {
 const chart = getChartType(pathname);
 const showRetro = chart === "natal" ? retro?.natal : chart === "transit" ? retro?.transit : chart === "progression" ? retro?.progression : null;

 if (!showRetro) return;
 const container = document.getElementById(id); if (!container) return;

 const apply = (retroList) => { const svg = container.querySelector("svg"); if (!svg) return;

retroList.forEach((retroPlanet) => {const gEl = svg.querySelector(`g#${id}-astrology-radix-planets-${retroPlanet}`);
  if (!gEl) return;

  // prevent dublicates
  if (svg.querySelector(`text[data-retro="${retroPlanet}"]`)) return;

  const textEl = document.createElementNS("http://www.w3.org/2000/svg","text");
  textEl.textContent = "r";
  textEl.dataset.retro = retroPlanet;

  const bbox = gEl.getBBox();
  textEl.setAttribute("x", bbox.x + bbox.width + 3);
  textEl.setAttribute("y", bbox.y + bbox.height / 2);
  textEl.setAttribute("font-size", "14");
  textEl.setAttribute("font-weight", "bold");

  svg.appendChild(textEl);});};

 apply(showRetro);

 // observer for changes
 const observer = new MutationObserver(() => apply(showRetro));
 observer.observe(container, { childList: true, subtree: true });

 return () => {observer.disconnect();
// cleanup
const svg = container.querySelector("svg");
svg?.querySelectorAll("text[data-retro]").forEach((el) => el.remove());
 };  }, [id, retro, pathname]);

}

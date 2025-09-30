import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useRetroPlanets (id, retro) {
  const pathname = usePathname();

useEffect(() => {
  let timeout;
   const transitRetroPath = ["/charts/transit"].includes(
        pathname
      )
 const natalRetroPath = ["/charts/natal", "/charts/draconic","/charts/natal&transit"].includes(
        pathname
      )
       const progRetroPath = ["/charts/progression"].includes(
        pathname
      )

// svg manipulation for highlighting the retro planets:
const showRetro = natalRetroPath ? retro?.natal : transitRetroPath ? retro?.transit : progRetroPath ? retro?.progression :null
  if (showRetro) {
    timeout = setTimeout(() => {
      const container = document.getElementById(id);
      if (!container) return;
      const svg = container.querySelector('svg');
      if (!svg) return;

     showRetro.forEach((retroPlanet) => {
  const gEl = svg.querySelector(`g#${id}-astrology-radix-planets-${retroPlanet}`);
  if (gEl) {
    // create new 'r' element
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.textContent = "r";
    // position of the r-element
    const bbox = gEl.getBBox();
    textEl.setAttribute("x", bbox.x + bbox.width + 3);
    textEl.setAttribute("y", bbox.y + bbox.height / 2); 
    svg.appendChild(textEl);
  }
});

    }, 100);
  }
  return () => clearTimeout(timeout);
}, [id, retro, pathname]);}



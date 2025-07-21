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

const showRetro = natalRetroPath ? retro?.natal : transitRetroPath ? retro?.transit : progRetroPath ? retro?.progression :null
  if (showRetro) {
    timeout = setTimeout(() => {
      const container = document.getElementById(id);
      if (!container) return;
      const svg = container.querySelector('svg');
      if (!svg) return;

      showRetro.forEach((retroPlanet) => {
        const selector = `g#${id}-astrology-radix-planets-${retroPlanet} path`
        const pathEl = svg.querySelector(selector);
        if (pathEl) {
          pathEl.setAttribute('stroke', 'red');
          pathEl.setAttribute('stroke-width', '2');
        }
      });
    }, 100);
  }

  return () => clearTimeout(timeout);
}, [id, retro, pathname]);}



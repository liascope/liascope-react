'use client'

import { useAstroForm } from "../_lib/context/AstroContext"
import Charts from "./Charts";
import NatalTransit from "./NatalTransit"

export function PartnerOrTransitChart () {
    const { selected } = useAstroForm();

    return ( <>
 <h2 className="chartHeader">
     {selected === 'birth' ? 'Transit' : 'Partner Natal'}
   </h2>
 <Charts chartID='transit'></Charts></>)

};

export function NatalTransitOrSynastry () {
   const { selected } = useAstroForm();
  return(<> <h2 className="chartHeader">
     {selected === 'birth' ? 'Natal & Transit' : 'Synastry'}
   </h2> <NatalTransit chartID ='natalTransit'></NatalTransit></>)
}
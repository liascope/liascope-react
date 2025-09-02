'use client'

import { useRouter } from "next/navigation";
import { useAstroForm } from "./context/AstroContext";
import Link from "next/link";

// buttons "Saved Charts", "Go Back", "Edit"+"Your Scope"=go to form
export default function Button({ type, children }) {
  const router = useRouter();
  const { formState } = useAstroForm();

  if (type === 'btnBack') {
    return (<div className="btnGreen px-3 py-1 w-fit h-fit flex flex-row gap-3 items-center relative top-0" onClick={() => formState ? router.push('/charts/natal') : router.push('/form')}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor">
    <polyline points="21,3 3,12 21,20 15,12 21,3" />
  </g> 
</svg> <span>Go Back</span> </div>);}
   if (type === "savedCharts" || type === "openForm") 
    {const href = type === "savedCharts" ? "/profiles" : "/form"; const className =  "text-[#e89b53] text-base cursor-pointer transition-colors sm:text-xl duration-300 hover:text-[#4fa091]";
    return (<Link href={href} className={className}>{children || (type === "savedCharts" ? <span className="flex flex-row items-center"><span>Saved Charts</span><svg className="sm:w-5 sm:h-7 w-4 h-6 m-1" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="currentColor">
     <polyline points="7,3 7,50 27,30 47,50 47,3 7,3"></polyline>
  </g>
</svg></span> : "Open Form")} </Link> ); }}

 
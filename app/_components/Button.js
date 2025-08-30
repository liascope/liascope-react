'use client'

import { useRouter } from "next/navigation";
import { useAstroForm } from "./context/AstroContext";
import Link from "next/link";

// buttons "Saved Charts", "Go Back", "Edit"+"Your Scope"=go to form
export default function Button({ type, children, btnSize = "sm:text-[1.5rem] text-sm px-4 sm:py-[14px]" }) {
  const router = useRouter();
  const { formState } = useAstroForm();

  if (type === 'btnBack') {
    return (<button className="btnGreen px-3 py-1 w-fit h-fit relative top-0" onClick={() => formState ? router.push('/charts/natal') : router.push('/form')}>
        ⮜ Go Back</button>);}
   if (type === "savedCharts" || type === "openForm") 
    {const href = type === "savedCharts" ? "/profiles" : "/form"; const className = type === "openForm" ? `${btnSize} btnEffect` : "btnEffect";
    return (<Link href={href} className={className}> {children || (type === "savedCharts" ? "Saved Charts ⏎" : "Open Form")} </Link> ); }}

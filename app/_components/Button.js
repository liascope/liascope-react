'use client';

import { useRouter } from "next/navigation";
import { useAstroForm } from "../_lib/context/AstroContext";
import Link from "next/link";
import ArrowLeft from "./navicons/ArrowLeft";
import Saved from "./navicons/Saved";

export default function Button({ type, children }) {
  const router = useRouter();
  const { formState } = useAstroForm();

  if (type === "btnBack") {
    return (
      <button
        type="button"
        className="btnGreen px-3 py-1 w-fit h-fit flex flex-row gap-3 items-center relative top-0"
        onClick={() => router.push(formState ? "/charts/natal" : "/form")}
      >
       <ArrowLeft></ArrowLeft>
        <span>Go Back</span>
      </button>
    );
  }

  if (type === "savedCharts" || type === "openForm") {
    const href = type === "savedCharts" ? "/profiles" : "/form";
    const className =
      "text-[#e89b53] text-base cursor-pointer transition-colors sm:text-xl duration-300 hover:text-[#4fa091]";

    const defaultContent =
      type === "savedCharts" ? (
        <span className="flex flex-row items-center">
          <span>Saved Charts</span> <Saved></Saved>
        </span>
      ) : (
        "Open Form"
      );

    return (
      <Link href={href} className={className}>
        {children || defaultContent}
      </Link>
    );
  }

  return null; 
}

 
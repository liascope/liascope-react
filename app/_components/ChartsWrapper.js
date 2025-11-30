'use client';

import { useAstroForm } from "../_lib/context/AstroContext";
import Loader from "./Loader";
import Button from "./Button";

export default function ChartsWrapper({ children }) {
  const { natalData } = useAstroForm();

  if (!natalData) {
    return <Loader size="w-[9rem]" />;
  }

  if (!children) {
    return (
      <div className="flex justify-center items-center my-40">
        No Chart found. <Button type="btnBack" />
      </div>
    );
  }

  return <>{children}</>;
}


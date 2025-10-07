'use client';

import { useAstroForm } from "../_lib/context/AstroContext";
import Loader from "./Loader";
import Error from "../error";
import Button from "./Button";
import { useState, useEffect } from "react";

export default function ChartsWrapper({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const { natalData, loading, error} = useAstroForm();

   useEffect(() => {
    if (natalData || error) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 50); 
      return () => clearTimeout(timer);
    }
  }, [natalData, error]);

  if (loading || showLoader) return <Loader size='w-[9rem]'></Loader>

  if (error) return <Error></Error>;
  if (!natalData)
    return (
      <div className="relative left-[50%]  mx-auto my-40 ">
        No Chart found. <Button type='btnBack'></Button>
      </div>
    );
  return children;
}
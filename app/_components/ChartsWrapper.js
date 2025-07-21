'use client';

import { useAstroForm } from "./context/AstroContext";
import Loader from "./Loader";
import Error from "../error";
import Button from "./Button";

export default function ChartsWrapper({ children }) {
  const { natalData, loading, error,} = useAstroForm();
  if (loading) return <Loader size='w-[9rem]'></Loader>
  if (error) return <Error></Error>;
  if (!natalData)
    return (
      <div className="relative left-[50%]  mx-auto my-40 ">
        No Chart found. <Button type='btnBack'></Button>
      </div>
    );
  return children;
}
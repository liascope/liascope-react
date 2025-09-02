'use client';

import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getInitialTransitData } from "@/app/_lib/helper";
import { useAstroForm } from "./context/AstroContext";
import { DEFAULT_HOUSE_SYSTEM, DEFAULT_TIME } from "@/app/_lib/config";
import CityAutoComplete from "./CityAutoComplete";
import { fetchSuggestions } from "@/app/_lib/data-service";
import Button from "./Button";

export default function Form() {
  const router = useRouter();
  const { formState, setFormState } = useAstroForm();
  const [todaysTransit, setTodaysTransit] = useState(false);

  const [birthPlaceData, setBirthPlaceData] = useState(null);
  const [transitPlaceData, setTransitPlaceData] = useState(null);
  const initialTransit = useMemo(() => todaysTransit && getInitialTransitData(), [todaysTransit]);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      user: formState?.user || "",
      birthDate: formState?.birthDate || "",
      birthTime: formState?.birthTime || "",
      birthPlaceData: formState?.birthPlaceData || null,
      birthTimeUnknown: formState?.birthTimeUnknown || false,
      natalHouseSystem: formState?.natalHouseSystem || DEFAULT_HOUSE_SYSTEM,

      moment: formState?.moment || "Now",
      transitDate: formState?.transitDate || initialTransit.transitDate,
      transitTime: formState?.transitTime || initialTransit.transitTime,  
  transitPlaceData: formState?.transitPlaceData || null,
      transitTimeUnknown: formState?.transitTimeUnknown || false,
      transitHouseSystem: formState?.transitHouseSystem || DEFAULT_HOUSE_SYSTEM,
    },
  });

// CityAutoComplete-Comp Data
useEffect(() => {
  if (birthPlaceData && transitPlaceData) {
    setValue("birthPlaceData", birthPlaceData);
    setValue("transitPlaceData", transitPlaceData);
  }
}, [birthPlaceData, transitPlaceData, setValue]);

// todaysTransits 
  useEffect(() => { if (!todaysTransit) return;
      setValue("transitDate", initialTransit.transitDate);
      setValue("transitTime", initialTransit.transitTime);
     const todaysPlace = async () => {
    const data = await fetchSuggestions(initialTransit.transitPlace);
   setTransitPlaceData({
        city: data[0].address.city,
        country: data[0].address.country,
        lat: data[0].lat,
        lon: data[0].lon,
      });
  };
  todaysPlace();
    }
  , [todaysTransit, initialTransit, setValue]);

  const onSubmit = (data) => {
    if (data.birthTimeUnknown) {
      data.birthTime = DEFAULT_TIME;
    }
    if (data.transitTimeUnknown) {
      data.transitTime = DEFAULT_TIME;
    }
    if (birthPlaceData) {
      data.birthPlaceData = birthPlaceData;
    }
    if (transitPlaceData) {
      data.transitPlaceData = transitPlaceData;
    }
    setFormState(data);
    router.push("/charts/natal");
  };

  return (<div className="w-full h-fit flex item-center justify-center">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <fieldset>
        <div>
        <legend>Birth Information</legend>

        <label htmlFor="user">Username:</label>
        <input {...register("user")} id="user" type="text" placeholder="Username" />

        <label htmlFor="birthDate">Birth Date:</label>
        <input {...register("birthDate")} id="birthDate" type="date" required />

        <label htmlFor="birthTime">Birth Time:</label>
        <input {...register("birthTime")} id="birthTime" type="time" />

        <label htmlFor="birthTimeUnknown">
          <input type="checkbox" {...register("birthTimeUnknown")} id="birthTimeUnknown" className="mr-2" />
          Time Unknown
        </label>

        <CityAutoComplete
          initialValue={`${formState?.birthPlaceData ? `${formState?.birthPlaceData?.city}, ${formState?.birthPlaceData?.country}` : ""}`}
          onSelect={setBirthPlaceData}
          placeholder="City of Birth:"
          label="Birth Place"

        />
        <label htmlFor="natalHs">House System:</label>
        <select {...register("natalHouseSystem")} id="natalHs" >
          <option value="1">Placidus</option>
          <option value="2">Campanus</option>
          <option value="3">Regiomontanus</option>
          <option value="4">Koch</option>
          <option value="5">Topocentric</option>
          <option value="6">Axial Rotation</option>
          <option value="7">Morinus</option>
        </select>
     </div>
     <div>
        <legend>Transit Information</legend>

        <label htmlFor="moment">Transit Moment:</label>
        <input {...register("moment")} id="moment" type="text" placeholder="Transit moment" />

        <label htmlFor="transitDate">Transit Date:</label>
        <input {...register("transitDate")} id="transitDate" type="date" required />

        <label htmlFor="transitTime">Transit Time:</label>
        <input {...register("transitTime")} id="transitTime" type="time" />

        <label htmlFor="transitTimeUnknown">
          <input type="checkbox" {...register("transitTimeUnknown")} id="transitTimeUnknown" className="mr-2" />
          Time Unknown
        </label>

        <CityAutoComplete
          initialValue={todaysTransit ? `${transitPlaceData?.city || ""}, ${transitPlaceData?.country || ""}` : formState?.transitPlaceData ? `${formState.transitPlaceData.city}, ${formState.transitPlaceData.country}` : ""}
          onSelect={setTransitPlaceData}
          placeholder="City of Transit"
          label ="Transit Place:"

        />
        <label htmlFor="transitHs">House System:</label>
        <select  {...register("transitHouseSystem")} id="transitHs">
          <option value="1">Placidus</option>
          <option value="2">Campanus</option>
          <option value="3">Regiomontanus</option>
          <option value="4">Koch</option>
          <option value="5">Topocentric</option>
          <option value="6">Axial Rotation</option>
          <option value="7">Morinus</option>
        </select></div>
      </fieldset>
      <div className="flex flex-col py-10 sm:py-0 h-full w-fit justify-between">
        <div className="w-fit flex-col flex justify-between h-fit gap-3">
        <Button type='savedCharts'></Button>
         

<div className="btnEffect flex flex-row items-center gap-2" onClick={() => setTodaysTransit(!todaysTransit)}  >
  
  <span>Transits Now</span><svg className="w-4 h-4 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"  fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" >
 <path d="M20 10 A20 20 10 1 1 10 20" /> <polyline points="14,27 12,17 2,21" />
</svg>
</div>
 </div>
        <button type="submit" className="text-sm sm:text-xl btnEffect "><span className="flex flex-row items-center gap-1"><span>
          Show Charts </span> <svg className="sm:w-7 sm:h-7 w-5 h-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"  fill="none" strokeWidth="12">
  <path d="M75 15
           A60 60 0 0 1 135 75"
        stroke="#ce8063" />
  <path d="M135 75
           A60 60 0 0 1 75 135"
        stroke="#c4a484" />
  <path d="M75 135
           A60 60 0 0 1 15 75"
        stroke="#afc8e7" />
  <path d="M15 75
           A60 60 0 0 1 75 15"
        stroke="#4fa091" />
</svg></span>
        </button>
      </div>
    </form></div>
  );
}

'use client';
import FormBtns from "./FormBtns";
import CityAutoComplete from "./CityAutoComplete";
import { DEFAULT_TIME } from "@/app/_lib/config";
import { getInitialTransitData } from "@/app/_lib/helper";
import { fetchTimezone } from "../_lib/data-service";

import { useState} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useAstroForm } from "../_lib/context/AstroContext";
import { useAutofillPlace } from "../_lib/hooks/useAutofillPlace";

export default function Form() { 
  const router = useRouter(); 
  const initial = getInitialTransitData(); 
  const { formState, setFormState } = useAstroForm(); 

  const [birthPlaceLabel, setBirthPlaceLabel] = useState(formState?.birthPlaceData ? `${formState.birthPlaceData.city}, ${formState.birthPlaceData.country}` : "");
  const [transitPlaceLabel, setTransitPlaceLabel] = useState( formState?.transitPlaceData ? `${formState.transitPlaceData.city}, ${formState.transitPlaceData.country}`  : "");


  const {data} = useAutofillPlace("placeTransit", initial.transitPlace);
  const { register, handleSubmit, setValue,} = useForm({ defaultValues: {...formState }, });
    
  function handleTodaysButton() {

  setValue("transitDate", initial.transitDate);
  setValue("transitTime", initial.transitTime);
  setValue("moment", "Now");
  
 if (!data || data.length === 0) return;
  const place = {
    city: data?.[0]?.address?.city || '',
    country: data?.[0]?.address?.country ||  '',
    lat: data?.[0]?.lat,
    lon: data?.[0]?.lon,
  };
// console.log(place)
  setValue("transitPlaceData", place);
  setTimeout(()=>setTransitPlaceLabel(()=>`${place?.city}, ${place?.country}`),100);
 };
 
const timeZone = async function (birthLat, birthLon, transitLat, transitLon){
try { 
  const [birthTz, transitTz] = await Promise.all([
    fetchTimezone(birthLat, birthLon), 
    fetchTimezone(transitLat, transitLon), ]); //  console.log(birthTz, transitTz);
    if (!birthTz || !transitTz)  return; 
    const finalFormData = { ...data, timeZone: { birth: birthTz, transit: transitTz, }, }; 
    setFormState(finalFormData); 
    router.push("/charts/natal"); } 
  catch (err) { console.error("Timezone could not be calculated.", err); return; }
}

 const onSubmit = async (data) => { 
  if (data.birthTimeUnknown) data.birthTime = DEFAULT_TIME;
  if (data.transitTimeUnknown) data.transitTime = DEFAULT_TIME; 
  if (!data.birthPlaceData || !data.transitPlaceData){ console.log('birth- and transitplacedata not found')
     return; }
  await timeZone(+data.birthPlaceData.lat, +data.birthPlaceData.lon, +data.transitPlaceData.lat, +data.transitPlaceData.lon)
}; 

return (
<div className="w-full h-fit flex justify-center">
  <form onSubmit={handleSubmit(onSubmit)}> 
   <fieldset> 
    <legend>Birth and Transit Information</legend>
    <div>
      <h3 className="text-center mb-2">Natal Information</h3>
    <label htmlFor="user">Username:</label>
     <input {...register("user")} id="user" type="text" placeholder="Username" />
     <label htmlFor="birthDate">Birth Date:</label> 
     <input {...register("birthDate")} id="birthDate" type="date" required /> 
     <label htmlFor="birthTime">Birth Time:</label> 
     <input {...register("birthTime")} id="birthTime" type="time" />
     <label htmlFor="birthTimeUnknown">
     <input type="checkbox" {...register("birthTimeUnknown")} id="birthTimeUnknown" className="mr-2" /> Time Unknown </label> 
                                         
    <CityAutoComplete 
    value={birthPlaceLabel} 
    onChange={(v) => setBirthPlaceLabel(v)} 
    onSelect={(obj) => {setValue("birthPlaceData", obj); setBirthPlaceLabel(`${obj.city}, ${obj.country}`);}} 
    label="Birth Place:"/>

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
      <h3 className="text-center mb-2">Transit Information</h3>
    <label htmlFor="moment">Transit Moment:</label> 
    <input {...register("moment")} id="moment" type="text" placeholder="Transit moment" /> 
    <label htmlFor="transitDate">Transit Date:</label> 
    <input type="date" {...register("transitDate")} id='transitDate'/> 
    <label htmlFor="transitTime">Transit Time:</label> 
    <input {...register("transitTime")} id="transitTime" type="time" /> 
    <label htmlFor="transitTimeUnknown"> 
    <input type="checkbox" {...register("transitTimeUnknown")} id="transitTimeUnknown" className="mr-2" /> Time Unknown </label> 

    <CityAutoComplete 
    value={transitPlaceLabel} 
    onChange={(v) => setTransitPlaceLabel(v)} onSelect={(obj) => setValue("transitPlaceData", obj)} 
    label="Transit Place:"/>
                         
    <label htmlFor="transitHs">House System:</label> 
    <select {...register("transitHouseSystem")} id="transitHs"> 
    <option value="1">Placidus</option> 
    <option value="2">Campanus</option> 
    <option value="3">Regiomontanus</option> 
    <option value="4">Koch</option> 
    <option value="5">Topocentric</option> 
    <option value="6">Axial Rotation</option> 
    <option value="7">Morinus</option> 
     </select> 
   </div> 
  </fieldset> 

  <FormBtns onClick={handleTodaysButton}/>
</form>
</div> 
);}
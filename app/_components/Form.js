'use client';
import FormBtns from "./FormBtns";
import CityAutoComplete from "./CityAutoComplete";
import { DEFAULT_TIME } from "@/app/_lib/config";
import { getInitialTransitData, validateDate } from "@/app/_lib/helper";
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
  const { register, handleSubmit, setValue, watch, formState: { errors }} = useForm({ defaultValues: {...formState, type: formState?.type || 'birth'}, });

    const selected = watch("type") 
    const selectedType = selected === 'birth' ? 'Transit' : 'Partner'

  function handleTodaysButton() {
  setValue("transitDate", initial.transitDate);
  setValue("transitTime", initial.transitTime);
  setValue("moment", "Now");
  setValue('type', 'birth')

 if (!data || data.length === 0) return;
  const place = {
    city: data?.[0]?.address?.city || '',
    country: data?.[0]?.address?.country ||  '',
    lat: data?.[0]?.lat,
    lon: data?.[0]?.lon,
  };
  // console.log(place)
  setValue("transitPlaceData", place);
  // prevent race issue on vercel
  setTimeout(()=>setTransitPlaceLabel(()=>`${place?.city}, ${place?.country}`),100);
 };

 function handleType () {
  setValue("transitDate", '');
  setValue("transitTime", '');
  setValue("moment", "");
  setValue('transitPlaceData', '')
  setTransitPlaceLabel('')
  setValue('transitTimeUnknown', false) 
  // console.log(selected)
 }

 const onSubmit = async (data) => { 

  if (
    (!data.birthTime && !data.birthTimeUnknown) ||
    (!data.transitTime && !data.transitTimeUnknown)
  ) {
    return;
  }
  if (data.birthTimeUnknown) data.birthTime = DEFAULT_TIME;
  if (data.transitTimeUnknown) data.transitTime = DEFAULT_TIME; 
  if (!data.birthPlaceData || !data.transitPlaceData){ console.log('birth- and transitplacedata not found')
     return; }

try { 
  const [birthTz, transitTz] = await Promise.all([
    fetchTimezone(+data.birthPlaceData.lat, +data.birthPlaceData.lon), 
    fetchTimezone( +data.transitPlaceData.lat, +data.transitPlaceData.lon), ]); //  console.log(birthTz, transitTz);
    if (!birthTz || !transitTz)  return; 
    const finalFormData = { ...data, timeZone: { birth: birthTz, transit: transitTz, }, }; 
    setFormState(finalFormData); 
     router.push(`/charts/${selected === 'birth' ? 'natal' : 'comparison'}`); }
  catch (err) { console.error("Timezone could not be calculated.", err); return; }

}; 

return (
<div className="w-full h-fit flex justify-center">
  <form onSubmit={handleSubmit(onSubmit)}> 
   <fieldset> 
    
 <legend className="flex flex-col items-start w-full p-1"> 
  <h2 className="text-center">Information</h2>
  <label> <input type="radio" value="birth" {...register("type")} className={`transition-all duration-100 ${selected === 'birth' ? 'mr-8' : 'mr-2'}`} onClick={handleType}/> Birth and Transit </label>
  <label> <input type="radio" value="synastry"  {...register("type")} className={`transition-all duration-100 ${selected === 'synastry' ? 'mr-8' : 'mr-2'}`} onClick={handleType} /> Synastry</label>
</legend>

    <div>
      <h3 className="text-center mb-2">Natal Information</h3>
    <label htmlFor="user">Username:</label>
     <input {...register("user")} id="user" type="text" placeholder="Username" required />
     <label htmlFor="birthDate">Birth Date:</label> 
     <input {...register("birthDate", { validate: validateDate})} id="birthDate" type="date" required /> 
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
      {errors.birthDate && (
  <p className="text-red-500 text-sm">
    {errors.birthDate.message}
  </p>
)}
      </div>
      
     <div> 
      <h3 className="text-center mb-2">{selectedType} Information</h3>
    <label htmlFor="moment">{selectedType === 'Partner' ? selectedType : 'Transit Moment:'}</label> 
    <input {...register("moment")} id="moment" type="text" placeholder={`${selectedType === 'Partner' ? 'Partner name' : 'transit moment'}`} required/> 
    <label htmlFor="transitDate">{selectedType === 'Partner' ? 'Birth Date' : 'Transit Date:'}</label> 
    <input type="date" {...register("transitDate", {validate: validateDate })} id='transitDate' required/> 
    <label htmlFor="transitTime">{selectedType === 'Partner' ? 'Birth Time' : 'Transit Time:'}</label> 
    <input {...register("transitTime")} id="transitTime" type="time" /> 
    <label htmlFor="transitTimeUnknown"> 
    <input type="checkbox" {...register("transitTimeUnknown")} id="transitTimeUnknown" className="mr-2" /> Time Unknown </label> 

    <CityAutoComplete 
    value={transitPlaceLabel} 
    onChange={(v) =>setTransitPlaceLabel(v)} onSelect={(obj) => setValue("transitPlaceData", obj)} 
    label={`${selectedType === 'Partner' ? 'Birth' : selectedType} Place:`}/>
                         
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
      {errors.transitDate && (
  <p className="text-red-500 text-sm">
    {errors.transitDate.message}
  </p>
)}
   </div> 
  </fieldset> 

<FormBtns onClick={handleTodaysButton} type={selected}/>
</form>
</div> 
);}
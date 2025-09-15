import { useState, useEffect } from "react";
import { fetchSuggestions } from "@/app/_lib/data-service";

export default function CityAutoComplete({ initialValue, onSelect, placeholder, label }) {
  const [typedValue, setTypedValue] = useState(initialValue || "");
   const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // initialValue: todaysTransit or previews formState-data
  useEffect(() => {
    if (!isTyping && initialValue) {
      setTypedValue(typedValue);
}}, [initialValue, isTyping, typedValue]);

  // only on typting active fetching suggestions
  useEffect(() => {
 if (!isTyping || !typedValue) {
    setSuggestions([]);
    return;
  }
  const handler = setTimeout(async () => {
    try {
      const data = await fetchSuggestions(typedValue);
      setSuggestions(data || []);
    } catch {
      setSuggestions([]);
    }
  }, 300);
    return () => clearTimeout(handler);
  }, [typedValue, isTyping]);

  const handleSelect = (item) => {
    const cityName =
      item.address.city ||
      item.address.town ||
      item.address.village ||
      item.display_name;

    const fullLabel = `${cityName}, ${item.address.country}`;
    setTypedValue(fullLabel);
    setIsTyping(false);
    setSuggestions([]);
    onSelect({
      city: cityName,
      country: item.address.country,
      lat: item.lat,
      lon: item.lon,
    });
  };

  return (
    <div className="relative">
       <label htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>{label}</label>
      <input
        type="text"
        id={label.toLowerCase().replace(/\s+/g, "-")}
        value={typedValue}
        placeholder={placeholder}
        onChange={(e) => {
          setTypedValue(e.target.value);
          setIsTyping(true);}}
        className="w-full"
        autoComplete="off"
        required/>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#ce8063] rounded-md scrollbar-thin scrollbar-thumb-gray-100 w-full max-h-50 overflow-y-auto m-0 p-0 list-none z-40" >
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="p-[0.5rem] cursor-pointer">
              {item.display_name}
            </li>))}
        </ul>)}
    </div>);}

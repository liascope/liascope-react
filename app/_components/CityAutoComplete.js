'use client'

import { useState, useEffect } from "react";
import { useAutofillPlace } from "../_lib/hooks/useAutofillPlace";

export default function CityAutoComplete({ initialValue, onSelect, placeholder, label }) {
  const [typedValue, setTypedValue] = useState(initialValue || "");
  const [debouncedValue, setDebouncedValue] = useState(typedValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (initialValue) setTypedValue(initialValue);
  }, [initialValue]);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(typedValue), 300);
    return () => clearTimeout(handler);
  }, [typedValue]);

  // fetch suggestions using debounced value
  const { data } = useAutofillPlace("transitPlace", debouncedValue);
  const suggestions = Array.isArray(data) ? data : [];

  const handleSelect = (item) => {
    const cityName =
      item.address.city ||
      item.address.town ||
      item.address.village ||
      item.display_name;

    const fullLabel = `${cityName}, ${item.address.country}`;
    setTypedValue(fullLabel);
    setShowSuggestions(false);
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
          setShowSuggestions(true);
        }}
        className="w-full"
        autoComplete="off"
        required
      />

      {showSuggestions && typedValue && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-[#ce8063] rounded-md scrollbar-thin scrollbar-thumb-gray-100 w-full max-h-50 overflow-y-auto m-0 p-0 list-none z-40">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="p-[0.5rem] cursor-pointer hover:bg-gray-100"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

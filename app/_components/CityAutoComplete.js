"use client";

import { useState, useEffect } from "react";
import { useAutofillPlace } from "../_lib/hooks/useAutofillPlace";
import { DEBOUNCE } from "../_lib/config";

export default function CityAutoComplete({ value, onChange, onSelect, label}) {

  const [inputValue, setInputValue] = useState(value || "");
  const [debounced, setDebounced] = useState(inputValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // UI synced with parent
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDebounced(inputValue), DEBOUNCE);
    return () => clearTimeout(t);
  }, [inputValue]);

  const { data, isLoading } = useAutofillPlace(`place-${label}`,debounced, showSuggestions);

   const suggestions = Array.isArray(data) ? data : [];

  const handleSelect = (item) => {
    const cityName =
      item.address.city ||
      item.address.town ||
      item.address.village ||
      item.display_name;
  
    const fullLabel = `${cityName}, ${item.address.country}`;

    onChange(fullLabel);
    onSelect({
      city: cityName,
      country: item.address.country,
      lat: item.lat,
      lon: item.lon,
    });

    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label htmlFor={`place${label}`}>{label}</label>

      <input
        type="text"
        value={inputValue}
        placeholder={isLoading ? '...' : `City of ${label}`}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
          onChange(e.target.value);
        }}
        autoComplete="off"
        className="w-full"
        id={`place${label}`}
      />

      {showSuggestions && inputValue && suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full z-40">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

'use client'

import { createContext, useContext, useState, useMemo, useEffect,} from 'react';
import { calcProgressionDate, calcCuspsDraconic, perfectionChart, calcChart } from '@/app/_lib/data-service';
import { formatDateTime, calculateAge } from '@/app/_lib/helper';

const AstroContext = createContext();

export function AstroProvider({ children }) {
const [formState, setFormState] = useState(null);
const [chartData, setChartData] = useState(null); // output: positionData: {…}, localTime: 'CEST', utcTime: '28.07.1988 10:11 UTC', retroData: Array()
const unknownTime = { birth: formState?.birthTimeUnknown || false, transit: formState?.transitTimeUnknown || false,};

useEffect(() => {
  const saved = sessionStorage.getItem("astroContextData");
  if (saved) {const parsed = JSON.parse(saved);  if (parsed.formState) setFormState(parsed.formState); if (parsed.chartData) setChartData(parsed.chartData); }
}, []);
useEffect(() => {const dataToSave = {formState, chartData,};
  sessionStorage.setItem("astroContextData", JSON.stringify(dataToSave));}, [formState, chartData]);

  const { natalData, transitData, progressionData } = useMemo(() => {
  if (!formState) return {natalData: null, transitData: null, progressionData: null,};
  return {
    natalData: calcChart(formState?.timeZone.birth, +formState?.birthPlaceData?.lat, +formState.birthPlaceData?.lon, formatDateTime(formState.birthDate, formState.birthTime), +formState.natalHouseSystem, unknownTime.birth),
    transitData: calcChart(formState?.timeZone.transit, +formState.transitPlaceData.lat, +formState.transitPlaceData?.lon, formatDateTime(formState.transitDate, formState.transitTime), +formState.transitHouseSystem, unknownTime.transit),
    progressionData: calcChart(formState?.timeZone.birth, +formState.birthPlaceData?.lat, +formState.birthPlaceData?.lon,`${calcProgressionDate(formState.birthDate)} ${formState.birthTime.replace(':', '.')}`, +formState.natalHouseSystem, unknownTime.birth),
  };
}, [formState]);

  // Set data 
  useEffect(() => {if (natalData && transitData && progressionData); setChartData({ natalData, transitData,progressionData}); }, [natalData, transitData, progressionData]);

  // Derived state: perfection & draconic (based on natalData)
  const derivedData = useMemo(() => {
    if (!formState || !chartData?.natalData) return null; const age = calculateAge(formState.birthDate); 
    const perfectionDate = perfectionChart(age, chartData?.natalData?.positionData)
    return { perfection: perfectionDate?.perfectionData, draconic: calcCuspsDraconic(chartData?.natalData?.positionData), };}, 
    [formState, chartData]);

  return (
    <AstroContext.Provider
      value={{formState, setFormState, unknownTime, chartData,
        natalData : chartData?.natalData?.positionData,
        transitData : chartData?.transitData?.positionData,
        progressionData : chartData?.progressionData?.positionData,
        draconicData: derivedData?.draconic,
        perfectionData: derivedData?.perfection,
        retro: { natal: chartData?.natalData?.retroData || [], transit: chartData?.transitData?.retroData || [],
                     progression: chartData?.progressionData?.retroData || [], },
                    }}> {children}</AstroContext.Provider>); }

// Custom Hook zum Zugriff auf den Context
export function useAstroForm() {
  const context = useContext(AstroContext);
  if (!context) {
    throw new Error('useAstroForm must be used within AstroProvider');
  }
  return context;
}

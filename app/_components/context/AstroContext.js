'use client'

import { createContext, useContext, useState, useMemo, useEffect,} from 'react';
import { calcProgressionDate, calcCuspsDraconic, perfectionChart, calcChart } from '@/app/_lib/data-service';
import { useTimezone } from '@/app/_lib/hooks/useTimezone';
import { formatDateTime, calculateAge } from '@/app/_lib/helper';
import { DEFAULT_TIME } from '@/app/_lib/config';

const AstroContext = createContext();

export function AstroProvider({ children }) {
const [formState, setFormState] = useState(null);
const [unknownTime, setUnknownTime] = useState({ birth: false, transit: false,});
const [chartData, setChartData] = useState(null) // output: positionData: {…}, localTime: 'CEST', utcTime: '28.07.1988 10:11 UTC', retroData: Array()
const [timeZone, setTimezone] =useState({birth:null, transit:null})

useEffect(() => {
  if (!formState) return;
  // console.log(formState)
  setUnknownTime({
    birth: !!formState.birthTimeUnknown,
    transit: !!formState.transitTimeUnknown,
  });
}, [formState]);

// Memoized formatted dates for API-request
  const formattedDate = useMemo(() => {
    if (!formState) return null;
    const birthTime = unknownTime.birth ? DEFAULT_TIME : formState.birthTime;
    const transitTime = unknownTime.transit ? DEFAULT_TIME : formState.transitTime;
    return {
      natal: formatDateTime(formState.birthDate, birthTime),
      transit: formatDateTime(formState.transitDate, transitTime),
      progression: `${calcProgressionDate(formState.birthDate)} ${birthTime.replace(':', '.')}`,
    };
  }, [formState, unknownTime]);

const natalAndProgressionTzQuery = useTimezone(
  "natalProgression",
  +formState?.birthPlaceData?.lat,
  +formState?.birthPlaceData?.lon
);
const transitTzQuery = useTimezone(
  "transit",
  +formState?.transitPlaceData?.lat,
  +formState?.transitPlaceData?.lon
);

useEffect(() => {
  if (
    natalAndProgressionTzQuery.isSuccess &&
    transitTzQuery.isSuccess
  ) {
    setTimezone({
      birth: natalAndProgressionTzQuery.data,
      transit: transitTzQuery.data,
    });
  }
}, [
  natalAndProgressionTzQuery.isSuccess,
  natalAndProgressionTzQuery.data,
  transitTzQuery.isSuccess,
  transitTzQuery.data,
]);

const { natalData, transitData, progressionData } = useMemo(() => {
  if (!formState || !formattedDate || !timeZone?.birth) return {natalData: null, transitData: null, progressionData: null,};

  return {
    natalData: calcChart(timeZone.birth, +formState.birthPlaceData.lat, +formState.birthPlaceData.lon, formattedDate.natal, +formState.natalHouseSystem, unknownTime?.birth),
    transitData: calcChart(timeZone.transit, +formState.transitPlaceData.lat, +formState.transitPlaceData.lon, formattedDate.transit, +formState.transitHouseSystem, unknownTime?.transit),
    progressionData: calcChart(timeZone.birth, +formState.birthPlaceData.lat, +formState.birthPlaceData.lon, formattedDate.progression, +formState.natalHouseSystem, unknownTime?.birth),
  };
}, [timeZone, formattedDate, formState, unknownTime]);

  // Set data 
  useEffect(() => {if (natalData && transitData && progressionData) setChartData({ natalData, transitData,progressionData}); }, [natalData, transitData, progressionData]);

  // Derived state: perfection & draconic (based on natalData)
  const derivedData = useMemo(() => {
    if (!formState || !chartData?.natalData) return null;
    const age = calculateAge(formState.birthDate); 
    const perfectionDate = perfectionChart(age, chartData?.natalData?.positionData)
    return {
      perfection: perfectionDate?.perfectionData,
      draconic: calcCuspsDraconic(chartData?.natalData?.positionData),
    };}, [formState, chartData]);

  return (
    <AstroContext.Provider
      value={{
        formState,
        unknownTime,
        setFormState,
        chartData,
        natalData : chartData?.natalData?.positionData,
        transitData : chartData?.transitData?.positionData,
        progressionData : chartData?.progressionData?.positionData,
        draconicData: derivedData?.draconic,
        perfectionData: derivedData?.perfection,
            retro: {
      natal: chartData?.natalData?.retroData || [],
      transit: chartData?.transitData?.retroData || [],
      progression: chartData?.progressionData?.retroData || [],
    },
       loading: natalAndProgressionTzQuery.isLoading || transitTzQuery.isLoading,
       error: natalAndProgressionTzQuery.error || transitTzQuery.error 
      }}
    >
      {children}
    </AstroContext.Provider>
  );
}

// Custom Hook zum Zugriff auf den Context
export function useAstroForm() {
  const context = useContext(AstroContext);
  if (!context) {
    throw new Error('useAstroForm must be used within AstroProvider');
  }
  return context;
}

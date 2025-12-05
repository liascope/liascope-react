import { aspectSymbols, zodiac, chartMap } from "./config";

export const getChartType = (pathname) => Object.entries(chartMap).find(([type, paths]) => 
  paths.includes(pathname))?.[0] || null;


export const getSymbolFromAspect = (aspect) => {
  return (
    Object.entries(aspectSymbols).find(([key]) => aspect.includes(key))?.[1] || ""
  );
};

export const fetchData = async (url, errorMessage) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong, ${response.status}: ${errorMessage}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("API Fetch Error: ", error.message);
    throw error;
  }
};

export const findSign = (degree) => {
  const normalizedDegree = ((+degree % 360) + 360) % 360; // degree should be between 0-359
  const index = Math.floor(normalizedDegree / 30);
  return Object.keys(zodiac)[index];
};

export function formatDateTime(date, time) {
  return `${date.split('-').reverse().join('.')} ${time.replace(':', '.')}`;
}

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
};

export function aspectToSymbol(arrAspect = []) {
  return arrAspect.map((aspect) => {
    const aspectName = aspect.split(" ")[1];
    return aspectSymbols[aspectName] ? aspect.replace(aspectName, aspectSymbols[aspectName]) : aspect;
  });
}

export function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate); // wants ISO format: "YYYY-MM-DD"

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // if birth day is not reached 
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}

export function getInitialTransitData() {
  const now = new Date();
  const formatNumber = (num) => String(num).padStart(2, "0");
  
  const year = now.getFullYear();
  const month = formatNumber(now.getMonth() + 1);
  const day = formatNumber(now.getDate());
  const transitDate = `${year}-${month}-${day}`; // <-- ISO format
  const transitTime = `${formatNumber(now.getHours())}:${formatNumber(now.getMinutes())}`;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const transitPlace = timeZone.split("/").pop().replace("_", " ");
  // timeZone.includes("/") && timeZone.split("/").pop()
  return {
    transitDate,
    transitTime,
    transitPlace,
  };
}

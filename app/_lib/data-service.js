import moment from "moment-timezone";
import { calPlanetPosition2 } from "./calcDegrees";
import { calHouseCusp2 } from "./calcDegrees";
import { checkRetrograde } from "./calcDegrees";
import { TIMEZONE_API_BASE_URL, ASPECTS, zodiac} from "./config";
import { findSign, fetchData } from "./helper";
// import { NOMINATIM_URL } from "./config";

// CityAutoComplete in Form for lat, lon, city, country 
// Previously fetched directly against Nominatim, which works in production
// but leads to CORS and client-side rate-limit issues during local development.
// Therefore suggestions are now fetched via a Next.js API route that proxies the request server-side.
// export const fetchSuggestions = async (query) => {
//   if (!query) return [];
//   try {
//     const url = `${NOMINATIM_URL}${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;
//     const data = await fetchData(url, "City, Country, Coords data not found");
//     return data;
//   } catch {
//     throw new Error("Failed to fetch suggestions");
//   }
// }; 
export const fetchSuggestions = async (query) => {
  if (!query) return [];
  try {
    const data = await fetchData(`/api/nominatim?q=${query}`, "City, Country, Coords data not found");
    return data;
  } catch {
    return []
    // throw new Error("Failed to fetch suggestions");
  }
};

// for chart-data calc
export const fetchTimezone = async (lat, lon) => {
  const url = `${TIMEZONE_API_BASE_URL}key=${process.env.NEXT_PUBLIC_TIME_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;
  const data =  await fetchData(url, "Timezone data not found");
  return data.zoneName
};

// Libary: degree calc (JST) for SVG-Chart Drawing on custom hook 'useRenderChart'
//  Getting planet and cusps degrees from API-Call return & calc other chart datas, data for table and lists
export const calcChart = function (timezoneData, lat, lon, dateString, houseSystem, uT) {
  try {
  const asiaTimeZone = (zT) => zT.clone().tz("Asia/Tokyo");
    let planetPosition = new Array();
    let cuspLongitudes = new Array();
    const zoneTime = moment.tz(dateString, "DD.MM.YYYY HH:mm", timezoneData);

    // Japanese standart time (JST)
    const jstTime = asiaTimeZone(zoneTime);
    const localTime = zoneTime.format("YYYY-MM-DD HH:mm z").trim().split(" ").pop(); // next to time
    const utcTime = zoneTime.utc().format("DD.MM.YYYY HH:mm [UTC]"); // small under time
    const year = jstTime.year();
    const month = jstTime.month() + 1;
    const day = jstTime.date();
    const hour = jstTime.hour();
    const minute = jstTime.minute();
    // data for Chart
    planetPosition = calPlanetPosition2(+year, +month, +day, +hour, +minute, +lon, +lat);
    cuspLongitudes = calHouseCusp2(
      +year,
      +month,
      +day,
      +hour,
      +minute,
      +lon,
      +lat,
      houseSystem // Placidus 1, for Koch 2..
    ).filter((value) => value !== null && value !== undefined && value !== "")

    // date for retrograde
const [datePart, timePart] = dateString.split(" ");
const [d, m, y] = datePart.split(".").map(Number);
const [h, min] = timePart.split(".").map(Number);

 const retroPlanets = checkRetrograde(+y, +m, +d, +h, +min)
const retroData = [
  'Mercury', 'Venus', 'Mars', 'Jupiter',
  'Saturn', 'Uranus', 'Neptune', 'Pluto'
].filter((_, i) => retroPlanets[i + 3] === -1);

// console.log(retroData)
 const planets = {
  Sun: [Math.round(planetPosition[1])],
  Moon: [Math.round(planetPosition[2])],
  Mercury: [Math.round(planetPosition[3])],
  Venus: [Math.round(planetPosition[4])],
  Mars: [Math.round(planetPosition[5])],
  Jupiter: [Math.round(planetPosition[6])],
  Saturn: [Math.round(planetPosition[7])],
  Uranus: [Math.round(planetPosition[8])],
  Neptune: [Math.round(planetPosition[9])],
  Pluto: [Math.round(planetPosition[10])],
  NNode: [Math.round(planetPosition[11])],
  SNode: [Math.round(planetPosition[11] - 180)],
  Lilith: [Math.round(planetPosition[12])],
};
if (!uT) {
  planets.As = [Math.round(planetPosition[13])];
  planets.Mc = [Math.round(planetPosition[14])];
}
const positionData = {
  planets,
  cusps: cuspLongitudes,
};
    return { positionData, localTime, utcTime, retroData };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export function calcProgressionDate(birthDate) {
      const birthDateObj = new Date(birthDate);
      const now = new Date();
      // calc days based on birthday
      const age = now.getFullYear() - birthDateObj.getFullYear();
      // const hasBirthdayPassed =
      //   now.getMonth() > birthDateObj.getMonth() || (now.getMonth() === birthDateObj.getMonth() && now.getDate() >= birthDateObj.getDate());
      // if (!hasBirthdayPassed) age--;
      // Progression: Date and Age
      const progressionDate = new Date(birthDateObj);
      progressionDate.setDate(progressionDate.getDate() + age); 
      // const formattedProgressionDate = progressionDate.toLocaleDateString("de-DE");
      const formattedProgressionDate = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(progressionDate);
      return formattedProgressionDate
}

export const calcCuspsDraconic = (data) => {
  const planets = { ...data.planets };
  const cusps = [...data.cusps];
  const nNode = planets.NNode[0];
  // Calc difference between NNode and 0 degree
  const nodeToZero = (360 - nNode) % 360;
  // Update planet position by adding the difference to degrees
  Object.keys(planets).forEach((planet) => {
    if (planet !== "NNode") {
      planets[planet] = planets[planet].map((degree) => (degree + nodeToZero) % 360);
    }
  });
  // Update cusps
  const updatedCusps = cusps.map((cusp) => (cusp + nodeToZero) % 360);
  // set NNode to 0 degree
  planets.NNode = [0];
  return {
    planets,
    cusps: updatedCusps,
  };
};

export const perfectionChart = function (age, natalData) {
  const perfectionDegrees = [165, 135, 105, 75, 45, 15, 345, 315, 285, 255, 225, 195];
  const perfectionData = {
    planets: {},
    cusps: natalData.cusps.map((_, i) => Math.floor(natalData.cusps[0] / 30) * 30 + i * 30),
  };
  const index = +age % 12;
  const perfectionHouse = index + 1;
  const perfectionIndex = perfectionDegrees[index] 
  return {perfectionIndex, perfectionHouse, perfectionData};
};

export const calculateAspects = (positionData) => {
  const excludedPairs = new Set(["MC-IC", "MC-As", "MC-Ds", "IC-As", "IC-Ds", "As-Ds", "NNode-SNode"]);
  const planetEntries = Object.entries(positionData.planets);
  return planetEntries.flatMap(([planet1, pos1], i) =>
    planetEntries
      .slice(i + 1)
      .filter(([planet2]) => !excludedPairs.has(`${planet1}-${planet2}`) && !excludedPairs.has(`${planet2}-${planet1}`))
      .flatMap(([planet2, pos2]) => {
        let angle = Math.abs(pos1[0] - pos2[0]);
        angle = angle > 180 ? 360 - angle : angle;
        return ASPECTS.filter(({ angle: aspAngle, orb }) => Math.abs(angle - aspAngle) <= orb).map(({ name, angle: aspAngle }) => ({
          aspect: { name, degree: angle.toFixed(2) },
          point: { name: planet1, position: pos1[0] },
          toPoint: { name: planet2, position: pos2[0] },
          precision: Math.abs(angle - aspAngle) <= 1 ? 0.5 : 0.0,
        }));
      })
  );
};

// aspect in table
 export const generateTableAspects = function (positionData) {
  const excludedPairs = new Set(["MC-IC", "MC-As", "MC-Ds", "IC-As", "IC-Ds", "As-Ds", "NNode-SNode"]);
  const planetEntries = Object.entries(positionData?.planets);
  return planetEntries.flatMap(([planet1, pos1], i) =>
    planetEntries
      .slice(i + 1)
      .filter(([planet2]) => !excludedPairs.has(`${planet1}-${planet2}`) && !excludedPairs.has(`${planet2}-${planet1}`))
      .flatMap(([planet2, pos2]) => {
        let angle = Math.abs(pos1[0] - pos2[0]);
        angle = angle > 180 ? 360 - angle : angle;
        return ASPECTS.filter(({ angle: aspAngle, orb }) => Math.abs(angle - aspAngle) <= orb).map(({ name, angle: aspAngle }) => ({
          aspect: { name, degree: angle.toFixed(2) },
          point: { name: planet1, position: pos1[0] },
          toPoint: { name: planet2, position: pos2[0] },
          precision: Math.abs(angle - aspAngle) <= 1 ? 0.5 : 0.0,
        }))?.map((a) => `${a.point.name} ${a.aspect.name} ${a.toPoint.name}`);
      })
  );
};

// cusps & planet lists

// a helper-fn 
 const findPlanetHouses = function (cusps, planets) {
  const houseAssignments = {};
  for (const [planet, positions] of Object.entries(planets)) {
    houseAssignments[planet] = positions.map((position) => {
      // Other planets: calculation based on cusps
      for (let i = 0; i < cusps.length; i++) {
        let nextIndex = (i + 1) % cusps.length;
        let cuspStart = cusps[i];
        let cuspEnd = cusps[nextIndex];
        // Calc houses based on cusps
        if (cuspStart < cuspEnd) {
          if (position >= cuspStart && position < cuspEnd) {
            return i + 1; // return house no
          }
        } else {
          // cusp from 359° to 0°
          if (position >= cuspStart || position < cuspEnd) {
            return i + 1;
          }
        }
      }
      return null; 
    });
  }
  return houseAssignments;
};

export function generateAllListData(data) {
  if (!data || !data.planets || !data.cusps) return null;

  const houseAssignments = findPlanetHouses(data.cusps, data.planets);
  const planetList = Object.keys(data.planets).map((planet) => {
    const houseNumber = houseAssignments?.[planet]?.[0];
    const symbol = zodiac[findSign(data.planets[planet])] || findSign(data.planets[planet]);
    return { planet, symbol, house: houseNumber };
  });
  const cuspList = data.cusps.map((c, i) => {
    const label = i === 0 ? "House 1 (AC)" : i === 3 ? "House 4 (IC)" : i === 6 ? "House 7 (DC)" : i === 9 ? "House 10 (MC)" : `House ${i + 1}`;
    return { house: label, sign: findSign(c) };
  });
  return {
    planetList,
    cuspList
  };
}

export const generateComparisonTable = function (natalData, transitData, unknownTime) {
  const { planets: planetsNatal, cusps: cuspsNatal } = natalData;
  const { planets: planetsTransit, cusps: cuspsTransit } = transitData;
  const getHouse = (cusps, planetDegrees) => findPlanetHouses(cusps, { temp: [planetDegrees] }).temp[0] || "";
  const getSign = (degree) => findSign(degree) || "";
  return Object.entries(planetsNatal)
    .filter(([planet]) => planetsTransit[planet] !== undefined) // filter undefined values
    .map(([planet, degrees]) => ({
      Planet: planet,
      Natal: getSign(degrees[0]),
      NH: unknownTime[0] ? "" : `${planet === "Mc" ? 10 : planet === "As" ? 1 : getHouse(cuspsNatal, degrees[0])}`,
      TH: unknownTime[1] ? "" : getHouse(cuspsTransit, degrees[0]),
      Transit: getSign(planetsTransit[planet][0]),
      TH2: unknownTime[1] ? "" : `${planet === "Mc" ? 10 : planet === "As" ? 1 : getHouse(cuspsTransit, planetsTransit[planet][0])}`,
      NH2: unknownTime[0] ? "" : getHouse(cuspsNatal, planetsTransit[planet][0]),
    }));
};

export const calculateAspectsBetweenCharts = (natalData, transitData) => {
  const natalPlanets = Object.entries(natalData.planets);
  const transitPlanets = Object.entries(transitData.planets);

  return natalPlanets.flatMap(([planet1, pos1]) =>
    transitPlanets.flatMap(([planet2, pos2]) => {
      let angle = Math.abs(pos1[0] - pos2[0]);
      angle = angle > 180 ? 360 - angle : angle;

      return ASPECTS.filter(({ angle: aspAngle, orb }) => Math.abs(angle - aspAngle) <= orb).map(({ name, angle: aspAngle }) => ({
        aspect: { name, degree: angle.toFixed(2) },
        point: { name: planet1, position: pos1[0] },
        toPoint: { name: planet2, position: pos2[0] },
        precision: Math.abs(angle - aspAngle) <= 1 ? 0.5 : 0.0,
      }));
    })
  );
};

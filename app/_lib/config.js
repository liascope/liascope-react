export const TIMEZONE_API_BASE_URL= "https://api.timezonedb.com/v2.1/get-time-zone?";
export const NOMINATIM_URL= "https://nominatim.openstreetmap.org/search?q="
// format=json&q=";
export const DEFAULT_HOUSE_SYSTEM= "1"; // 1: Placidus
export const DEFAULT_TIME = "12:00";

export const settings = {CIRCLE_STRONG: 1,
  COLOR_BACKGROUND: "#ffffff10",
  COLLISION_RADIUS: 15,
          POINTS_TEXT_SIZE: 10,
          MARGIN: 100,
          COLORS_SIGNS: Array(3).fill(["#ce8063", "#c4a484", "#afc8e7", "#4fa091"]).flat(),
          DIGNITIES_RULERSHIP: "rs",
          DIGNITIES_DETRIMENT: "d",
          DIGNITIES_EXALTATION: "e",
          DIGNITIES_EXACT_EXALTATION: "E",
          DIGNITIES_FALL: "f",
POINTS_COLOR : "#000000",       
SIGNS_COLOR : "#000000",        
CIRCLE_COLOR : "#333333",       
LINE_COLOR : "#333333",         
SYMBOL_AXIS_FONT_COLOR : "#333333", 
CUSPS_FONT_COLOR : "#000000",
        };

export const ASPECTS = [
  { name: "conjunction", angle: 0, orb: 7 },
  { name: "opposition", angle: 180, orb: 7 },
  { name: "trine", angle: 120, orb: 5 },
  { name: "square", angle: 90, orb: 7 },
  { name: "sextile", angle: 60, orb: 5 },
  { name: "quincunx", angle: 150, orb: 1 },
  { name: "semiSextile", angle: 30, orb: 1 },
];

export  const symbols = [["☉", "Sun"],["☽", "Moon"],["☿", "Mercury"], ["♀", "Venus"],["♂", "Mars"], ["♃", "Jupiter"], ["♄", "Saturn"], ["♅", "Uranus"],["♆", "Neptun"],["♇", "Pluto"],["☊", "NNode"],["☋", "SNode"],["⚸", "Lilith"],["As", "As"], ["MC", "Mc"],];

export const zodiac = { Aries: "♈",Taurus: "♉",Gemini: "♊",Cancer: "♋",Leo: "♌",Virgo: "♍",Libra: "♎",Scorpio: "♏",Sagittarius: "♐",Capricorn: "♑",Aquarius: "♒",Pisces: "♓",
};

export const aspectSymbols = {conjunction: "☌", opposition: "☍", square: "□", trine: "△", sextile: "⚹", quincunx: "⚻", semiSextile: "⚺", };

 export const dignity = [["rs:", "rulership ☉"],
    ["d:", "detriment ↓☉"],
    ["e:", "exaltation ☉↑"],
    ["E:", "exact exaltation ☉↑°"],
    ["f:", "fall ↓"],
  ];

export const perfectionDegrees = [165, 135, 105, 75, 45, 15, 345, 315, 285, 255, 225, 195];
    





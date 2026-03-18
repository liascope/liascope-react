'use client'
import { capitalize } from "../_lib/config"
import { useState } from "react"
import { zodiac } from "../_lib/config"

export default function CopyChart ({chart, signs, planets, aspects, retro, time}) {
const [copied, setCopied] = useState(false)

const timeUnknown = (["natal", "draconic", "progression"].includes(chart) && time.birth) || (chart === "transit" && time.transit);
const copyChart = [`${capitalize(chart)}-Chart:`, "",
  ...(timeUnknown ? ["Unknown time, house placements unavailable.", ""] : ["Signs:", ...signs.map(c => `${c.house}: ${c.sign}`), ""]),
 "Planets:", ...planets.map(p => `${p.planet} ${retro[chart]?.includes(p.planet) ? "Retrograde" : ""} ${Object.keys(zodiac).find(s => zodiac[s] === p.symbol)} ${!timeUnknown ? `in House ${p.house}` : ''}`),"",
  "Aspects:", ...aspects,"",].join("\n");

return (<div className='relative z-10 w-full text-right pr-7 text-xs'>
        <span className={`absolute right-10 -top-9 bg-stone-500 text-white p-1 rounded transition-all duration-300 ${copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>Chart copied!</span>
        <span title='Copy for AI use' onClick={() => {setCopied(true); navigator.clipboard.writeText(copyChart);setTimeout(()=>setCopied(false), 3000)}} className='border-2 text-stone-500 cursor-pointer p-1 rounded hover:border-dotted hover:border-stone-400'>Copy Chart</span>
        </div>)
}
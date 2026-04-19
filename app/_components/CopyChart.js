'use client'
import { useState } from "react"

export default function CopyChart ({copy}) {
const [copied, setCopied] = useState(false)

return (<div className='relative z-10 w-full text-right pr-7 text-xs'>
        <span className={`absolute right-10 -top-9 bg-stone-500 text-white p-1 rounded transition-all duration-300 ${copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>Chart copied!</span>
        <span title='Copy for AI use' onClick={() => {setCopied(true); navigator.clipboard.writeText(copy);setTimeout(()=>setCopied(false), 3000)}} className='border-2 text-stone-500 cursor-pointer p-1 rounded hover:border-dotted hover:border-stone-400'>Copy Chart</span>
        </div>)
}
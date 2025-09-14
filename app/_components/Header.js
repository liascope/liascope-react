'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from 'react';
import Modal from "./Modal";
export default function Header(){
 const [open, setOpen] = useState(false);

return  <header className="bg-white/10 pb-3">
  <div className="w-full sm:h-[15rem] h-[7rem]" >
 <Link href="/"><div className="relative w-full h-full">
        <Image
          src="/logo.png"
          alt="Logo"
           fill
          style={{ objectFit: "contain" }}
           priority  className="brightness-100 saturate-50"
        />
       </div>
  </Link> </div>
  <div className="flex flex-row items-center w-full justify-center font-[Dancing_Script] sm:text-6xl text-4xl text-center font-light tracking-widest text-[rgba(230,193,85,0.8)]">
  <h2 >your sun your scope</h2><svg onClick={() => setOpen(true)}
        className="cursor-pointer w-5 h-5 sm:w-8 sm:h-8" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#e6c155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="20" cy="20" r="11" />
    <line x1="20" y1="15" x2="20" y2="15" />
    <line x1="20" y1="19" x2="20" y2="25" />
  </g>
</svg></div><Modal isOpen={open} onClose={() => setOpen(false)}>
      </Modal>
   </header>
}



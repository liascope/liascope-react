'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from 'react';
import Modal from "./Modal";
import Info from "./navicons/Info";
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
           priority  className="brightness-100 saturate-50"  />
       </div>
  </Link> </div>
  <div className="flex flex-row items-center w-full justify-center font-[Dancing_Script] sm:text-6xl text-4xl text-center font-light tracking-widest text-[rgba(230,193,85,0.8)]">
  <h2 >your sun your scope</h2>
 <Info onClick={() => setOpen(true)} />
</div><Modal isOpen={open} onClose={() => setOpen(false)}>
      </Modal>
   </header>
}



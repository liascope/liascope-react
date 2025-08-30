import Link from "next/link"
import InfoButtonModal from "./InfoBtnModal"
export default function Header(){


return  <header className="sm:text-8xl text-6xl w-full text-center font-medium text-[#e6c155] font-[Dancing_Script] pb-5 pt-5">
 <Link href="/">
   <h1 className="sm:pt-7 pt-4 cursor-pointer">Liascope</h1></Link> <InfoButtonModal></InfoButtonModal>
  <h2 className="sm:text-6xl text-4xl text-center font-light sm:-mt-4 tracking-widest text-[rgba(230,193,85,0.8)]">your sun your scope</h2>
   </header>
}
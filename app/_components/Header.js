import Link from "next/link"
import InfoButtonModal from "./InfoBtnModal"
export default function Header(){


return  <header className="text-8xl w-full text-center font-medium text-[#e6c155] font-[Dancing_Script] pb-5 pt-5">
 <Link href="/">
   <h1 className="pt-7 cursor-pointer">Liascope</h1></Link> <InfoButtonModal></InfoButtonModal>
  <h2 className="text-6xl text-center font-light -mt-4 tracking-widest text-[rgba(230,193,85,0.8)]">your sun your scope</h2>
   </header>
}
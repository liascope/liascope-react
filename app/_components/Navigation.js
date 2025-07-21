'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAstroForm } from "./context/AstroContext"

export default function Navigation() {
  const pathname = usePathname()
const {unknownTime}=useAstroForm()

  const links = [
    { href: "/charts/natal", label: "Natal" },
    { href: "/charts/natal&transit", label: "Natal & Transit" },
    { href: "/charts/transit", label: "Transit" },
    { href: "/charts/progression", label: "Progression" },
    { href: "/charts/draconic", label: "Draconic" },
 ...(unknownTime?.birth ? [] : [{ href: "/charts/perfection", label: "ann. Perfection" }]),
  ]

  return (
    <ul className="h-fit w-full">
      {links.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <li key={href} className="list-none ml-[4rem] mb-1">
        <Link
          href={href}
          aria-current={isActive ? "page" : undefined}
          className={`block text-white/80 text-2xl px-10 py-4 w-full rounded-lg cursor-pointer
            transition-all duration-300 tracking-widest
            hover:-translate-x-14 hover:bg-[#607f6a]
            ${isActive ? '-translate-x-14 !bg-[#e89b53]' : 'bg-[#e6c155cc]'}`}
        >
          {label}
        </Link>
      </li>
        )
      })}
    </ul>
  )
}

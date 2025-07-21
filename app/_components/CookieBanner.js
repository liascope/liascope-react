'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter, usePathname } from 'next/navigation'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const router = useRouter()
const pathname = usePathname();
  useEffect(() => {
    const consent = getCookie('user_consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleConsent = () => {
    setCookie('user_consent', 'accepted', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
    setShowBanner(false)
    if (pathname === '/policy'){
    router.back()  }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 w-fit right-2 bg-white/80 backdrop-blur-md border rounded-2xl px-6 py-4 shadow-lg z-30 text-sm text-[#607f6a] text-center">
      <p className="mb-3">
        Liascope uses cookies to improve your experience. By clicking <strong>Got it!</strong> you agree to our{' '}
        <a href="/policy" className="underline">
          Privacy Policy
        </a>.
      </p>


      <button
        onClick={handleConsent}
        className="px-4 py-2 btnGreen bg-[rgb(220,193,85,0.8)]"
      >
        Got it!
      </button>

      
    </div>
  )
}

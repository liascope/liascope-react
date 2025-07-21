import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req) {
  const cookieStore = cookies()

  // Set cookie for 1 year
  cookieStore.set({
    name: 'user_consent',
    value: 'true',
    httpOnly: false, // ❗️Allow client-side access
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })

  return NextResponse.json({ success: true })
}


// access cookies in a server component or layout
// 
// import { cookies } from 'next/headers'
// 
// export default function Page() {
//   const cookieStore = cookies()
//   const consent = cookieStore.get('user_consent')
// 
//   return <div>Consent: {consent?.value || 'Not set'}</div>
// }
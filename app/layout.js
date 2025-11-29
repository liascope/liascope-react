import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import './_styles/globals.css';
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Provider from "./_components/Provider";
import CookieBanner from "./_components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const dancing = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})


export const metadata = {
  title: { template:"%s | Liascope Astrology",
    default: 'Liascope Astrology',
  description: "Your Sun Your Scope", },
  icons: {
      icon: "/favicon.png",    
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
};
  

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header></Header>
    <Provider>{children}</Provider>
    <CookieBanner></CookieBanner>
     <Footer></Footer>
      </body>
    </html>
  );
}

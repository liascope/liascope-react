export default function Sun (){
    return(<svg className="w-5 h-5 sm:w-10 sm:h-10 mx-1" xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 100 100" 
     stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round">
  <circle cx="50" cy="50" r="20" fill="currentColor"/>
  
  <line x1="50" y1="5"  x2="50" y2="20"/>
  <line x1="50" y1="80" x2="50" y2="95"/>
  <line x1="5"  y1="50" x2="20" y2="50"/>
  <line x1="80" y1="50" x2="95" y2="50"/>
  
  <line x1="20" y1="20" x2="30" y2="30"/>
  <line x1="80" y1="80" x2="70" y2="70"/>
  <line x1="20" y1="80" x2="30" y2="70"/>
  <line x1="80" y1="20" x2="70" y2="30"/>
</svg>)
}
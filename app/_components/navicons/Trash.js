export default function Trash ({onClick}){
    return( <svg className='sm:h-7 sm:w-7 w-6 h-6 text-gray hover:text-red-700' title='delete'
            onClick={onClick} viewBox="0 0 50 55" xmlns="http://www.w3.org/2000/svg">
  <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
     <polyline points="2,9 18,9 22,2 30,2 34,9 50,9 9,9"></polyline>
   <polyline points="3,15 50,15 45,15"></polyline>
   <polyline points="8,15 14,50 39,50 45,15"></polyline>
       <line x1="22" y1="42" x2="22" y2="25"/>
       <line x1="31" y1="42" x2="31" y2="25"/>
  </g>
</svg> )}
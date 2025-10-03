export default function Saved ({stroke="currentColor", fill="currentColor", onClick}){
    return (<svg
            className="sm:w-5 sm:h-7 w-4 h-6 m-1"
            onClick={onClick}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke={stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={fill}
            >
              <polyline points="7,3 7,50 27,30 47,50 47,3 7,3" />
            </g>
          </svg>)
}

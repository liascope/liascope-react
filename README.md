 Liascope‑React 🌟

A modern astrology chart viewer built with React.js and Next.js—showing a significant evolution from my earlier vanilla‑JS MVC-based Liascope project. This application demonstrates a solid understanding of frontend development, state management, data fetching, animations, form handling, and interactive UI design.

🚀 Key Features

Multi-chart generation
  Generate and view **five distinct charts:

  * Natal
  * Draconic
  * Progression
  * Annual Perfection
  * Natal + Transit

Save & Load
  Store up to **5 charts locally** via `localStorage`.

Aspect and filter tools

  * Interactive aspect table
  * Planet & house position lists
  * Flexible filtering of chart aspects

Transit tools

  * Auto-complete of “today’s transits”
  * Select dates easily for transit charts

  Reactivity & animations
  Smooth transitions powered by Framer Motion, and responsive UI behaviors.

---

🧩 Tech Stack & Libraries

* Next.js + React.js – full stack React framework
* Context API – state management across the app
* React Query – efficient API calls with caching via reusable custom hooks
* react-hook-form – smooth, performant form handling and validation
* @astrodraw/astrochart – astrology chart renderer available at astrodraw.github.io - License: MIT License
* js\_astro – astrology algorithms library used for retrograde, cusps, and planetary positions (excluding Chiron) available on GitHub at astsakai/js_astro - License: MIT License
* moment + moment-timezone – date and time handling via timezonedb.com - License: TimeZoneDB Terms of Service
* lodash – helpful utility functions
* framer-motion – UI animations and transitions
* nominatim – location/timezone lookup (Nominatim, OpenStreetMap) via nominatim.openstreetmap.org - License: Data Policy
* cookies‑next – cookie management
* Tailwind CSS + PostCSS + Autoprefixer – utility-first styling setup
* ESLint + Prettier – code quality and formatting
* React Query Devtools– query debugging in development

 🧠 What I’ve Learned & Demonstrated

* Cleanly refactored from vanilla‑JS MVC to a robust React/Next.js architecture
* Implemented global state via Context alongside **local caching**
* Built multiple custom React Query hooks, managing loading and error states effectively
* Mastered form state management with React Hook Form
* Utilized animations and transitions for better user experience
* Integrated complex third-party APIs (timezone, nominatim)
* Rendered astrology charts with precise planetary and cusp calculations
* Styled a responsive, filterable UI with Tailwind CSS
APIs and third-party libraries

🔧 Running the Project

1. Clone the repo
2. Install dependencies

   ```bash
   npm install
   ```
3. Add any required API keys (if needed for timezone/nomiatim)
4. Run locally

   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser

---

🛠️ Project Structure

```
/hooks            – React Query and form-handling hooks  
/components       – Chart, list, filter, and UI components  
/context          – Context API provider for global state  
/lib              – Astrology logic and helpers (wrapping js_astro lib)  
/pages            – Next.js pages & API routes  
/styles           – Tailwind setup & global styles  
```

---

Thanks for checking out Liascope‑React. The app offers a seamless astrology charting experience and highlights proficiency in modern React frontend development—state, data management, UI, animation, and external API integration. Enjoy exploring!

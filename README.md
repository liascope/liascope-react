 Liascope Astrology ‑React 🌟

A modern astrology chart viewer built with React.js and Next.js—showing a significant evolution from my earlier vanilla‑JS MVC-based Liascope project. This application demonstrates a solid understanding of frontend development, state management, data fetching, animations, form handling, and interactive UI design.

🚀 Key Features

Multi-chart generation
  Generate and view six distinct charts:

  * Natal
  * Transit
  * Natal + Transit
  * Draconic
  * Progression
  * Annual Perfection

Save & Load
  Store up to 5 charts locally via `localStorage`.

Aspect and filter tools

  * Interactive aspect table
  * Planet & house position lists
  * Flexible filtering of chart aspects

Transit tools

  * Auto-complete of “today’s transits”
  * Select dates easily for transit charts

  Reactivity & animations
  Smooth transitions powered by Framer Motion, and responsive UI behaviors.

🧩 Tech Stack

* Next.js + React.js – fullstack React framework
* Context API – global state management
* React Query – efficient data fetching with reusable custom hooks
* React Hook Form – performant form handling and validation
* Framer Motion – UI animations and transitions
* Tailwind CSS – utility-first styling
* Astrology libraries – @astrodraw/astrochart, js_astro (extended for custom logic)
* APIs – Timezone (timezonedb), Location (Nominatim)
* Utilities – Moment.js, Lodash, Cookies-next
* Tooling – ESLint, Prettier, React Query Devtools

 🧠 What I’ve Learned & Demonstrated

* Cleanly refactored from vanilla‑JS MVC to a robust React/Next.js architecture
* Implemented global state via Context alongside local caching
* Built multiple custom React Query hooks, managing loading and error states effectively
* Mastered form state management with React Hook Form
* Utilized animations and transitions for better user experience
* Integrated complex third-party APIs (timezone, nominatim)
* Rendered astrology charts with precise planetary and cusp calculations
* Styled a responsive, filterable UI with Tailwind CSS
* Worked with APIs and third-party libraries:
   - Integrated an SVG horoscope rendering library and extended it with DOM manipulation to highlight retrograde planets in red.
   - Adapted a planetary calculation library written in a foreign codebase, first understanding its internal logic and then tailoring it to fit seamlessly into my application.


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

📜 Licenses & Credits 
* @astrodraw/astrochart – MIT License
* js_astro – MIT License
* Moment.js + Moment Timezone – MIT License, TimeZoneDB Terms of Service
* Nominatim – Data Policy
* Other libraries – Open source under MIT or compatible licenses

Thanks for exploring Liascope-React.
Beyond standard frontend practices, this project highlights my ability to extend and adapt third-party libraries, integrate complex APIs, and build an interactive, user-focused application with React and Next.js.

©2025 Zeliha A. (liascope). All rights reserved. Open for personal use; redistribution or modification requires explicit permission.

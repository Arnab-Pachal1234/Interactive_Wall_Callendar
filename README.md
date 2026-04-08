# 🗓️ LumiCal — Premium Interactive Wall Calendar

> A highly interactive, beautifully animated wall calendar component built with Next.js, Framer Motion, and Tailwind CSS. 

![LumiCal Preview](https://via.placeholder.com/1000x500?text=Insert+a+screenshot+of+LumiCal+here)

LumiCal transcends the standard date-picker. It is designed to emulate the tactile and aesthetic experience of a physical wall calendar, complete with dynamic seasonal themes, smooth page-turning animations, and a powerful range-based event tracking system.

## ✨ Features

* **🎨 Dynamic Monthly Themes:** Seamlessly transitions between 12 unique, high-quality Unsplash backgrounds and corresponding accent colors for each month.
* **✨ Premium 3D UI & Glassmorphism:** Features ambient background glows, multi-layered box shadows, and edge-lighting to create a physical, tactile feel.
* **📅 Date Range Selection:** Intuitive click-to-select functionality for start and end dates. Selected ranges are visually bridged on the calendar grid.
* **📝 Persistent Range-Based Notes:** Users can attach color-coded memos to specific date ranges. Notes are automatically persisted to the browser's `localStorage`.
* **🖱️ Interactive Tooltips:** Hovering over any day reveals a sleek, glassmorphic tooltip detailing all events and notes scheduled for that specific date.
* **🎬 Fluid Animations:** Powered by Framer Motion. Features direction-aware sliding for the calendar grid and elegant crossfades for the hero images.
* **📱 Fully Responsive:** Built mobile-first. The split-panel desktop layout gracefully collapses into a vertical stack for smaller viewports.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Data Persistence:** Client-side `localStorage` API

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have Node.js (v18 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arnab-Pachal1234/Interactive_Wall_Callendar
   npm install
   npm run dev
2. Navigate to http://localhost:3000 in your browser.
### 🏗️ Architecture & Component Structure
To maintain clean code and separation of concerns, the application follows a strict Container/Presenter pattern:

1. Calendar.jsx: The "smart" parent container managing state, date mathematics, and local storage synchronization.

2. CalendarHero.jsx: Renders the dynamic month image, background glow, and crossfade animations.

3. CalendarHeader.jsx: Manages the typographical header and month-to-month navigation.

4.CalendarGrid.jsx: The core mathematical grid. Handles rendering the days, calculating range overlaps, bridging styles, and displaying hover tooltips.

5.CalendarNotes.jsx: A dual-mode component that switches between viewing saved events and creating new ones.

### Technical Decisions & Scope
1. Zero Date Libraries: To demonstrate core JavaScript fundamentals, all calendar logic (leap years, first days of the month, date comparisons) is handled using native Date objects rather than relying on heavy libraries like moment.js or date-fns.

2. Client-Side Only: This project is designed as a strict frontend assessment piece. Therefore, no backend database was implemented. State persistence is entirely handled via localStorage.

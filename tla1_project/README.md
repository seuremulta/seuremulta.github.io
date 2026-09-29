# Enterprise Income Category Tracker (React Refactor)

A modular React application refactored from a Vanilla JavaScript DOM ledger into a component-driven architecture using **React**, **Vite**, and **Bootstrap 5**.

---

## Highlights of Added Functional & UI Enhancements

Beyond the baseline Vanilla JS refactor, the following advanced features and design improvements were added to elevate the application:

1. **Data Persistence via `localStorage`**
   - Implemented automatic local state persistence in `App.jsx`. Income categories survive browser refreshes and tab closures.
2. **Category Numerical Amount & Dynamic Total Balance**
   - Expanded the registration schema to include numerical income amounts with automated currency formatting and a live-updating total balance badge.
3. **Real-time Search & Filtering**
   - Integrated dynamic list filtering in `IncomeList.jsx` to search through category names and descriptions simultaneously.
4. **Item Management (Delete Action)**
   - Added item deletion support so users can remove categories dynamically with instant DOM re-rendering.
5. **Data Export to CSV**
   - Built a dynamic CSV generator in `App.jsx` allowing users to download their ledger history as a `.csv` file.

---

## AI Implementation & Code Defense

### 1. Features Built with AI Assistance
- **DOM Refactoring to React Hooks:** Converted imperative DOM operations (`document.getElementById`, `insertAdjacentHTML`) into declarative state management using `useState`.
- **Component Modularization:** Structured the layout into distinct single-responsibility components (`IncomeForm.jsx` and `IncomeList.jsx`) under `src/components/`.
- **Focus Management:** Implemented `useRef` to programmatically refocus the category name input field upon form submission.
- **Persistent State Syncing:** Integrated `useEffect` to synchronize component state with `localStorage`.

### 2. Technical Architecture & Defense

#### Declarative State vs. Imperative DOM
In the original Midterm code, DOM elements were targeted using `document.getElementById` and manually appended via `.insertAdjacentHTML()`. In this React refactor:
- Data is owned by the central state variable `categories` inside `App.jsx`.
- Updating state via `setCategories` triggers automatic, optimized DOM updates via React's Virtual DOM reconciliation.

#### Data Flow (Props & Lifting State Up)
- `App.jsx` serves as the single source of truth.
- `App.jsx` passes its state handler function (`handleAddCategory`) down to `IncomeForm` as a prop (`onAddCategory`).
- `IncomeForm` gathers local inputs (`catName`, `catDesc`, `catAmount`), validates inputs, attaches a unique `crypto.randomUUID()`, and lifts the data back to `App.jsx`.
- `App.jsx` updates its state array and passes the updated collection down to `IncomeList` via the `categories` prop.

#### Controlled Inputs & Refs
- All form inputs bind directly to component state (`catName`, `catDesc`, `catAmount`), ensuring controlled components.
- `useRef` directly references the `txtCatName` DOM node to execute refocusing without triggering unnecessary re-renders.

---

## Tech Stack
- **Framework:** React 18+ (via Vite)
- **Styling:** Bootstrap 5 (CDN) + Custom CSS (`index.css`)
- **Deployment:** Vercel
# Aether88 WebOS - Minimalist Web Operating System
Aether 88 WebOS is a retro inspired desktop styled web application built to simulate an interactive operating system environment with draggable productivity widgets, persistent storage and quick application shorcuts.

---

## Features

* **Draggable Productivity Widgets**: Moveable Window Widgets for customized workspace organization with built in position memory.
* **Focus Chronometer**: Pomodoro timer with customizable focus and break intervals to support pomodoro study techniques.
* **Daily Target System**: Interacting task tracking for writing and completing daily tasks and goals
* **Persistent Local Storage**: Built in session memory utilizing the browser's `localStorage` API to ensure user data including widget and window positions remains saved across browser sessions.
* **Minimalist UI/UX**: Lightweight aesthetic styling powered by Tailwind CSS v4 with custom variable themes 

---

## Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/)
* **Build Tooling**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Linter**: [Oxlint](https://oxc.rs/)
* **Deployment**: [GitHub Pages](https://pages.github.com/) (`gh-pages`)

---

## Live Demo & Testing Instructions

You can access the deployed application here: **[Aether88 WebOS Live Application](https://aalyaan2009.github.io/aether88-webos/)**

### How to Test:
1. **Rearrange Desktop Layout**: Click and drag any widget by its top header bar to position it anywhere on the desktop
2. **Test Persistence**: Refresh or close your browser tab to confirm that widget positions, active tasks and notes remain the same as you left it
3. **Focus Chronometer**: Start the Pomodoro timer to monitor the countdown.
4. **Manage Daily Targets & Notes**: Type notes in the scratchpad, add tasks to the daily checklist and mark items complete or remove them.    

---

## Local Development Setup

To run this project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/aalyaan2009/aether88-webos.git](https://github.com/aalyaan2009/aether88-webos.git)
   cd aether88-webos
2. **Install dependencies:**
   ```bash
   npm install
3. **Start the development server:**
   ```bash
   npm run dev
4. **Build for production:**
   ```bash
   npm run build

### Artificial Intelligence Disclosure

* **AI Assistance**: Gemini was utilized during development as collaborative debugging assistants.
* **AI Scope**: AI was used for troubleshooting Vite build configurations, resolving relative path deployment routing on GitHub Pages.
---
### Credits & Acknowledgments
* **Hosting**: Hosted via **GitHub Pages**.
 
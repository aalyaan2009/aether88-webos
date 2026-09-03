import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Terminal, X } from "lucide-react";

import Browser from "./apps/Browser";
import Calculator from "./apps/Calculator";
import Clock from "./apps/Clock";
import Files from "./apps/Files";
import GenericApp from "./apps/GenericApp";
import Music from "./apps/Music";
import Notes from "./apps/Notes";
import Settings from "./apps/Settings";
import TerminalApp from "./apps/Terminal";

import Dock from "./components/Dock";
import Desktop from "./components/Desktop";
import Window from "./components/Window";
import { apps } from "./data/apps";

const appMap = {
  browser: Browser,
  calculator: Calculator,
  clock: Clock,
  files: Files,
  music: Music,
  notes: Notes,
  settings: Settings,
  terminal: TerminalApp
};

export default function App() {
  const [dark, setDark] = useLocalStorage("aether_dark", false);
  const [openApps, setOpenApps] = useLocalStorage("aether_openApps", ["terminal"]);
  const [activeApp, setActiveApp] = useLocalStorage("aether_activeApp", "terminal");
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);

    const savedAccent = localStorage.getItem("aether_accent") || "#c85a32";
    root.style.setProperty("--paper", dark ? "#171717" : "#f3efe6");
    root.style.setProperty("--paper-deep", dark ? "#222222" : "#ffffff");
    root.style.setProperty("--ink", dark ? "#f3efe6" : "#171717");
    root.style.setProperty("--border-color", dark ? "#333333" : "#d0ccc4");
    root.style.setProperty("--accent", savedAccent);
  }, [dark]);

  const appLookup = useMemo(
    () => Object.fromEntries(apps.map((app) => [app.id, app])),
    []
  );

  const focusApp = (id) => {
    setActiveApp(id);
    setOpenApps((current) => {
      if (!current.includes(id)) return current;
      return [...current.filter((appId) => appId !== id), id];
    });
  };

  const openApp = (id) => {
    const appId = String(id || "").trim();
    if (!appId || !appLookup[appId]) return;

    if (openApps.includes(appId)) {
      focusApp(appId);
    } else {
      setOpenApps((current) => [...current, appId]);
      setActiveApp(appId);
    }
  };

  const closeApp = (id) => {
    setOpenApps((current) => {
      const updated = current.filter((appId) => appId !== id);
      if (activeApp === id) {
        setActiveApp(updated.length > 0 ? updated[updated.length - 1] : null);
      }
      return updated;
    });
  };

  const terminalCommands = [
    { cmd: "help", desc: "List all executable OS commands" },
    { cmd: "open <app_id>", desc: "Launch app directly (e.g., 'open browser')" },
    { cmd: "clear", desc: "Wipe terminal output history" },
    { cmd: "theme <light|dark>", desc: "Switch system theme" },
    { cmd: "calc <math_expr>", desc: "Evaluate numeric math string" },
    { cmd: "sysinfo", desc: "Display current RAM, OS, & window metrics" },
    { cmd: "storage", desc: "Inspect localStorage byte size" },
    { cmd: "reset", desc: "Clear localStorage and reboot OS" }
  ];

  return (
    <div
      className="relative min-h-screen h-screen w-screen overflow-hidden select-none"
      style={{ backgroundColor: "var(--paper)", color: "var(--ink)" }}
    >
      <Desktop>
        
        <header
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b px-4 py-2 backdrop-blur-md"
          style={{
            backgroundColor: "color-mix(in srgb, var(--paper) 85%, transparent)",
            borderColor: "var(--border-color)",
            color: "var(--ink)"
          }}
        >
          <div className="font-system text-[9px] uppercase tracking-[0.35em] font-bold">
            AETHER OS
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="font-system text-[9px] uppercase tracking-[0.2em] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          >
            {dark ? "● Dark Mode" : "○ Light Mode"}
          </button>
        </header>

        
        <div className="relative pt-10 h-full w-full">
          {openApps.map((id) => {
            const app = appLookup[id] || {
              id,
              name: id.replace(/-/g, " "),
              category: "System"
            };
            const Component = appMap[id] || GenericApp;

            return (
              <Window
                key={id}
                title={app.name}
                icon={app.icon || GenericApp}
                onClose={() => closeApp(id)}
                onFocus={() => focusApp(id)}
                active={activeApp === id}
              >
                <Component
                  app={app}
                  openApp={openApp}
                  dark={dark}
                  setDark={setDark}
                />
              </Window>
            );
          })}
        </div>
      </Desktop>

      
      {guideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="w-full max-w-md border rounded-2xl p-5 shadow-2xl space-y-4 font-system select-text"
            style={{
              backgroundColor: "var(--paper-deep)",
              borderColor: "var(--border-color)",
              color: "var(--ink)"
            }}
          >
            <div
              className="flex items-center justify-between border-b pb-3"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <Terminal size={15} /> Terminal & OS Operations
              </div>
              <button
                onClick={() => setGuideOpen(false)}
                className="p-1 hover:opacity-70"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs opacity-75 leading-relaxed">
              <strong>How AETHER OS Works:</strong> System preferences, open
              window positions, scratchpad notes, and daily tasks auto-sync to
              your browser’s local storage.
            </p>

            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                Terminal Command Reference
              </div>
              <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 text-xs">
                {terminalCommands.map((item) => (
                  <div
                    key={item.cmd}
                    className="p-2 border rounded-lg bg-[var(--paper)] font-mono"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="text-[var(--accent)] font-bold">
                      {item.cmd}
                    </div>
                    <div className="text-[10px] opacity-70 font-sans mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setGuideOpen(false)}
              className="w-full py-2 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              Close Manual
            </button>
          </div>
        </div>
      )}

      
      <Dock
        openApp={openApp}
        focusApp={focusApp}
        openApps={openApps}
        openCommands={() => setGuideOpen(true)}
      />
    </div>
  );
}
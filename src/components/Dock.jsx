import { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { apps } from "../data/apps";

export default function Dock({
  openApp,
  openApps = [],
  focusApp,
  openCommands
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dockApps = ["browser", "terminal", "notes", "calculator", "settings"];

  const handleAppClick = (id) => {
    if (openApps.includes(id)) {
      focusApp?.(id);
    } else {
      openApp?.(id);
    }
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 flex items-center gap-1.5 border px-2.5 py-1.5 backdrop-blur-xl max-w-[calc(100vw-24px)] overflow-x-auto no-scrollbar shadow-lg"
      style={{
        backgroundColor: "var(--paper-deep)",
        borderColor: "var(--border-color)",
        color: "var(--ink)",
        transform: "translateX(-50%)"
      }}
    >
      <div className="flex items-center gap-1 shrink-0">
        {dockApps.map((id) => {
          const app = apps.find((item) => item.id === id);
          if (!app) return null;
          const Icon = app.icon;
          const isOpen = openApps.includes(id);

          return (
            <button
              key={id}
              onClick={() => handleAppClick(id)}
              className={`relative group p-2 border transition-colors shrink-0 ${
                isOpen
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "hover:bg-[var(--accent)] hover:text-white"
              }`}
              style={{
                borderColor: isOpen ? "var(--accent)" : "var(--border-color)",
                color: isOpen ? "#ffffff" : "var(--ink)"
              }}
              title={app.name}
            >
              <Icon size={18} />
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-[9px] font-system opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border"
                style={{
                  backgroundColor: "var(--paper-deep)",
                  color: "var(--ink)",
                  borderColor: "var(--border-color)"
                }}
              >
                {app.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="w-px h-6 opacity-40 mx-1 shrink-0" style={{ backgroundColor: "var(--border-color)" }} />

      <div className="px-2 font-system text-[10px] tracking-tight shrink-0 select-none font-bold" style={{ color: "var(--ink)" }}>
        {time.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
      </div>

      
      <button
        onClick={openCommands}
        className="p-2 border hover:bg-[var(--accent)] hover:text-white transition-colors shrink-0"
        style={{ borderColor: "var(--border-color)", color: "var(--ink)" }}
        title="View Commands Manual"
      >
        <HelpCircle size={17} />
      </button>
    </div>
  );
}

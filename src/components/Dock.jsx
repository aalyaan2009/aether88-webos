import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import { apps } from "../data/apps";

export const dockAppIds = ["browser", "terminal", "notes", "calculator", "settings"];

export default function Dock({
  openApp,
  openApps = [],
  focusApp,
  openCommands,
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function handleClick(id) {
    if (openApps.includes(id)) {
      focusApp(id);
    } else {
      openApp(id);
    }
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-2.5 py-1.5 backdrop-blur-xl max-w-[calc(100vw-32px)] overflow-x-auto no-scrollbar rounded-[var(--radius-lg)] transition-all duration-150"
      style={{
        backgroundColor: "var(--bg-window)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.35)",
        color: "var(--text-primary)",
      }}
    >
      <div className="flex items-center gap-1 shrink-0">
        {dockAppIds.map((id) => {
          const app = apps.find((item) => item.id === id);

          if (!app) {
            return null;
          }

          const isOpen = openApps.includes(id);

          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className="relative group w-9 h-9 flex items-center justify-center rounded-[var(--radius-sm)] transition-colors shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
              style={{
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              title={app.name}
            >
              <app.icon size={18} className="shrink-0" />

              {isOpen && (
                <span
                  className="absolute bottom-1 w-1 h-1 rounded-full transition-transform"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              )}

              <span
                className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 rounded-[var(--radius-xs)] shadow-md"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {app.name}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="w-px h-4 mx-1 shrink-0"
        style={{ backgroundColor: "var(--border-subtle)" }}
      />

      <div
        className="px-2 text-xs font-mono font-medium tracking-tight shrink-0 select-none opacity-80"
        style={{ color: "var(--text-primary)" }}
      >
        {time.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <button
        onClick={openCommands}
        className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] transition-colors shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
        style={{ color: "var(--text-secondary)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)";
          e.currentTarget.style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
        title="Commands Manual"
      >
        <HelpCircle size={16} />
      </button>
    </div>
  );
}
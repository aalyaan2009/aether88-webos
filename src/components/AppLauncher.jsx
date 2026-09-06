import { X, Search } from "lucide-react";
import { useState } from "react";
import { apps } from "../data/apps";
import { dockAppIds } from "./Dock";

export default function AppLauncher({ onClose, openApp }) {
  const [query, setQuery] = useState("");

  
  const dockApps = apps.filter((app) => dockAppIds.includes(app.id));

  const q = query.toLowerCase();
  const filteredApps = dockApps.filter((app) => {
    const text = (app.name + " " + app.category).toLowerCase();
    return text.includes(q);
  });

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 transition-opacity duration-150"
      onMouseDown={onClose}
    >
      <div
        className="w-[min(640px,92vw)] max-h-[75vh] border rounded-[var(--radius-lg)] p-5 overflow-hidden flex flex-col gap-4 shadow-2xl transition-transform duration-150"
        style={{
          backgroundColor: "var(--bg-window)",
          borderColor: "var(--border-subtle)",
          color: "var(--text-primary)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div>
            <div
              className="text-[10px] font-mono tracking-widest uppercase opacity-50"
              style={{ color: "var(--text-secondary)" }}
            >
              System Registry
            </div>
            <h2
              className="text-xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Applications
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-xs)] transition-colors opacity-70 hover:opacity-100"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <X size={16} />
          </button>
        </div>

        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
            style={{ color: "var(--text-secondary)" }}
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applications..."
            className="w-full border rounded-[var(--radius-sm)] py-2.5 pl-9 pr-4 text-xs font-sans outline-none transition-colors"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-strong)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-subtle)")
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto pr-1">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                openApp(app.id);
                onClose();
              }}
              className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] text-left transition-colors border group"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-surface-hover)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <div
                className="w-8 h-8 rounded-[var(--radius-xs)] flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: "var(--bg-window)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                <app.icon size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className="text-xs font-medium truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {app.name}
                </div>
                <div
                  className="text-[10px] opacity-60 truncate capitalize mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {app.category}
                </div>
              </div>
            </button>
          ))}

          {filteredApps.length === 0 && (
            <div
              className="col-span-full text-center text-xs py-6 opacity-60"
              style={{ color: "var(--text-secondary)" }}
            >
              No matching applications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
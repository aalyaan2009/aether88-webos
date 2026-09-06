import { Moon, Sun, Search, Grid3X3 } from "lucide-react";

export default function TopBar({ dark, setDark, openLauncher }) {
  const now = new Date();

  const date = now.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const time = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-9 border-b-2 flex items-center justify-between px-3 select-none text-xs"
      style={{
        backgroundColor: "var(--text-primary)",
        borderColor: "var(--text-primary)",
        color: "var(--bg-desktop)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 inline-block"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span className="font-bold uppercase tracking-[0.15em] text-[11px]">
            AetherOS
          </span>
          <span className="text-[9px] uppercase tracking-[0.1em] opacity-50">
            v1.0
          </span>
        </div>

        <button
          onClick={openLauncher}
          className="flex items-center gap-1.5 px-2 py-1 border border-transparent transition-colors"
          style={{ opacity: 0.8 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--bg-desktop)";
            e.currentTarget.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.opacity = 0.8;
          }}
          title="Search Applications"
        >
          <Search size={12} />
          <span className="text-[10px] uppercase tracking-[0.1em]">Search</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={openLauncher}
          className="w-6 h-6 flex items-center justify-center border border-transparent transition-colors"
          style={{ opacity: 0.8 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--bg-desktop)";
            e.currentTarget.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.opacity = 0.8;
          }}
          title="App Launcher"
        >
          <Grid3X3 size={13} />
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="flex items-center gap-1.5 px-2 py-1 border border-transparent transition-colors"
          style={{ opacity: 0.8 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--bg-desktop)";
            e.currentTarget.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.opacity = 0.8;
          }}
          title="Toggle System Appearance"
        >
          {dark ? (
            <>
              <Sun size={12} style={{ color: "var(--accent)" }} />
              <span className="text-[10px] uppercase tracking-[0.1em]">Light</span>
            </>
          ) : (
            <>
              <Moon size={12} />
              <span className="text-[10px] uppercase tracking-[0.1em]">Dark</span>
            </>
          )}
        </button>

        <div
          className="h-3.5 w-px mx-1"
          style={{ backgroundColor: "var(--bg-desktop)", opacity: 0.25 }}
        />

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] px-1 opacity-80">
          <span>{date}</span>
          <span className="font-bold" style={{ color: "var(--accent)" }}>
            {time}
          </span>
        </div>
      </div>
    </header>
  );
}
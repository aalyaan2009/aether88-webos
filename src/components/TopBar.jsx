import { Moon, Sun, Search, Grid3X3 } from "lucide-react";

export default function TopBar({ dark, setDark, openLauncher }) {
  const now = new Date();

  const date = now.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const time = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b backdrop-blur-xl flex items-center justify-between px-5"
      style={{
        background: dark
          ? "rgba(18,18,18,.88)"
          : "rgba(243,239,230,.88)",
        borderColor: dark ? "#333" : "#171717"
      }}
    >
      <div className="flex items-center gap-5">
        <div className="font-editorial text-xl font-black tracking-tight">
          AETHER
          <span className="italic text-[#c85a32]"> OS</span>
        </div>

        <div className="hidden md:block font-system text-[9px] tracking-[.25em] uppercase opacity-50">
          Browser Operating Environment
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={openLauncher}
          className="hidden sm:flex items-center gap-2 border px-3 py-1.5 text-xs font-system uppercase tracking-wider hover:bg-[#c85a32] hover:text-white transition"
        >
          <Search size={14} />
          Search
        </button>

        <button
          onClick={openLauncher}
          className="border p-2 hover:bg-[#c85a32] hover:text-white transition"
          title="Applications"
        >
          <Grid3X3 size={15} />
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="border px-3 py-1.5 text-xs font-system uppercase tracking-wider hover:bg-[#c85a32] hover:text-white transition"
        >
          {dark ? (
            <span className="flex items-center gap-2">
              <Sun size={13} />
              Light
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Moon size={13} />
              Dark
            </span>
          )}
        </button>

        <div className="hidden lg:block ml-3 text-right">
          <div className="font-system text-[10px] font-bold">
            {time}
          </div>

          <div className="font-system text-[8px] opacity-50 uppercase">
            {date}
          </div>
        </div>
      </div>
    </header>
  );
}
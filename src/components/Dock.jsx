import { useState, useEffect } from "react";
import { Search, Power } from "lucide-react";
import { apps } from "../data/apps";

export default function Dock({
  openApp,
  openLauncher,
  openApps
}) {
  const [time, setTime] = useState(
    new Date()
  );

  useEffect(() => {
    const id = setInterval(
      () => setTime(new Date()),
      1000
    );

    return () => clearInterval(id);
  }, []);

  const dockApps = [
    "files",
    "browser",
    "terminal",
    "notes",
    "calculator",
    "settings"
  ];

  return (
    <div
      className="
        fixed
        bottom-4
        left-1/2
        z-50
        flex
        items-center
        gap-1
        border
        px-2
        py-2
        backdrop-blur-xl
      "
      style={{
        background:
          "color-mix(in srgb, var(--paper) 90%, transparent)",
        width: "min(420px, calc(100vw - 16px))",
        justifyContent: "center",
        transform: "translateX(-50%)"
      }}
    >
      {dockApps.map((id) => {
        const app = apps.find(
          (item) => item.id === id
        );

        if (!app) return null;

        const Icon = app.icon;

        return (
          <button
            key={id}
            onClick={() => openApp(id)}
            className={`
              relative
              group
              p-3
              border
              transition
              ${
                openApps.includes(id)
                  ? "bg-[#c85a32] text-white border-[#c85a32]"
                  : "hover:bg-[#c85a32] hover:text-white"
              }
            `}
            title={app.name}
          >
            <Icon size={18} />

            <span
              className="
                absolute
                -top-8
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                bg-[#171717]
                text-white
                px-2
                py-1
                text-[9px]
                font-system
                opacity-0
                group-hover:opacity-100
                pointer-events-none
              "
            >
              {app.name}
            </span>
          </button>
        );
      })}

      <div className="w-px h-7 bg-current opacity-20 mx-1" />

      <button
        onClick={openLauncher}
        className="
          p-3
          border
          hover:bg-[#c85a32]
          hover:text-white
          transition
        "
      >
        <Search size={18} />
      </button>

      <div className="ml-2 px-3 font-system text-[10px]">
        {time.toLocaleTimeString(
          undefined,
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )}
      </div>

      <button
        className="
          p-3
          border
          hover:bg-[#171717]
          hover:text-white
          transition
        "
        title="Power"
      >
        <Power size={17} />
      </button>
    </div>
  );
}
import { X, Search } from "lucide-react";
import { useState } from "react";
import { apps } from "../data/apps";

export default function AppLauncher({ onClose, openApp }) {
  const [query, setQuery] = useState("");

  const filteredApps = apps.filter((app) =>
    `${app.name} ${app.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-md flex items-start justify-center pt-24"
      onMouseDown={onClose}
    >
      <div
        className="w-[min(900px,90vw)] max-h-[75vh] border bg-[var(--paper)] text-[var(--ink)] p-5 overflow-auto hard-shadow"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <div>
            <div className="font-system text-[9px] tracking-widest uppercase opacity-50">
              Application Registry
            </div>

            <h2 className="font-editorial text-4xl font-black uppercase">
              Applications
            </h2>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="relative mb-5">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
          />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applications..."
            className="w-full border py-3 pl-10 pr-4 bg-transparent font-system text-xs"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className="border p-4 text-left hover:bg-[#c85a32] hover:text-white transition"
            >
              <app.icon size={18} />

              <div className="mt-4 font-system text-[9px] uppercase font-bold">
                {app.name}
              </div>

              <div className="text-[8px] opacity-50 mt-1">
                {app.category}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

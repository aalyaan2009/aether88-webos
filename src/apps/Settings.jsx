import { useEffect, useState } from "react";
import { Palette, HardDrive, RefreshCw } from "lucide-react";

const accents = [
  { name: "Rust", value: "#c85a32" },
  { name: "Emerald", value: "#059669" },
  { name: "Cobalt", value: "#2563eb" },
  { name: "Amethyst", value: "#7c3aed" },
  { name: "Amber", value: "#d97706" },
];

export default function Settings() {
  const [accent, setAccent] = useState(
    () => localStorage.getItem("aether_accent") || "#c85a32"
  );
  const [storageUsed, setStorageUsed] = useState("0 KB");

  useEffect(() => {
    let bytes = 0;

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        bytes += (key.length + localStorage[key].length) * 2;
      }
    }

    setStorageUsed((bytes / 1024).toFixed(2) + " KB");
  }, []);

  const changeAccent = (color) => {
    setAccent(color);
    localStorage.setItem("aether_accent", color);
    document.documentElement.style.setProperty("--accent", color);
  };

  const resetOS = () => {
    if (
      !confirm(
        "Reset AETHER OS? This will clear open app history, notes, and targets."
      )
    ) {
      return;
    }

    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      className="h-full p-4 font-system space-y-5 text-xs overflow-y-auto select-text"
      style={{ color: "var(--ink)" }}
    >
      <div
        className="p-3 border rounded-xl space-y-2"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--paper-deep)",
        }}
      >
        <div className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider">
          <Palette size={14} />
          System Accent Theme
        </div>

        <p className="text-[11px] opacity-70">
          Select active highlight color for controls and window focus.
        </p>

        <div className="flex items-center gap-2 pt-1">
          {accents.map((item) => (
            <button
              key={item.name}
              onClick={() => changeAccent(item.value)}
              className="w-6 h-6 rounded-full border-2 transition-transform active:scale-95"
              style={{
                backgroundColor: item.value,
                borderColor:
                  accent === item.value ? "var(--ink)" : "transparent",
              }}
              title={item.name}
            />
          ))}
        </div>
      </div>

      <div
        className="p-3 border rounded-xl space-y-2"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--paper-deep)",
        }}
      >
        <div className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider">
          <HardDrive size={14} />
          Persistent Storage Memory
        </div>

        <div
          className="flex justify-between items-center text-[11px] py-1 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          <span className="opacity-70">LocalStorage Used</span>
          <span className="font-mono font-bold">{storageUsed}</span>
        </div>

        <div className="flex justify-between items-center text-[11px] py-1">
          <span className="opacity-70">Screen Resolution</span>
          <span className="font-mono">
            {window.innerWidth} x {window.innerHeight}
          </span>
        </div>
      </div>

      <div
        className="p-3 border rounded-xl space-y-2"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--paper-deep)",
        }}
      >
        <div className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider text-red-500">
          <RefreshCw size={14} />
          System Recovery
        </div>

        <p className="text-[11px] opacity-70">
          Wipe saved browser state and restore default OS layout.
        </p>

        <button
          onClick={resetOS}
          className="px-3 py-1.5 bg-red-600 text-white rounded-md text-[11px] font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
        >
          Factory Reset OS
        </button>
      </div>
    </div>
  );
}


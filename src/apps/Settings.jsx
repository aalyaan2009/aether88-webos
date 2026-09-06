import { useEffect, useState } from "react";
import { Palette, HardDrive, RotateCcw, Check } from "lucide-react";

const accents = [
  { name: "Aether", value: "#0d9488" },
  { name: "Ember", value: "#c85a32" },
  { name: "Ocean", value: "#2563eb" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Slate", value: "#64748b" },
];

export default function Settings() {
  const [accent, setAccent] = useState(
    () => localStorage.getItem("aether_accent") || "#0d9488"
  );
  const [storageUsed, setStorageUsed] = useState("0.00 KB");
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    let bytes = 0;

    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        const value = localStorage[key] || "";
        bytes += (key.length + value.length) * 2;
      }
    }

    setStorageUsed((bytes / 1024).toFixed(2) + " KB");
  }, []);

  function changeAccent(color) {
    setAccent(color);
    localStorage.setItem("aether_accent", color);
    document.documentElement.style.setProperty("--accent", color);
  }

  function handleReset() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div
      className="h-full p-5 space-y-6 text-xs overflow-y-auto select-text font-sans"
      style={{ color: "var(--text-primary)" }}
    >
      
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-tight opacity-70">
          <Palette size={14} />
          <span>Appearance</span>
        </div>

        <div
          className="p-4 rounded-[var(--radius-md)] border space-y-3"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-medium">Accent Color</div>
              <div
                className="text-[11px] mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Highlight theme for system controls and active elements.
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {accents.map((item) => {
                const isSelected = accent === item.value;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => changeAccent(item.value)}
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer border"
                    style={{
                      backgroundColor: item.value,
                      borderColor: isSelected
                        ? "var(--text-primary)"
                        : "transparent",
                      boxShadow: isSelected
                        ? "0 0 0 2px var(--bg-window)"
                        : "none",
                    }}
                    title={item.name}
                  >
                    {isSelected && <Check size={11} className="text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

     
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-tight opacity-70">
          <HardDrive size={14} />
          <span>Local Storage & System</span>
        </div>

        <div
          className="rounded-[var(--radius-md)] border divide-y overflow-hidden"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
            divideColor: "var(--border-subtle)",
          }}
        >
          <div className="p-3.5 flex justify-between items-center">
            <div>
              <div className="font-medium">Browser Data Used</div>
              <div
                className="text-[11px] mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Local storage consumed by AetherOS apps and window states.
              </div>
            </div>
            <span
              className="font-mono text-xs px-2 py-1 rounded-[var(--radius-xs)] border"
              style={{
                backgroundColor: "var(--bg-window)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {storageUsed}
            </span>
          </div>

          <div className="p-3.5 flex justify-between items-center">
            <div>
              <div className="font-medium">Screen Resolution</div>
              <div
                className="text-[11px] mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Current active display viewport dimensions.
              </div>
            </div>
            <span
              className="font-mono text-xs px-2 py-1 rounded-[var(--radius-xs)] border"
              style={{
                backgroundColor: "var(--bg-window)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {window.innerWidth} × {window.innerHeight}
            </span>
          </div>
        </div>
      </section>

      
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-tight opacity-70">
          <RotateCcw size={14} />
          <span>Reset Options</span>
        </div>

        <div
          className="p-4 rounded-[var(--radius-md)] border transition-all"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {!showConfirmReset ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-medium">Reset AetherOS</div>
                <div
                  className="text-[11px] mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Restore system layout and clear all locally stored application data.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="px-3 py-1.5 rounded-[var(--radius-sm)] font-medium text-xs transition-colors shrink-0 cursor-pointer border"
                style={{
                  backgroundColor: "var(--bg-window)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--destructive)";
                  e.currentTarget.style.color = "var(--destructive)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                Reset AetherOS...
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="font-medium text-xs">Reset AetherOS?</div>
                <div
                  className="text-[11px] mt-1 space-y-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p>This action cannot be undone. This will clear:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Saved window positions and layouts</li>
                    <li>System preferences and accent choices</li>
                    <li>Locally stored application data</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3 py-1.5 rounded-[var(--radius-sm)] border text-xs transition-colors cursor-pointer"
                  style={{
                    backgroundColor: "var(--bg-window)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-[var(--radius-sm)] text-white text-xs font-medium transition-opacity cursor-pointer"
                  style={{ backgroundColor: "var(--destructive)" }}
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Terminal, X } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";

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
import TopBar from "./components/TopBar";
import Wallpaper from "./components/Wallpaper";
import AppLauncher from "./components/AppLauncher";
import { apps } from "./data/apps";

const appMap = {
  browser: Browser,
  calculator: Calculator,
  clock: Clock,
  files: Files,
  music: Music,
  notes: Notes,
  settings: Settings,
  terminal: TerminalApp,
};

const terminalCommands = [
  { cmd: "help", desc: "List available system commands" },
  { cmd: "open <app>", desc: "Launch an application" },
  { cmd: "clear", desc: "Clear terminal screen" },
  { cmd: "theme <light|dark>", desc: "Toggle color scheme" },
  { cmd: "calc <expression>", desc: "Quick math evaluator" },
  { cmd: "sysinfo", desc: "View memory and process stats" },
  { cmd: "reset", desc: "Restore default desktop layout" },
];

export default function App() {
  const [dark, setDark] = useLocalStorage("aether_dark", true);
  const [openApps, setOpenApps] = useLocalStorage("aether_openApps", ["terminal"]);
  const [activeApp, setActiveApp] = useLocalStorage("aether_activeApp", "terminal");
  const [guideOpen, setGuideOpen] = useState(false);
  const [launcherOpen, setLauncherOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function focusApp(id) {
    setActiveApp(id);
    setOpenApps((prev) => {
      if (!prev.includes(id)) {
        return prev;
      }
      const rest = prev.filter((appId) => appId !== id);
      return [...rest, id];
    });
  }

  function openApp(id) {
    const appId = String(id || "").trim();
    if (!appId) {
      return;
    }

    if (openApps.includes(appId)) {
      focusApp(appId);
      return;
    }

    setOpenApps((prev) => [...prev, appId]);
    setActiveApp(appId);
  }

  function closeApp(id) {
    setOpenApps((prev) => {
      const remaining = prev.filter((appId) => appId !== id);

      if (activeApp === id) {
        if (remaining.length > 0) {
          setActiveApp(remaining[remaining.length - 1]);
        } else {
          setActiveApp(null);
        }
      }

      return remaining;
    });
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      <Wallpaper />

      <Desktop>
        <TopBar
          dark={dark}
          setDark={setDark}
          openLauncher={() => setLauncherOpen(true)}
        />

        <div className="relative pt-10 h-full w-full">
          {openApps.map((id) => {
            const app = apps.find((item) => item.id === id) || {
              id,
              name: id.replace(/-/g, " "),
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

      {launcherOpen && (
        <AppLauncher
          onClose={() => setLauncherOpen(false)}
          openApp={openApp}
        />
      )}

      {guideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-sm border-2 p-5 space-y-4"
            style={{
              backgroundColor: "var(--bg-window)",
              borderColor: "var(--border-strong)",
              boxShadow: "var(--shadow-window)",
              color: "var(--text-primary)",
            }}
          >
            <div
              className="flex items-center justify-between border-b-2 pb-3"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
              >
                <Terminal size={14} />
                Terminal Shortcuts
              </div>

              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                className="p-1 transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-xs">
              {terminalCommands.map((item) => (
                <div
                  key={item.cmd}
                  className="p-2 border"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-subtle)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <div className="font-bold" style={{ color: "var(--accent)" }}>
                    {item.cmd}
                  </div>
                  <div
                    className="text-[11px] mt-0.5"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              className="btn-os w-full"
            >
              Close
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
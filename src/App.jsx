import { useEffect, useMemo, useState } from "react";

import Browser from "./apps/Browser";
import Calculator from "./apps/Calculator";
import Clock from "./apps/Clock";
import Files from "./apps/Files";
import GenericApp from "./apps/GenericApp";
import Music from "./apps/Music";
import Notes from "./apps/Notes";
import Settings from "./apps/Settings";
import Terminal from "./apps/Terminal";
import AppLauncher from "./components/AppLauncher";
import Dock from "./components/Dock";
import Wallpaper from "./components/Wallpaper";
import Window from "./components/Window";
import { apps } from "./data/apps";

const appMap = {
  browser: Browser,
  calculator: Calculator,
  clock: Clock,
  files: Files,
  music: Music,
  notes: Notes,
  settings: Settings,
  terminal: Terminal
};

export default function App() {
  const [dark, setDark] = useState(false);
  const [openApps, setOpenApps] = useState(["terminal"]);
  const [activeApp, setActiveApp] = useState("terminal");
  const [launcherOpen, setLauncherOpen] = useState(false);

  useEffect(() => {
    const root = document.body;
    root.classList.toggle("os-dark", dark);

    document.documentElement.style.setProperty(
      "--paper",
      dark ? "#121212" : "#f3efe6"
    );
    document.documentElement.style.setProperty(
      "--ink",
      dark ? "#f3efe6" : "#171717"
    );
    document.documentElement.style.setProperty(
      "--line",
      dark ? "#f3efe6" : "#171717"
    );
  }, [dark]);

  const appLookup = useMemo(
    () => Object.fromEntries(apps.map((app) => [app.id, app])),
    []
  );

  const openApp = (id) => {
    const appId = String(id || "").trim();

    if (!appId || !appLookup[appId]) {
      return;
    }

    setOpenApps((current) => {
      if (current.includes(appId)) {
        return current;
      }

      return [...current, appId];
    });
    setActiveApp(appId);
    setLauncherOpen(false);
  };

  const closeApp = (id) => {
    setOpenApps((current) => current.filter((appId) => appId !== id));
    setActiveApp((currentActive) =>
      currentActive === id ? "terminal" : currentActive
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3efe6] text-[#171717]">
      <Wallpaper dark={dark} />

      <div className="relative z-10 h-screen w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,90,50,0.09),transparent_40%)]" />

        <div className="relative z-10 flex h-full w-full flex-col">
          <header className="flex items-center justify-between border-b border-current/10 bg-[#f3efe6]/80 px-4 py-2 backdrop-blur-sm">
            <div className="font-system text-[9px] uppercase tracking-[0.35em]">
              AETHER OS
            </div>

            <div className="font-system text-[9px] uppercase tracking-[0.25em] opacity-60">
              {dark ? "dark mode" : "network stable"}
            </div>
          </header>

          <main className="relative flex-1 overflow-hidden">
            {openApps.map((id) => {
              const app = appLookup[id] || {
                id,
                name: id.replace(/-/g, " "),
                category: "System"
              };
              const Component = appMap[id] || GenericApp;

              return (
                <Window
                  key={id}
                  title={app.name}
                  icon={app.icon || GenericApp}
                  onClose={() => closeApp(id)}
                  onFocus={() => setActiveApp(id)}
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
          </main>
        </div>
      </div>

      <Dock
        openApp={openApp}
        openLauncher={() => setLauncherOpen(true)}
        openApps={openApps}
      />

      {launcherOpen && (
        <AppLauncher
          onClose={() => setLauncherOpen(false)}
          openApp={openApp}
        />
      )}
    </div>
  );
}
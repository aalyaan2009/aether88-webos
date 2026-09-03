import { useEffect, useRef, useState } from "react";

export default function Terminal({ openApp }) {
  const [history, setHistory] = useState([
    "AETHER OS TERMINAL",
    "Version 1.0.0",
    "",
    "Type 'help' for available commands.",
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (command) => {
    switch (command.toLowerCase()) {
      case "help":
        return [
          "Available commands:",
          "",
          "help       Show this message",
          "clear      Clear terminal",
          "date       Current date",
          "apps       List applications",
          "open X     Open application",
          "whoami     Current user",
          "version    OS version",
        ];

      case "date":
        return [new Date().toString()];

      case "apps":
        return ["45 applications installed."];

      case "whoami":
        return ["guest@aether"];

      case "version":
        return ["AETHER OS 1.0.0"];

      default:
        if (command.toLowerCase().startsWith("open ")) {
          const appName = command.substring(5).trim();

          openApp(appName.toLowerCase().replaceAll(" ", "-"));

          return [`Launching ${appName}...`];
        }

        return [`Command not found: ${command}`];
    }
  };

  const execute = (event) => {
    if (event.key !== "Enter") return;

    const command = input.trim();

    if (!command) return;

    if (command.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = runCommand(command);

    setHistory((currentHistory) => [
      ...currentHistory,
      `guest@aether:~$ ${command}`,
      ...output,
    ]);

    setInput("");
  };

  return (
    <div
      className="h-full p-4 font-mono text-xs overflow-auto select-text"
      style={{
        backgroundColor: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap leading-relaxed">
          {line}
        </div>
      ))}

      <div className="flex mt-2 items-center">
        <span
          className="mr-2 font-bold"
          style={{ color: "var(--accent)" }}
        >
          guest@aether:~$
        </span>

        <input
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={execute}
          className="flex-1 bg-transparent outline-none border-none font-mono"
          style={{ color: "var(--ink)" }}
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
import { useState, useEffect, useRef } from "react";

export default function Terminal({ openApp }) {
  const [history, setHistory] = useState([
    "AETHER OS TERMINAL",
    "Version 1.0.0",
    "",
    "Type 'help' for available commands."
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const execute = (event) => {
    if (event.key !== "Enter") return;

    const command = input.trim();
    if (!command) return;

    let output = [];

    switch (command.toLowerCase()) {
      case "help":
        output = [
          "Available commands:",
          "",
          "help       Show this message",
          "clear      Clear terminal",
          "date       Current date",
          "apps       List applications",
          "open X     Open application",
          "whoami     Current user",
          "version    OS version"
        ];
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "date":
        output = [new Date().toString()];
        break;

      case "apps":
        output = ["45 applications installed."];
        break;

      case "whoami":
        output = ["guest@aether"];
        break;

      case "version":
        output = ["AETHER OS 1.0.0"];
        break;

      default:
        if (command.toLowerCase().startsWith("open ")) {
          const app = command.substring(5).trim();

          openApp(app.toLowerCase().replaceAll(" ", "-"));
          output = [`Launching ${app}...`];
        } else {
          output = [`Command not found: ${command}`];
        }
    }

    setHistory([
      ...history,
      `guest@aether:~$ ${command}`,
      ...output
    ]);

    setInput("");
  };

  return (
    <div
      className="h-full p-4 font-mono text-xs overflow-auto select-text"
      style={{
        backgroundColor: "var(--paper)",
        color: "var(--ink)"
      }}
    >
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap leading-relaxed">
          {line}
        </div>
      ))}

      <div className="flex mt-2 items-center">
        <span className="mr-2 font-bold" style={{ color: "var(--accent)" }}>
          guest@aether:~$
        </span>

        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={execute}
          className="flex-1 bg-transparent outline-none border-none font-mono"
          style={{ color: "var(--ink)" }}
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
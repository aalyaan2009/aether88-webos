import { useState } from "react";

export default function Terminal({
  openApp
}) {
  const [history, setHistory] =
    useState([
      "AETHER OS TERMINAL",
      "Version 1.0.0",
      "",
      "Type 'help' for available commands."
    ]);

  const [input, setInput] =
    useState("");

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
        output = [
          new Date().toString()
        ];
        break;

      case "apps":
        output = [
          "45 applications installed."
        ];
        break;

      case "whoami":
        output = [
          "guest@aether"
        ];
        break;

      case "version":
        output = [
          "AETHER OS 1.0.0"
        ];
        break;

      default:
        if (
          command
            .toLowerCase()
            .startsWith("open ")
        ) {
          const app =
            command.substring(5).trim();

          openApp(
            app
              .toLowerCase()
              .replaceAll(" ", "-")
          );

          output = [
            `Launching ${app}...`
          ];
        } else {
          output = [
            `Command not found: ${command}`
          ];
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
      className="
        h-full
        bg-[#171717]
        text-[#f3efe6]
        p-4
        font-system
        text-xs
        overflow-auto
      "
    >
      {history.map(
        (line, index) => (
          <div key={index}>
            {line}
          </div>
        )
      )}

      <div className="flex mt-2">
        <span className="text-[#c85a32] mr-2">
          guest@aether:~$
        </span>

        <input
          autoFocus
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={execute}
          className="
            flex-1
            bg-transparent
            outline-none
            text-white
          "
        />
      </div>
    </div>
  );
}
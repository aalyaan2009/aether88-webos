import { useEffect, useRef, useState } from "react";

export default function Terminal({ openApp }) {
  const [history, setHistory] = useState([
    "AetherOS Shell v1.0.0",
    "Type 'help' for available commands.",
    "",
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function runCommand(command) {
    const cmd = command.toLowerCase();

    if (cmd === "help") {
      return [
        "Available commands:",
        "",
        "  help       Show this message",
        "  clear      Clear terminal",
        "  date       Current date",
        "  apps       List applications",
        "  open X     Open application",
        "  whoami     Current user",
        "  version    OS version",
      ];
    }

    if (cmd === "date") {
      return [new Date().toString()];
    }

    if (cmd === "apps") {
      return ["45 applications installed."];
    }

    if (cmd === "whoami") {
      return ["guest@aether"];
    }

    if (cmd === "version") {
      return ["AETHER OS 1.0.0"];
    }

    if (cmd.startsWith("open ")) {
      const appName = command.substring(5).trim();
      openApp(appName.toLowerCase().replaceAll(" ", "-"));
      return [`Launching ${appName}...`];
    }

    return [`Command not found: ${command}`];
  }

  function execute(event) {
    if (event.key !== "Enter") {
      return;
    }

    const command = input.trim();

    if (!command) {
      return;
    }

    if (command.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = runCommand(command);

    setHistory((prev) => [
      ...prev,
      `guest@aether:~$ ${command}`,
      ...output,
    ]);

    setInput("");
  }

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div
      onClick={handleClick}
      className="h-full p-4 text-[12px] leading-relaxed overflow-auto select-text cursor-text transition-colors"
      style={{
        backgroundColor: "#0d0e11",
        color: "#e2e8f0",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }}
    >
      <div className="space-y-0.5">
        {history.map((line, index) => {
          const isPrompt = line.startsWith("guest@aether:~$");
          const isError = line.startsWith("Command not found");

          let color = "#94a3b8";
          if (isPrompt) {
            color = "#f8fafc";
          } else if (isError) {
            color = "var(--destructive, #f87171)";
          }

          return (
            <div
              key={index}
              className="whitespace-pre-wrap break-words"
              style={{ color: color }}
            >
              {isPrompt ? (
                <>
                  <span
                    className="font-medium mr-2 select-none"
                    style={{ color: "var(--accent, #0d9488)" }}
                  >
                    guest@aether:~$
                  </span>
                  <span>{line.replace("guest@aether:~$ ", "")}</span>
                </>
              ) : (
                line
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center mt-0.5">
        <span
          className="mr-2 font-medium shrink-0 select-none"
          style={{ color: "var(--accent, #0d9488)" }}
        >
          guest@aether:~$
        </span>

        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={execute}
          className="flex-1 bg-transparent outline-none border-none p-0 font-mono text-[12px]"
          style={{
            color: "#f8fafc",
            caretColor: "var(--accent, #0d9488)",
          }}
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
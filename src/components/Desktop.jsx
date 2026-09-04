import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  StickyNote,
  CheckSquare,
  Clock,
  Plus,
  Trash2,
  GripHorizontal,
  ExternalLink,
} from "lucide-react";

function DraggableWidget({ id, title, icon: Icon, initialPos, children }) {
  const [pos, setPos] = useState(() => {
    const saved = localStorage.getItem(`aether_widget_${id}_pos`);

    if (saved) {
      return JSON.parse(saved);
    }

    return initialPos;
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem(
      `aether_widget_${id}_pos`,
      JSON.stringify(pos)
    );
  }, [pos, id]);

  const startDragging = (e) => {
    e.stopPropagation();

    dragging.current = true;

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    const move = (e) => {
      if (!dragging.current) {
        return;
      }

      setPos({
        x: Math.max(10, e.clientX - offset.current.x),
        y: Math.max(50, e.clientY - offset.current.y),
      });
    };

    const stopDragging = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stopDragging);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stopDragging);
  };

  return (
    <div
      className="absolute w-72 border backdrop-blur-md shadow-lg flex flex-col z-10 pointer-events-auto"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        backgroundColor: "var(--paper-deep)",
        borderColor: "var(--border-color)",
        color: "var(--ink)",
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b select-none"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor:
            "color-mix(in srgb, var(--paper) 60%, transparent)",
        }}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-system uppercase tracking-wider font-bold">
          <Icon size={13} />
          {title}
        </div>

        <button
          onMouseDown={startDragging}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-[var(--accent)] hover:text-white transition-colors"
          title="Drag Widget"
        >
          <GripHorizontal size={14} className="opacity-70" />
        </button>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default function Desktop({ children }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timerMode, setTimerMode] = useState("work");

  const [note, setNote] = useState(() => {
    const saved = localStorage.getItem("aether_scratchpad_note");

    if (saved !== null) {
      return JSON.parse(saved);
    }

    return "• Review CS project builds\n• Update web OS components\n• Draft daily study notes";
  });

  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("aether_daily_tasks");

    if (saved !== null) {
      return JSON.parse(saved);
    }

    return [
      { id: 1, text: "Fix window drag transitions", done: true },
      { id: 2, text: "Theme terminal light mode", done: true },
      {
        id: 3,
        text: "Configure desktop productivity widgets",
        done: false,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(
      "aether_scratchpad_note",
      JSON.stringify(note)
    );
  }, [note]);

  useEffect(() => {
    localStorage.setItem(
      "aether_daily_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) {
      if (secondsLeft === 0) {
        setIsActive(false);
      }

      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    setIsActive((active) => !active);
  };

  const resetTimer = () => {
    setIsActive(false);

    if (timerMode === "work") {
      setSecondsLeft(25 * 60);
    } else {
      setSecondsLeft(5 * 60);
    }
  };

  const switchMode = (mode) => {
    setTimerMode(mode);
    setIsActive(false);

    if (mode === "work") {
      setSecondsLeft(25 * 60);
    } else {
      setSecondsLeft(5 * 60);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return (
      minutes.toString().padStart(2, "0") +
      ":" +
      secs.toString().padStart(2, "0")
    );
  };

  const toggleTask = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          };
        }

        return task;
      })
    );
  };

  const addTask = (e) => {
    e.preventDefault();

    const text = newTask.trim();

    if (!text) {
      return;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: Date.now(),
        text: text,
        done: false,
      },
    ]);

    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks((tasks) =>
      tasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden select-none transition-colors duration-200"
      style={{
        backgroundColor: "var(--paper)",
        color: "var(--ink)",
        backgroundImage:
          "radial-gradient(var(--border-color) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <a
        href="https://aalyaan2009.github.io/studentos/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-16 right-6 z-10 flex flex-col items-center gap-1.5 p-3 border rounded-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-[var(--accent)] hover:text-white group pointer-events-auto shadow-md"
        style={{
          backgroundColor: "var(--paper-deep)",
          borderColor: "var(--border-color)",
          color: "var(--ink)",
        }}
        title="Check out my StudentOS project"
      >
        <div
          className="p-2 border rounded-lg group-hover:border-white/40"
          style={{ borderColor: "var(--border-color)" }}
        >
          <ExternalLink size={20} />
        </div>

        <span className="text-[10px] font-system font-bold tracking-tight text-center max-w-[100px] leading-tight">
          StudentOS
        </span>
      </a>

      <DraggableWidget
        id="timer"
        title="Focus Timer"
        icon={Clock}
        initialPos={{ x: 24, y: 64 }}
      >
        <div className="flex items-center justify-between text-[10px] font-system mb-2">
          <button
            onClick={() => switchMode("work")}
            className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider ${
              timerMode === "work"
                ? "bg-[var(--accent)] text-white font-bold"
                : ""
            }`}
            style={{ borderColor: "var(--border-color)" }}
          >
            25m Focus
          </button>

          <button
            onClick={() => switchMode("break")}
            className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider ${
              timerMode === "break"
                ? "bg-[var(--accent)] text-white font-bold"
                : ""
            }`}
            style={{ borderColor: "var(--border-color)" }}
          >
            5m Break
          </button>
        </div>

        <div className="text-3xl font-mono font-bold tracking-tight text-center my-2">
          {formatTime(secondsLeft)}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={toggleTimer}
            className="w-8 h-8 flex items-center justify-center border hover:bg-[var(--accent)] hover:text-white transition-colors"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: isActive
                ? "var(--accent)"
                : "transparent",
              color: isActive ? "#ffffff" : "var(--ink)",
            }}
            title={isActive ? "Pause Timer" : "Start Timer"}
          >
            {isActive ? (
              <Pause size={14} />
            ) : (
              <Play size={14} className="ml-0.5" />
            )}
          </button>

          <button
            onClick={resetTimer}
            className="w-8 h-8 flex items-center justify-center border hover:bg-[var(--accent)] hover:text-white transition-colors"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--ink)",
            }}
            title="Reset Timer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </DraggableWidget>

      <DraggableWidget
        id="scratchpad"
        title="Quick Scratchpad"
        icon={StickyNote}
        initialPos={{ x: 24, y: 250 }}
      >
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-28 bg-transparent resize-none outline-none font-mono text-xs leading-relaxed border p-2"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--ink)",
          }}
          placeholder="Write quick notes..."
        />
      </DraggableWidget>

      <DraggableWidget
        id="targets"
        title="Daily Targets"
        icon={CheckSquare}
        initialPos={{ x: 24, y: 430 }}
      >
        <form onSubmit={addTask} className="flex gap-1 mb-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add target..."
            className="flex-1 bg-transparent border px-2 py-1 text-xs font-system outline-none"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--ink)",
            }}
          />

          <button
            type="submit"
            className="p-1 border hover:bg-[var(--accent)] hover:text-white"
            style={{ borderColor: "var(--border-color)" }}
          >
            <Plus size={13} />
          </button>
        </form>

        <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 font-system text-xs">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between group p-1"
            >
              <label className="flex items-center gap-2 cursor-pointer truncate flex-1">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="accent-[var(--accent)] cursor-pointer"
                />

                <span
                  className={`truncate ${
                    task.done ? "line-through opacity-50" : ""
                  }`}
                >
                  {task.text}
                </span>
              </label>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-500"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </DraggableWidget>

      {children}
    </div>
  );
}


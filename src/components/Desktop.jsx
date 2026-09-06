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
    localStorage.setItem(`aether_widget_${id}_pos`, JSON.stringify(pos));
  }, [pos, id]);

  function startDragging(e) {
    e.stopPropagation();
    dragging.current = true;

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    function move(e) {
      if (!dragging.current) {
        return;
      }

      setPos({
        x: Math.max(10, e.clientX - offset.current.x),
        y: Math.max(44, e.clientY - offset.current.y),
      });
    }

    function stopDragging() {
      dragging.current = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stopDragging);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stopDragging);
  }

  return (
    <div
      className="absolute w-64 border-2 flex flex-col z-10 pointer-events-auto transition-shadow"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        backgroundColor: "var(--bg-window)",
        borderColor: "var(--border-strong)",
        color: "var(--text-primary)",
        boxShadow: "var(--shadow-popover)",
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b-2 select-none"
        style={{
          borderColor: "var(--border-strong)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <div
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          <Icon size={12} style={{ color: "var(--accent)" }} />
          <span>{title}</span>
        </div>

        <button
          onMouseDown={startDragging}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-[var(--bg-surface-hover)] transition-colors"
          style={{ color: "var(--text-muted)" }}
          title="Drag Widget"
        >
          <GripHorizontal size={13} />
        </button>
      </div>

      <div className="p-3 flex-1 flex flex-col">{children}</div>
    </div>
  );
}

function DesktopHero() {
  return (
    <div
      className="absolute top-24 left-80 right-28 z-0 max-w-lg hidden lg:block pointer-events-none select-none space-y-3 text-left"
      style={{ color: "var(--text-primary)" }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-2"
        style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
      >
        <span className="h-px w-6 inline-block" style={{ backgroundColor: "var(--accent)" }} />
        PERSONAL WORKSPACE DESKTOP 
      </p>

      <h1
        className="text-4xl xl:text-5xl font-black tracking-tight leading-none uppercase"
        style={{ fontFamily: "var(--font-display)" }}
      >
        A QUIET DESKTOP <br />
        FOR{" "}
        <em style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
          DEEP
        </em>{" "}
        WORK.
      </h1>

      <p
        className="text-sm opacity-75 leading-relaxed pt-1 max-w-sm"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Every widget on this desktop earns its place
  <br />
  A timer that respects your attention
  <br />
  A scratchpad for half formed thoughts
  <br />
  and A target list that asks what you finished today.
      </p>

      <div
        className="flex items-center gap-3 pt-2 text-[10px] font-bold uppercase tracking-[0.15em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
      >
        <span>DRAG TO REARRANGE WIDGETS</span>
        <span style={{ color: "var(--accent)" }}>·</span>
        <span>STATE AUTOSAVES</span>
      </div>
    </div>
  );
}

function getModeStyle(isOn) {
  if (isOn) {
    return {
      backgroundColor: "var(--accent)",
      color: "#ffffff",
      borderColor: "var(--accent)",
      fontFamily: "var(--font-mono)",
    };
  }

  return {
    backgroundColor: "var(--bg-surface)",
    borderColor: "var(--border-subtle)",
    color: "var(--text-secondary)",
    fontFamily: "var(--font-mono)",
  };
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
      { id: 3, text: "Configure desktop productivity widgets", done: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem("aether_scratchpad_note", JSON.stringify(note));
  }, [note]);

  useEffect(() => {
    localStorage.setItem("aether_daily_tasks", JSON.stringify(tasks));
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

    return () => {
      clearInterval(timer);
    };
  }, [isActive, secondsLeft]);

  function toggleTimer() {
    setIsActive((active) => !active);
  }

  function resetTimer() {
    setIsActive(false);
    if (timerMode === "work") {
      setSecondsLeft(25 * 60);
    } else {
      setSecondsLeft(5 * 60);
    }
  }

  function switchMode(mode) {
    setTimerMode(mode);
    setIsActive(false);
    if (mode === "work") {
      setSecondsLeft(25 * 60);
    } else {
      setSecondsLeft(5 * 60);
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function toggleTask(id) {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
  }

  function addTask(e) {
    e.preventDefault();
    const text = newTask.trim();
    if (!text) {
      return;
    }

    setTasks((tasks) => [...tasks, { id: Date.now(), text, done: false }]);
    setNewTask("");
  }

  function deleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none">
      <DesktopHero />

      <a
        href="https://aalyaan2009.github.io/studentos/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-12 right-5 z-10 flex flex-col items-center gap-1.5 p-2.5 border-2 border-transparent hover:border-[var(--border-strong)] transition-all group pointer-events-auto"
        style={{ backgroundColor: "transparent" }}
        title="Check out my StudentOS project"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-surface)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <div
          className="p-2 border-2 group-hover:text-[var(--accent)] transition-colors"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-strong)",
            color: "var(--text-secondary)",
          }}
        >
          <ExternalLink size={18} />
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          StudentOS
        </span>
      </a>

      <DraggableWidget
        id="timer"
        title="Focus Timer"
        icon={Clock}
        initialPos={{ x: 20, y: 60 }}
      >
        <div className="flex items-center gap-1 mb-3">
          <button
            onClick={() => switchMode("work")}
            className="flex-1 py-1 text-[9px] font-bold uppercase tracking-[0.1em] border-2 transition-colors"
            style={getModeStyle(timerMode === "work")}
          >
            25M Focus
          </button>
          <button
            onClick={() => switchMode("break")}
            className="flex-1 py-1 text-[9px] font-bold uppercase tracking-[0.1em] border-2 transition-colors"
            style={getModeStyle(timerMode === "break")}
          >
            5M Break
          </button>
        </div>

        <div
          className="text-3xl font-black tracking-tighter text-center my-2"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
        >
          {formatTime(secondsLeft)}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-1">
          <button
            onClick={toggleTimer}
            className="btn-os flex-1 py-1.5"
            title={isActive ? "Pause Timer" : "Start Timer"}
          >
            {isActive ? <Pause size={12} /> : <Play size={12} />}
          </button>

          <button
            onClick={resetTimer}
            className="btn-os py-1.5 px-2.5"
            title="Reset Timer"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </DraggableWidget>

      <DraggableWidget
        id="scratchpad"
        title="Scratchpad"
        icon={StickyNote}
        initialPos={{ x: 20, y: 240 }}
      >
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-24 resize-none outline-none text-[11px] leading-relaxed border-2 p-2 focus:border-[var(--accent)]"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
          }}
          placeholder="Write quick notes..."
        />
      </DraggableWidget>

      <DraggableWidget
        id="targets"
        title="Daily Targets"
        icon={CheckSquare}
        initialPos={{ x: 20, y: 400 }}
      >
        <form onSubmit={addTask} className="flex gap-1.5 mb-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add target..."
            className="flex-1 border-2 px-2 py-1.5 text-[11px] outline-none focus:border-[var(--accent)]"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
            }}
          />
          <button type="submit" className="btn-os px-2.5">
            <Plus size={12} />
          </button>
        </form>

        <div className="max-h-28 overflow-y-auto space-y-1 pr-0.5 text-[11px]">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between group py-1.5 px-2 border hover:bg-[var(--bg-surface-hover)] transition-colors"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <label className="flex items-center gap-2 cursor-pointer truncate flex-1">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="accent-[var(--accent)] cursor-pointer"
                />
                <span
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-mono)",
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done ? "var(--text-muted)" : "var(--text-primary)",
                  }}
                >
                  {task.text}
                </span>
              </label>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-0.5 transition-opacity"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--destructive)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      </DraggableWidget>

      {children}
    </div>
  );
}
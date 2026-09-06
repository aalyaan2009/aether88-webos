import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";

export default function Window({
  title,
  icon: Icon,
  children,
  onClose,
  onFocus,
  active,
}) {
  const [maximized, setMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 140, y: 70 });
  const [size, setSize] = useState({ width: 680, height: 460 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
    startW: 0,
    startH: 0,
  });

  function startDrag(e) {
    if (maximized || e.target.closest("button")) {
      return;
    }

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
  }

  function startResize(e) {
    e.stopPropagation();
    if (maximized) {
      return;
    }

    setIsResizing(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
  }

  useEffect(() => {
    if (!isDragging && !isResizing) {
      return;
    }

    function move(e) {
      if (isDragging) {
        setPos({
          x: Math.max(0, dragRef.current.posX + e.clientX - dragRef.current.startX),
          y: Math.max(0, dragRef.current.posY + e.clientY - dragRef.current.startY),
        });
      }

      if (isResizing) {
        setSize({
          width: Math.max(320, dragRef.current.startW + e.clientX - dragRef.current.startX),
          height: Math.max(220, dragRef.current.startH + e.clientY - dragRef.current.startY),
        });
      }
    }

    function stop() {
      setIsDragging(false);
      setIsResizing(false);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };
  }, [isDragging, isResizing]);

  const moving = isDragging || isResizing;

  let winStyle = {
    backgroundColor: "var(--bg-window)",
    color: "var(--text-primary)",
    borderColor: active ? "var(--border-strong)" : "var(--border-subtle)",
    boxShadow: active ? "var(--shadow-window)" : "4px 4px 0 var(--border-subtle)",
  };

  if (!maximized) {
    winStyle.left = `${pos.x}px`;
    winStyle.top = `${pos.y}px`;
    winStyle.width = `${size.width}px`;
    winStyle.height = `${size.height}px`;
  }

  return (
    <div
      onMouseDown={onFocus}
      className={`fixed z-30 flex flex-col overflow-hidden border-2 ${
        moving ? "transition-none select-none" : "transition-all duration-150"
      } ${maximized ? "top-10 left-3 right-3 bottom-16 w-auto h-auto" : ""}`}
      style={winStyle}
    >
      {/* title bar */}
      <div
        onMouseDown={startDrag}
        className={`h-9 px-3 flex items-center justify-between border-b-2 select-none shrink-0 transition-colors ${
          active ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        }`}
        style={{
          backgroundColor: active ? "var(--text-primary)" : "var(--bg-surface)",
          borderColor: active ? "var(--text-primary)" : "var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              size={12}
              style={{ color: active ? "var(--accent)" : "var(--text-muted)" }}
            />
          )}
          <span
            className="text-[11px] font-bold uppercase tracking-[0.12em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: active ? "var(--bg-desktop)" : "var(--text-muted)",
            }}
          >
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMaximized(!maximized)}
            className="w-5 h-5 flex items-center justify-center border transition-colors"
            style={{
              borderColor: active ? "var(--bg-desktop)" : "var(--border-subtle)",
              color: active ? "var(--bg-desktop)" : "var(--text-secondary)",
              opacity: active ? 0.85 : 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.opacity = 1;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = active
                ? "var(--bg-desktop)"
                : "var(--border-subtle)";
              e.currentTarget.style.color = active
                ? "var(--bg-desktop)"
                : "var(--text-secondary)";
              e.currentTarget.style.opacity = active ? 0.85 : 1;
            }}
            title={maximized ? "Restore Window" : "Maximize Window"}
          >
            {maximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center border transition-colors"
            style={{
              borderColor: active ? "var(--bg-desktop)" : "var(--border-subtle)",
              color: active ? "var(--bg-desktop)" : "var(--text-secondary)",
              opacity: active ? 0.85 : 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--destructive)";
              e.currentTarget.style.borderColor = "var(--destructive)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.opacity = 1;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = active
                ? "var(--bg-desktop)"
                : "var(--border-subtle)";
              e.currentTarget.style.color = active
                ? "var(--bg-desktop)"
                : "var(--text-secondary)";
              e.currentTarget.style.opacity = active ? 0.85 : 1;
            }}
            title="Close Window"
          >
            <X size={10} />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto p-4"
        style={{ backgroundColor: "var(--bg-window)" }}
      >
        {children}
      </div>

      {!maximized && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5"
        >
          <div
            className="w-2 h-2 border-r-2 border-b-2"
            style={{ borderColor: "var(--accent)" }}
          />
        </div>
      )}
    </div>
  );
}
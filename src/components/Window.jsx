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
  const [pos, setPos] = useState({ x: 120, y: 80 });
  const [size, setSize] = useState({ width: 720, height: 480 });
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

  const startDrag = (event) => {
    if (maximized || event.target.closest("button")) return;

    setIsDragging(true);

    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      posX: pos.x,
      posY: pos.y,
    };
  };

  const startResize = (event) => {
    event.stopPropagation();

    if (maximized) return;

    setIsResizing(true);

    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startW: size.width,
      startH: size.height,
    };
  };

  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (event) => {
      if (isDragging) {
        requestAnimationFrame(() => {
          setPos({
            x: Math.max(
              0,
              dragRef.current.posX +
                (event.clientX - dragRef.current.startX)
            ),
            y: Math.max(
              0,
              dragRef.current.posY +
                (event.clientY - dragRef.current.startY)
            ),
          });
        });

        return;
      }

      if (isResizing) {
        requestAnimationFrame(() => {
          setSize({
            width: Math.max(
              320,
              dragRef.current.startW +
                (event.clientX - dragRef.current.startX)
            ),
            height: Math.max(
              220,
              dragRef.current.startH +
                (event.clientY - dragRef.current.startY)
            ),
          });
        });
      }
    };

    const stopInteraction = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopInteraction);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopInteraction);
    };
  }, [isDragging, isResizing]);

  const toggleMaximized = () => {
    setMaximized((current) => !current);
  };

  const isMoving = isDragging || isResizing;

  return (
    <div
      onMouseDown={onFocus}
      className={`fixed z-30 overflow-hidden border window-shadow flex flex-col ${
        isMoving
          ? "transition-none select-none"
          : "transition-all duration-150"
      } ${maximized ? "top-12 left-4 right-4 bottom-20 w-auto h-auto" : ""}`}
      style={{
        backgroundColor: "var(--paper)",
        color: "var(--ink)",
        borderColor: active ? "var(--accent)" : "var(--border-color)",
        ...(maximized
          ? {}
          : {
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
            }),
      }}
    >
      <div
        onMouseDown={startDrag}
        className="h-11 border-b flex items-center justify-between px-3 select-none cursor-grab active:cursor-grabbing shrink-0"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--paper-deep)",
        }}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={15} />}

          <span className="font-system text-[10px] font-bold uppercase tracking-[.18em]">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMaximized}
            className="p-1.5 hover:bg-[var(--accent)] hover:text-white transition-colors"
          >
            {maximized ? (
              <Minimize2 size={13} />
            ) : (
              <Maximize2 size={13} />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[var(--accent)] hover:text-white transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        {children}
      </div>

      {!maximized && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center select-none"
        >
          <div
            className="w-2 h-2 border-r-2 border-b-2"
            style={{ borderColor: "var(--border-color)" }}
          />
        </div>
      )}
    </div>
  );
}
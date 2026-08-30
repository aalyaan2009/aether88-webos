import {
  Maximize2,
  Minimize2,
  X
} from "lucide-react";

import { useState } from "react";

export default function Window({
  title,
  icon: Icon,
  children,
  onClose,
  onFocus,
  active
}) {
  const [maximized, setMaximized] =
    useState(false);

  return (
    <div
      onMouseDown={onFocus}
      className={`
        fixed
        z-30
        overflow-hidden
        border
        bg-[var(--paper)]
        text-[var(--ink)]
        dark:bg-[#1a1a1a]
        dark:text-white
        window-shadow
        transition
        ${
          maximized
            ? "inset-14 bottom-20"
            : "left-[10%] top-[16%] w-[min(900px,80vw)] h-[min(620px,70vh)]"
        }
        ${
          active
            ? "border-[#c85a32]"
            : "border-current"
        }
      `}
    >
      <div
        className="
          h-11
          border-b
          border-current
          flex
          items-center
          justify-between
          px-3
          select-none
        "
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={15} />}

          <span
            className="
              font-system
              text-[10px]
              font-bold
              uppercase
              tracking-[.18em]
            "
          >
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setMaximized(!maximized)
            }
            className="
              p-1.5
              hover:bg-[#c85a32]
              hover:text-white
            "
          >
            {maximized ? (
              <Minimize2 size={13} />
            ) : (
              <Maximize2 size={13} />
            )}
          </button>

          <button
            onClick={onClose}
            className="
              p-1.5
              hover:bg-[#c85a32]
              hover:text-white
            "
          >
            <X size={13} />
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-44px)] overflow-auto p-5">
        {children}
      </div>
    </div>
  );
}
import { useState } from "react";

export default function Calculator() {
  const [value, setValue] = useState("");

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "%", "+",
    "C", "=",
  ];

  function calculate() {
    const exp = value.trim();

    if (!exp) {
      setValue("ERROR");
      return;
    }

    try {
      const result = Function("return " + exp)();
      setValue(String(result));
    } catch (err) {
      console.error(err);
      setValue("ERROR");
    }
  }

  function handleClick(btn) {
    if (btn === "C") {
      setValue("");
    } else if (btn === "=") {
      calculate();
    } else {
      setValue(value + btn);
    }
  }

  return (
    <div className="max-w-sm mx-auto h-full flex flex-col justify-center p-4 select-text font-sans">
      
      <div
        className="p-5 mb-4 text-right text-3xl font-mono tabular-nums min-h-[5rem] flex items-center justify-end break-all rounded-[var(--radius-md)] border transition-colors"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-subtle)",
          color: "var(--text-primary)",
        }}
      >
        <span className={value ? "opacity-100" : "opacity-40"}>
          {value || "0"}
        </span>
      </div>

      
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => {
          const isOperator = ["/", "*", "-", "+", "%"].includes(btn);
          const isClear = btn === "C";
          const isEquals = btn === "=";

          let bg = "var(--bg-surface)";
          let color = "var(--text-primary)";
          let fontWeight = "400";

          if (isEquals) {
            bg = "var(--accent)";
            color = "#ffffff";
            fontWeight = "600";
          } else if (isClear) {
            color = "var(--destructive, #ef4444)";
            fontWeight = "600";
          } else if (isOperator) {
            bg = "var(--bg-surface-hover)";
            color = "var(--accent, var(--text-primary))";
            fontWeight = "600";
          }

          return (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`p-4 text-sm rounded-[var(--radius-sm)] transition-all cursor-pointer outline-none active:scale-[0.97] ${
                isEquals || isClear ? "col-span-2" : "col-span-1"
              }`}
              style={{
                backgroundColor: bg,
                color: color,
                fontWeight: fontWeight,
              }}
              onMouseEnter={(e) => {
                if (isEquals) {
                  e.currentTarget.style.opacity = "0.9";
                } else {
                  e.currentTarget.style.backgroundColor =
                    "var(--bg-surface-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (isEquals) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.backgroundColor = "var(--accent)";
                } else if (isOperator) {
                  e.currentTarget.style.backgroundColor =
                    "var(--bg-surface-hover)";
                } else {
                  e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                }
              }}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
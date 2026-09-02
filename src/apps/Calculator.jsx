import { useState } from "react";

export default function Calculator() {
  const [value, setValue] = useState("");

  const calculate = () => {
    try {
      if (!/^[0-9+\-*/().% ]+$/.test(value)) {
        setValue("ERROR");
        return;
      }

      setValue(
        String(
          Function(`"use strict"; return (${value})`)()
        )
      );
    } catch {
      setValue("ERROR");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "%", "+",
    "C", "="
  ];

  return (
    <div className="max-w-sm mx-auto">
      <div className="border p-5 mb-3 text-right font-system text-3xl min-h-20 break-all">
        {value || "0"}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => {
              if (button === "C") {
                setValue("");
              } else if (button === "=") {
                calculate();
              } else {
                setValue(value + button);
              }
            }}
            className="border p-4 font-system hover:bg-[#c85a32] hover:text-white transition"
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}
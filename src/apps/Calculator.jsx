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

  const calculate = () => {
    let exp = value.trim();

    if (!exp) {
      setValue("ERROR");
      return;
    }

    try {
      let result = Function("return " + exp)();
      setValue(String(result));
    } catch (err) {
      console.error(err);
      setValue("ERROR");
    }
  };

  const handleButtonClick = (btn) => {
    if (btn === "C") {
      setValue("");
    } else if (btn === "=") {
      calculate();
    } else {
      setValue(value + btn);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="border p-5 mb-3 text-right font-system text-3xl min-h-20 break-all">
        {value || "0"}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className="border p-4 font-system hover:bg-[#c85a32] hover:text-white transition"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const day = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="font-system text-7xl font-black tracking-tight">
        {time}
      </div>

      <div className="mt-5 font-editorial text-2xl uppercase">
        {day}
      </div>

      <div className="mt-2 font-system text-[9px] uppercase tracking-[.25em] opacity-50">
        AETHER SYSTEM CLOCK
      </div>
    </div>
  );
}


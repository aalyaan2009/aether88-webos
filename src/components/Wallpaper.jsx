import { useEffect, useRef } from "react";

function readVar(name, fallback) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  if (value) {
    return value;
  }
  return fallback;
}

function isDarkMode() {
  const root = document.documentElement;
  return root.classList.contains("dark") || root.dataset.theme === "dark";
}

function hexToRgba(hex, alpha) {
  let clean = hex.replace("#", "");

  if (clean.length === 3) {
    clean =
      clean[0] +
      clean[0] +
      clean[1] +
      clean[1] +
      clean[2] +
      clean[2];
  }

  const n = parseInt(clean, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Wallpaper() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function render() {
      const width = canvas.width;
      const height = canvas.height;
      const dark = isDarkMode();

      ctx.clearRect(0, 0, width, height);

      const baseBg = readVar("--bg-desktop", dark ? "#202020" : "#f3efe6");
      const inkColor = readVar("--text-primary", dark ? "#f3f3f3" : "#171717");

      ctx.fillStyle = baseBg;
      ctx.fillRect(0, 0, width, height);

      
      const dotOpacity = dark ? 0.08 : 0.1;
      ctx.fillStyle = hexToRgba(inkColor, dotOpacity);
      const spacing = 24;

      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      
      ctx.fillStyle = hexToRgba(inkColor, 0.035);
      ctx.font = "900 42vh 'Playfair Display', Georgia, serif";
      ctx.textBaseline = "bottom";
      ctx.textAlign = "right";
      ctx.fillText("OS", width + width * 0.06, height + height * 0.08);
    }

    resizeCanvas();
    render();

    function handleResize() {
      resizeCanvas();
      render();
    }

    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
    />
  );
}
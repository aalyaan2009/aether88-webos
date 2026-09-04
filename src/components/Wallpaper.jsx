import { useEffect, useRef } from "react";

export default function Wallpaper({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    let animationFrame;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = (time) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background
      if (dark) {
        ctx.fillStyle = "#121212";
      } else {
        ctx.fillStyle = "#f3efe6";
      }

      ctx.fillRect(0, 0, width, height);

      // Moving grid
      const spacing = 64;
      const shift = (time * 0.01) % spacing;

      ctx.lineWidth = 1;

      if (dark) {
        ctx.strokeStyle = "rgba(255,255,255,0.035)";
      } else {
        ctx.strokeStyle = "rgba(23,23,23,0.045)";
      }

      for (let x = -spacing; x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x + shift, 0);
        ctx.lineTo(x + shift, height);
        ctx.stroke();
      }

      for (let y = -spacing; y < height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y + shift * 0.4);
        ctx.lineTo(width, y + shift * 0.4);
        ctx.stroke();
      }

      // Accent glow
      const gradient = ctx.createRadialGradient(
        width * 0.72,
        height * 0.28,
        0,
        width * 0.72,
        height * 0.28,
        420
      );

      if (dark) {
        gradient.addColorStop(0, "rgba(200,90,50,0.10)");
      } else {
        gradient.addColorStop(0, "rgba(200,90,50,0.08)");
      }

      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20"
    />
  );
}

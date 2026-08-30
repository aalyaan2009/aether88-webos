import { useEffect, useRef } from "react";

export default function Wallpaper({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    const render = (time) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const base = dark
        ? "#121212"
        : "#f3efe6";

      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      /*
        Subtle animated editorial grid.
      */

      const spacing = 64;

      ctx.lineWidth = 1;

      ctx.strokeStyle = dark
        ? "rgba(255,255,255,0.035)"
        : "rgba(23,23,23,0.045)";

      const shift =
        (time * 0.01) % spacing;

      for (
        let x = -spacing;
        x < width + spacing;
        x += spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(
          x + shift,
          0
        );

        ctx.lineTo(
          x + shift,
          height
        );

        ctx.stroke();
      }

      for (
        let y = -spacing;
        y < height + spacing;
        y += spacing
      ) {
        ctx.beginPath();

        ctx.moveTo(
          0,
          y + shift * 0.4
        );

        ctx.lineTo(
          width,
          y + shift * 0.4
        );

        ctx.stroke();
      }

      /*
        Large editorial accent.
      */

      const gradient =
        ctx.createRadialGradient(
          width * 0.72,
          height * 0.28,
          0,
          width * 0.72,
          height * 0.28,
          420
        );

      gradient.addColorStop(
        0,
        dark
          ? "rgba(200,90,50,0.10)"
          : "rgba(200,90,50,0.08)"
      );

      gradient.addColorStop(
        1,
        "transparent"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      animationFrame =
        requestAnimationFrame(render);
    };

    animationFrame =
      requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20"
    />
  );
}
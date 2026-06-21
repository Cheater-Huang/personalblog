"use client";

import { useEffect, useRef } from "react";

export default function Fireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // 萤火虫数据
    const flies = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      alpha: Math.random(),
      alphaSpeed: Math.random() * 0.02 + 0.005,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.5 ? "120, 220, 180" : "180, 230, 120",
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flies.forEach((f) => {
        // 更新位置
        f.x += f.vx;
        f.y += f.vy;

        // 边界反弹
        if (f.x < 0 || f.x > canvas.width) f.vx *= -1;
        if (f.y < 0 || f.y > canvas.height) f.vy *= -1;

        // 呼吸闪烁
        f.alpha += f.alphaSpeed * f.alphaDir;
        if (f.alpha >= 1) { f.alpha = 1; f.alphaDir = -1; }
        if (f.alpha <= 0) { f.alpha = 0; f.alphaDir = 1; }

        // 外层光晕
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 6);
        glow.addColorStop(0, `rgba(${f.color}, ${f.alpha * 0.6})`);
        glow.addColorStop(1, `rgba(${f.color}, 0)`);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // 核心亮点
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${f.color}, ${f.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
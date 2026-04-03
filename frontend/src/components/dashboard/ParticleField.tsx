import React, { useEffect, useRef } from "react";

interface ParticleFieldProps {
  className?: string;
}

const palette = ["#5f6fff", "#7e57ff", "#ff8e6e", "#69d2ff"];

const ParticleField: React.FC<ParticleFieldProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles = Array.from({ length: 42 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      size: 2 + (index % 4),
      dx: (Math.random() - 0.5) * 0.0015,
      dy: (Math.random() - 0.5) * 0.0015,
      color: palette[index % palette.length],
    }));

    let animationFrame = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x <= 0 || particle.x >= 1) particle.dx *= -1;
        if (particle.y <= 0 || particle.y >= 1) particle.dy *= -1;

        const x = particle.x * width;
        const y = particle.y * height;

        context.beginPath();
        context.fillStyle = particle.color;
        context.globalAlpha = 0.7;
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const neighbor = particles[next];
          const nx = neighbor.x * width;
          const ny = neighbor.y * height;
          const distance = Math.hypot(nx - x, ny - y);

          if (distance < 110) {
            context.beginPath();
            context.strokeStyle = particle.color;
            context.globalAlpha = 0.08;
            context.lineWidth = 1;
            context.moveTo(x, y);
            context.lineTo(nx, ny);
            context.stroke();
          }
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default ParticleField;

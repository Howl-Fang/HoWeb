import { useEffect, useRef } from "react";
import patternUrl from "../../resources/ico.svg";

interface ParticlePatternProps {
  active: boolean;
  className?: string;
}

const SPRING = 0.018;
const FRICTION = 0.855;
const REPEL_FORCE = 2.5;
const REPEL_FALLOFF = 12;
const MAX_VELOCITY = 10;
const NOISE_AMPLITUDE = 0.9;
const MAX_PARTICLES = 3000;
const CANVAS_PADDING_RATIO = 0.25;
const SAMPLE_STEPS = [3, 4, 5, 6, 8, 10];
const PARTICLE_ALPHA = 0.4;

const readParticleColor = () => {
  if (typeof window === "undefined") return `hsla(0, 0%, 50%, ${PARTICLE_ALPHA})`;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--muted-foreground")
    .trim();
  const parts = raw.split(/\s+/);

  if (parts.length >= 3) {
    return `hsla(${parts[0]}, ${parts[1]}, ${parts[2]}, ${PARTICLE_ALPHA})`;
  }
  return `hsla(0, 0%, 50%, ${PARTICLE_ALPHA})`;
};

const ParticlePattern = ({ active, className }: ParticlePatternProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canInteract = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let patternSize = 0;
    let dpr = 1;
    let color = readParticleColor();

    let image: HTMLImageElement | null = null;
    let particleCount = 0;
    let positionsX = new Float32Array(0);
    let positionsY = new Float32Array(0);
    let velocitiesX = new Float32Array(0);
    let velocitiesY = new Float32Array(0);
    let targetsX = new Float32Array(0);
    let targetsY = new Float32Array(0);
    let radii = new Float32Array(0);
    let phases = new Float32Array(0);
    let frequencies = new Float32Array(0);

    let pointerX = -1e4;
    let pointerY = -1e4;
    let pointerActive = false;

    let visible = true;
    let rafId = 0;
    let lastTime = 0;
    let elapsed = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (particleCount === 0) return;

      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < particleCount; i++) {
        const radius = radii[i];
        ctx.moveTo(positionsX[i] + radius, positionsY[i]);
        ctx.arc(positionsX[i], positionsY[i], radius, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const samplePattern = () => {
      if (!image || width <= 0 || height <= 0 || patternSize <= 0) return;

      const size = Math.floor(patternSize);
      if (size <= 0) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = size;
      offscreen.height = size;
      const offscreenCtx = offscreen.getContext("2d");
      if (!offscreenCtx) return;

      offscreenCtx.drawImage(image, 0, 0, size, size);
      const data = offscreenCtx.getImageData(0, 0, size, size).data;

      const offsetX = (width - size) / 2;
      const offsetY = (height - size) / 2;

      let pointsX: number[] = [];
      let pointsY: number[] = [];

      for (const step of SAMPLE_STEPS) {
        pointsX = [];
        pointsY = [];
        for (let y = 0; y < size; y += step) {
          for (let x = 0; x < size; x += step) {
            if (data[(y * size + x) * 4 + 3] > 64) {
              pointsX.push(offsetX + x + (Math.random() - 0.5) * step);
              pointsY.push(offsetY + y + (Math.random() - 0.5) * step);
            }
          }
        }
        if (pointsX.length <= MAX_PARTICLES) break;
      }

      if (pointsX.length > MAX_PARTICLES) {
        const stride = pointsX.length / MAX_PARTICLES;
        const pickedX: number[] = [];
        const pickedY: number[] = [];
        for (let i = 0; i < MAX_PARTICLES; i++) {
          const index = Math.floor(i * stride);
          pickedX.push(pointsX[index]);
          pickedY.push(pointsY[index]);
        }
        pointsX = pickedX;
        pointsY = pickedY;
      }

      particleCount = pointsX.length;
      positionsX = new Float32Array(particleCount);
      positionsY = new Float32Array(particleCount);
      velocitiesX = new Float32Array(particleCount);
      velocitiesY = new Float32Array(particleCount);
      targetsX = new Float32Array(particleCount);
      targetsY = new Float32Array(particleCount);
      radii = new Float32Array(particleCount);
      phases = new Float32Array(particleCount);
      frequencies = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        targetsX[i] = pointsX[i];
        targetsY[i] = pointsY[i];
        positionsX[i] = reducedMotion
          ? targetsX[i]
          : offsetX + Math.random() * size;
        positionsY[i] = reducedMotion
          ? targetsY[i]
          : offsetY + Math.random() * size;
        radii[i] = 0.7 + Math.random() * 0.6;
        phases[i] = Math.random() * Math.PI * 2;
        frequencies[i] = 0.6 + Math.random() * 0.9;
      }

      draw();
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const baseWidth = Math.max(1, rect.width);
      const baseHeight = Math.max(1, rect.height);
      patternSize = Math.min(baseWidth, baseHeight);
      const padding = Math.round(patternSize * CANVAS_PADDING_RATIO);

      width = baseWidth + padding * 2;
      height = baseHeight + padding * 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      samplePattern();
    };

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);

      const delta =
        lastTime === 0 ? 1 : Math.min(3, Math.max(0.2, (now - lastTime) / 16.667));
      lastTime = now;

      if (!visible || document.hidden) return;

      if (activeRef.current) {
        elapsed += delta * 16.667;

        for (let i = 0; i < particleCount; i++) {
          const x = positionsX[i];
          const y = positionsY[i];
          let velocityX = velocitiesX[i];
          let velocityY = velocitiesY[i];

          if (canInteract && pointerActive) {
            const dx = x - pointerX;
            const dy = y - pointerY;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq > 0.0001) {
              const distance = Math.sqrt(distanceSq);
              const falloff = 1 + distance / REPEL_FALLOFF;
              const force = (REPEL_FORCE / (falloff * falloff)) * delta;
              velocityX += (dx / distance) * force;
              velocityY += (dy / distance) * force;
            }
          }

          const noiseTime = elapsed * 0.0016 * frequencies[i];
          const noiseX = Math.sin(noiseTime + phases[i]) * NOISE_AMPLITUDE;
          const noiseY = Math.cos(noiseTime * 0.83 + phases[i] * 1.7) * NOISE_AMPLITUDE;

          velocityX += (targetsX[i] + noiseX - x) * SPRING * delta;
          velocityY += (targetsY[i] + noiseY - y) * SPRING * delta;

          velocityX = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocityX));
          velocityY = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocityY));

          const friction = Math.pow(FRICTION, delta);
          velocityX *= friction;
          velocityY *= friction;

          positionsX[i] = x + velocityX * delta;
          positionsY[i] = y + velocityY * delta;
          velocitiesX[i] = velocityX;
          velocitiesY[i] = velocityY;
        }
      }

      draw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canInteract) return;
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      pointerActive = true;
    };

    const releasePointer = () => {
      pointerActive = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      color = readParticleColor();
      if (reducedMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", releasePointer);
    document.documentElement.addEventListener("mouseleave", releasePointer);

    const load = new Image();
    load.decoding = "async";
    load.onload = () => {
      image = load;
      resize();
    };
    load.src = patternUrl;

    if (reducedMotion) {
      resize();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", releasePointer);
      document.documentElement.removeEventListener("mouseleave", releasePointer);
      load.onload = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      } ${className ?? ""}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default ParticlePattern;

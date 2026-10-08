import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
  type Easing,
  type MotionStyle,
} from "framer-motion";
import type { Translations } from "@/i18n/translations";
import { useEffect, useLayoutEffect, useRef } from "react";
import ParticlePattern from "./ParticlePattern";
import { useMediaQuery } from "@/hooks/use-media-query";
import { createPointerFilter } from "@/lib/pointer";

const ease: Easing = "easeOut";

const DEFAULT_SHADOW = { x: 0, y: 8 };
const SHADOW_RANGE = 300;
const TILT_MAX = 8;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease },
  }),
};

const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.2, staggerChildren: 0.045 } },
};

const charEntrance = { duration: 0.65, ease };

const nameChar: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: charEntrance },
};



const HeroSection = ({ t, loading }: { t: Translations; loading: boolean }) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const targetX = useMotionValue(DEFAULT_SHADOW.x);
  const targetY = useMotionValue(DEFAULT_SHADOW.y);
  const shadowX = useSpring(targetX, { stiffness: 150, damping: 20, mass: 0.5 });
  const shadowY = useSpring(targetY, { stiffness: 150, damping: 20, mass: 0.5 });

  const targetTiltX = useMotionValue(0);
  const targetTiltY = useMotionValue(0);
  const tiltX = useSpring(targetTiltX, { stiffness: 150, damping: 20, mass: 0.5 });
  const tiltY = useSpring(targetTiltY, { stiffness: 150, damping: 20, mass: 0.5 });

  // One offset, in px, for all three shadow layers; each layer scales it in
  // the text-shadow itself, so the layers stay readable as a list
  const shadowVars = {
    "--shadow-x": useTransform(shadowX, (v) => `${v}px`),
    "--shadow-y": useTransform(shadowY, (v) => `${v}px`),
  } as MotionStyle;

  useEffect(() => {
    const resetTargets = () => {
      targetX.set(DEFAULT_SHADOW.x);
      targetY.set(DEFAULT_SHADOW.y);
      targetTiltX.set(0);
      targetTiltY.set(0);
    };

    const canUsePointer = createPointerFilter();

    const handlePointerMove = (e: PointerEvent) => {
      if (!canUsePointer(e) || !nameRef.current) return;

      const rect = nameRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const overflowX = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const overflowY = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distance = Math.hypot(overflowX, overflowY);

      if (distance > SHADOW_RANGE) {
        resetTargets();
        return;
      }

      // Influence fades from 1 (on the title) to 0 (at the edge of the range)
      const influence = 1 - distance / SHADOW_RANGE;

      // Calculate relative position from the text center
      const deltaX = (e.clientX - centerX) / 10;
      const deltaY = (e.clientY - centerY) / 10;

      const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      // On the title the shadow tracks the pointer (centered at the text center),
      // off the title it settles back to the default position below the text
      targetX.set(-deltaX * influence);
      targetY.set(-deltaY * influence + DEFAULT_SHADOW.y * (1 - influence));

      // Tilt the text slightly toward the pointer
      targetTiltX.set(-ny * TILT_MAX * influence);
      targetTiltY.set(nx * TILT_MAX * influence);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetTargets);
    window.addEventListener("blur", resetTargets);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", resetTargets);
      window.removeEventListener("blur", resetTargets);
    };
  }, [targetX, targetY, targetTiltX, targetTiltY]);

  useLayoutEffect(() => {
    const element = nameRef.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;

    const fit = () => {
      element.style.fontSize = "";
      const available = parent.clientWidth;
      if (!available) return;

      const natural = element.scrollWidth;
      if (natural > available) {
        const base = parseFloat(getComputedStyle(element).fontSize);
        element.style.fontSize = `${base * (available / natural)}px`;
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    document.fonts?.ready.then(fit).catch(() => {});

    return () => observer.disconnect();
  }, [isLandscape, t.hero.name]);

  return (
    <section className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden section-padding pt-32">
      {/* Fades the hero out into the sheet that scrolls over it. It lives here,
          inside the sticky layer, rather than as an overlay on the sheet above:
          a translucent layer painted over a sticky one is composited
          separately, and Safari rasterised the gradient away, leaving the
          sheet's top edge as a hard line across whatever was behind it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-64 bg-gradient-to-t from-background/70 to-transparent"
      />
      <ParticlePattern
        active={!loading}
        className={`absolute -z-10 aspect-square translate-x-1/2 ${
          isLandscape
            ? "right-[20%] bottom-[30%] w-[min(130vh,80vw,1150px)] translate-y-1/2"
            : "right-0 top-[64%] w-[min(115vw,70vh)] -translate-y-1/2"
        }`}
      />
      <div className={`relative z-10 max-w-2xl ${isLandscape ? "" : "-top-12"}`}>
        <motion.p
          custom={0.05}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          variants={fadeUp}
          className="relative z-10 text-muted-foreground text-[clamp(1rem,2.344vw,1.125rem)] font-body tracking-wide mb-3"
        >
          {t.hero.greeting}
        </motion.p>
        <div className="relative">
          <motion.div
            ref={nameRef}
            style={{
              ...shadowVars,
              rotateX: tiltX,
              rotateY: tiltY,
              transformPerspective: 800,
            }}
            className={`hero-name relative w-fit max-w-full whitespace-nowrap font-display leading-tight mb-6 ${
              isLandscape
                ? "text-[clamp(3rem,9.375vw,6rem)]"
                : "text-[clamp(4.5rem,14.0625vw,9rem)]"
            }`}
          >
            {/* The shadow is on the heading itself rather than on a second
                layer holding a transparent copy of the glyphs. Safari painted
                nothing at all for that copy — not one pixel differed between
                having it and not — while the same declaration on the heading
                paints everywhere. One layer also means the two can no longer
                disagree about what they spell.

                Every layer blurs wider than it is offset. Offset past the
                blur means each stroke keeps a hard-edged copy of itself a few
                pixels lower, which reads as doubled type instead of a shadow.
                Blurring wide costs a little spill past the glyphs, so the
                outer layers stay faint enough that it never reads as a halo */}
            <motion.h1
              initial="hidden"
              animate={loading ? "hidden" : "visible"}
              variants={nameContainer}
              className="relative text-foreground
                         [text-shadow:var(--shadow-x)_var(--shadow-y)_12px_rgba(0,0,0,0.18),calc(var(--shadow-x)*2)_calc(var(--shadow-y)*2)_24px_rgba(0,0,0,0.1),calc(var(--shadow-x)*3)_calc(var(--shadow-y)*3)_36px_rgba(0,0,0,0.05)]
                         dark:[text-shadow:var(--shadow-x)_var(--shadow-y)_12px_rgba(255,255,255,0.2),calc(var(--shadow-x)*2)_calc(var(--shadow-y)*2)_24px_rgba(255,255,255,0.11),calc(var(--shadow-x)*3)_calc(var(--shadow-y)*3)_36px_rgba(255,255,255,0.06),var(--shadow-x)_var(--shadow-y)_8px_rgba(0,0,0,0.55)]"
            >
              {Array.from(t.hero.name).map((char, i) => (
                <motion.span key={`${char}-${i}`} variants={nameChar} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        </div>
        <motion.p
          custom={0.75}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          variants={fadeUp}
          className="relative z-10 text-[clamp(1.125rem,2.604vw,1.25rem)] text-muted-foreground font-body font-light max-w-lg leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>
        <motion.div
          custom={0.9}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          variants={fadeUp}
          className="mt-10 h-px w-24 bg-gradient-to-r from-muted-foreground/50 to-transparent"
        />
      </div>
    </section>
  );
};

export default HeroSection;

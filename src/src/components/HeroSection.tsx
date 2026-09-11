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
import { useState, useEffect, useRef } from "react";

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

const nameChar: Variants = {
  hidden: {
    opacity: 0,
    y: "0.45em",
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease },
  },
};

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const HeroSection = ({ t, loading }: { t: Translations; loading: boolean }) => {
  const [isMobile, setIsMobile] = useState(() =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
  const nameRef = useRef<HTMLDivElement>(null);

  const targetX = useMotionValue(DEFAULT_SHADOW.x);
  const targetY = useMotionValue(DEFAULT_SHADOW.y);
  const shadowX = useSpring(targetX, { stiffness: 150, damping: 20, mass: 0.5 });
  const shadowY = useSpring(targetY, { stiffness: 150, damping: 20, mass: 0.5 });

  const targetTiltX = useMotionValue(0);
  const targetTiltY = useMotionValue(0);
  const tiltX = useSpring(targetTiltX, { stiffness: 150, damping: 20, mass: 0.5 });
  const tiltY = useSpring(targetTiltY, { stiffness: 150, damping: 20, mass: 0.5 });

  const shadowX1 = useTransform(shadowX, (v) => `${v}px`);
  const shadowY1 = useTransform(shadowY, (v) => `${v}px`);
  const shadowX2 = useTransform(shadowX, (v) => `${v * 2}px`);
  const shadowY2 = useTransform(shadowY, (v) => `${v * 2}px`);
  const shadowX3 = useTransform(shadowX, (v) => `${v * 3}px`);
  const shadowY3 = useTransform(shadowY, (v) => `${v * 3}px`);

  const shadowVars = {
    "--shadow-x": shadowX1,
    "--shadow-y": shadowY1,
    "--shadow-x2": shadowX2,
    "--shadow-y2": shadowY2,
    "--shadow-x3": shadowX3,
    "--shadow-y3": shadowY3,
  } as MotionStyle;

  useEffect(() => {
    const resetTargets = () => {
      targetX.set(DEFAULT_SHADOW.x);
      targetY.set(DEFAULT_SHADOW.y);
      targetTiltX.set(0);
      targetTiltY.set(0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!nameRef.current) return;

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

      // On the title the shadow tracks the mouse (centered at the text center),
      // off the title it settles back to the default position below the text
      targetX.set(-deltaX * influence);
      targetY.set(-deltaY * influence + DEFAULT_SHADOW.y * (1 - influence));

      // Tilt the text slightly toward the mouse
      targetTiltX.set(-ny * TILT_MAX * influence);
      targetTiltY.set(nx * TILT_MAX * influence);
    };

    // Handle device orientation for mobile devices
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left to right tilt (-90 to 90)
        // beta: front to back tilt (-180 to 180)
        // Normalize to reasonable range for shadow effect
        const deltaX = (e.gamma / 90) * 30; // -30 to 30
        const deltaY = ((e.beta - 45) / 90) * 30; // Adjust for typical holding angle

        targetX.set(-deltaX);
        targetY.set(-deltaY);
      }
    };

    // Handle device motion as fallback
    const handleMotion = (e: DeviceMotionEvent) => {
      if (e.accelerationIncludingGravity) {
        const { x, y } = e.accelerationIncludingGravity;
        if (x !== null && y !== null) {
          // Use gravity to determine tilt
          // Normalize acceleration values (typically -10 to 10)
          const deltaX = (x / 10) * 30;
          const deltaY = (y / 10) * 30;

          targetX.set(-deltaX);
          targetY.set(-deltaY);
        }
      }
    };

    // Request permission for iOS 13+ devices
    const requestPermission = async () => {
      const OrientationEvent = DeviceOrientationEvent as DeviceOrientationEventWithPermission;
      if (typeof OrientationEvent.requestPermission === "function") {
        try {
          const permission = await OrientationEvent.requestPermission();
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.log("Device orientation permission denied", error);
        }
      } else {
        // Non-iOS 13+ devices
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    if (isMobile) {
      // Try to use device orientation
      if (window.DeviceOrientationEvent) {
        requestPermission();
      } else if (window.DeviceMotionEvent) {
        // Fallback to device motion
        window.addEventListener("devicemotion", handleMotion);
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", resetTargets);
      window.addEventListener("blur", resetTargets);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", resetTargets);
      window.removeEventListener("blur", resetTargets);
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [isMobile, targetX, targetY, targetTiltX, targetTiltY]);

  return (
    <section className="min-h-screen flex flex-col justify-center section-padding pt-32">
      <div className="max-w-2xl">
        <motion.p
          custom={0.05}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          variants={fadeUp}
          className="relative z-10 text-muted-foreground text-base md:text-lg font-body tracking-wide mb-3"
        >
          {t.hero.greeting}
        </motion.p>
        <motion.div
          ref={nameRef}
          style={{
            ...shadowVars,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 800,
          }}
          className="relative w-fit max-w-full text-5xl md:text-7xl lg:text-8xl font-display leading-tight mb-6"
        >
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="absolute inset-0 block text-transparent
                       [text-shadow:var(--shadow-x)_var(--shadow-y)_10px_rgba(0,0,0,0.3),var(--shadow-x2)_var(--shadow-y2)_20px_rgba(0,0,0,0.2),var(--shadow-x3)_var(--shadow-y3)_30px_rgba(0,0,0,0.1)]
                       dark:[text-shadow:var(--shadow-x)_var(--shadow-y)_10px_rgba(255,255,255,0.15),var(--shadow-x2)_var(--shadow-y2)_20px_rgba(255,255,255,0.1),var(--shadow-x3)_var(--shadow-y3)_30px_rgba(255,255,255,0.05),var(--shadow-x)_var(--shadow-y)_8px_rgba(0,0,0,0.4)]"
          >
            {t.hero.name}
          </motion.span>
          <motion.h1
            initial="hidden"
            animate={loading ? "hidden" : "visible"}
            variants={nameContainer}
            className="relative text-foreground"
          >
            {Array.from(t.hero.name).map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                variants={nameChar}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
        <motion.p
          custom={0.75}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          variants={fadeUp}
          className="relative z-10 text-lg md:text-xl text-muted-foreground font-body font-light max-w-lg leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>
        <motion.div
          custom={0.9}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          variants={fadeUp}
          className="mt-10 h-px w-16 bg-border"
        />
      </div>
    </section>
  );
};

export default HeroSection;

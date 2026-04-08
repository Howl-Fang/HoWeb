import { motion, type Variants, type Easing } from "framer-motion";
import type { Translations } from "@/i18n/translations";
import { useState, useEffect, useRef } from "react";

const ease: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.7, ease },
  }),
};

const HeroSection = ({ t }: { t: Translations }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (nameRef.current) {
        const rect = nameRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate relative position from the text center
        const deltaX = (e.clientX - centerX) / 10;
        const deltaY = (e.clientY - centerY) / 10;
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const textShadow = `
    ${-mousePosition.x}px ${-mousePosition.y}px 10px rgba(0, 0, 0, 0.3),
    ${-mousePosition.x * 2}px ${-mousePosition.y * 2}px 20px rgba(0, 0, 0, 0.2),
    ${-mousePosition.x * 3}px ${-mousePosition.y * 3}px 30px rgba(0, 0, 0, 0.1)
  `;

  return (
    <section className="min-h-screen flex flex-col justify-center section-padding pt-32">
      <div className="max-w-2xl">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-muted-foreground text-base md:text-lg font-body tracking-wide mb-3"
        >
          {t.hero.greeting}
        </motion.p>
        <motion.h1
          ref={nameRef}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-8xl font-display text-foreground leading-tight mb-6"
          style={{ textShadow }}
        >
          {t.hero.name}
        </motion.h1>
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-lg leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 h-px w-16 bg-border"
        />
      </div>
    </section>
  );
};

export default HeroSection;

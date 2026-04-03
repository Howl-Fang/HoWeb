import { motion, type Variants, type Easing } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { Translations } from "@/i18n/translations";
import { useCursorPosition } from "@/hooks/use-cursor-position";

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
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const cursorPosition = useCursorPosition();
  const [displacements, setDisplacements] = useState<{ [key: number]: { x: number; y: number } }>({});

  useEffect(() => {
    if (!nameContainerRef.current) return;

    const charElements = nameContainerRef.current.querySelectorAll("[data-char-index]");
    const newDisplacements: { [key: number]: { x: number; y: number } } = {};

    charElements.forEach((element) => {
      const charIndex = parseInt(element.getAttribute("data-char-index") || "0", 10);
      const rect = element.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      // 计算光标到字符中心的距离
      const distX = cursorPosition.x - charCenterX;
      const distY = cursorPosition.y - charCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // 设置排斥半径（光标在这个距离内会触发排斥）
      const repelRadius = 200;

      if (distance < repelRadius && distance > 0) {
        // 计算排斥方向（从光标指向字符）
        const angle = Math.atan2(-distY, -distX);

        // 根据距离计算排斥强度（距离越近，排斥越强）
        const repelStrength = (1 - distance / repelRadius) * 30;

        newDisplacements[charIndex] = {
          x: Math.cos(angle) * repelStrength,
          y: Math.sin(angle) * repelStrength,
        };
      } else {
        newDisplacements[charIndex] = { x: 0, y: 0 };
      }
    });

    setDisplacements(newDisplacements);
  }, [cursorPosition]);

  const renderNameWithCharacters = (name: string) => {
    return (
      <div ref={nameContainerRef} className="text-5xl md:text-7xl lg:text-8xl font-display text-foreground leading-tight mb-6 flex flex-wrap gap-0">
        {name.split("").map((char, index) => (
          <motion.span
            key={index}
            data-char-index={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + index * 0.05, duration: 0.7, ease }}
            style={{
              x: displacements[index]?.x || 0,
              y: displacements[index]?.y || 0,
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  };

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
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {renderNameWithCharacters(t.hero.name)}
        </motion.div>
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

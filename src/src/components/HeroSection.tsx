import { motion, type Variants, type Easing } from "framer-motion";
import type { Translations } from "@/i18n/translations";

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
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-8xl font-display text-foreground leading-tight mb-6"
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

import { motion } from "framer-motion";
import type { Translations } from "@/i18n/translations";

const AboutSection = ({ t }: { t: Translations }) => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display text-foreground mb-8"
        >
          {t.about.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-5 font-light"
        >
          {t.about.p1}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground font-body text-base md:text-lg leading-relaxed font-light"
        >
          {t.about.p2}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;

import { motion } from "framer-motion";
import type { Translations } from "@/i18n/translations";
import SectionMarker from "./SectionMarker";
import TextGround from "./TextGround";

const AboutSection = ({ t }: { t: Translations }) => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <SectionMarker index="01" />
        <TextGround className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 60px 0px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-display text-foreground"
          >
            {t.about.title}
          </motion.h2>
        </TextGround>
        <TextGround className="mb-5">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 60px 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground font-body text-base md:text-lg leading-relaxed font-light"
          >
            {t.about.p1}
          </motion.p>
        </TextGround>
        <TextGround>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 60px 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground font-body text-base md:text-lg leading-relaxed font-light"
          >
            {t.about.p2}
          </motion.p>
        </TextGround>
      </div>
    </section>
  );
};

export default AboutSection;

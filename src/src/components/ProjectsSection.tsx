import { motion } from "framer-motion";
import type { Translations } from "@/i18n/translations";

const ProjectsSection = ({ t }: { t: Translations }) => {
  return (
    <section id="projects" className="section-padding bg-card">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display text-card-foreground mb-8"
        >
          {t.projects.title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="border border-border border-dashed rounded-md p-10 md:p-16 text-center"
        >
          <p className="text-muted-foreground font-body text-lg mb-2">{t.projects.comingSoon}</p>
          <p className="text-muted-foreground/70 font-body text-sm">{t.projects.description}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { Translations } from "@/i18n/translations";

const ContactSection = ({ t }: { t: Translations }) => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display text-foreground mb-4"
        >
          {t.contact.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground font-body text-base md:text-lg font-light mb-8"
        >
          {t.contact.description}
        </motion.p>
        <motion.a
          href="mailto:hello@example.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-3 text-foreground font-body group"
        >
          <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          <span className="border-b border-border group-hover:border-foreground transition-colors duration-300">
            {t.contact.placeholder}
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default ContactSection;

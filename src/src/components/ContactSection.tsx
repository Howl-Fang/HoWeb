import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { Translations } from "@/i18n/translations";
import SectionMarker from "./SectionMarker";

const ContactSection = ({ t }: { t: Translations }) => {
  const emails = [
    { address: "Howl.Fang@outlook.com", label: t.contact.placeholder },
    { address: "me@Howl-Fang.win", label: t.contact.placeholder2 },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <SectionMarker index="03" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 60px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display text-foreground mb-4"
        >
          {t.contact.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 60px 0px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground font-body text-base md:text-lg font-light mb-8"
        >
          {t.contact.description}
        </motion.p>
        <div className="flex flex-col items-start gap-4">
          {emails.map((email, index) => (
            <motion.a
              key={email.address}
              href={`mailto:${email.address}`}
              // without this the browser starts a link drag instead of a
              // selection, which is exactly what copying the address needs
              draggable={false}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{
                duration: 0.35,
                delay: 0.08 + index * 0.06,
                ease: "easeOut",
                // the nudge answers the pointer, so it must not wait out the
                // entrance delay
                x: { duration: 0.15, delay: 0, ease: "easeOut" },
              }}
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-3 text-foreground font-body group"
            >
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              {/* the address is the one thing on the page worth copying, so it
                  opts out of the page-wide selection lock */}
              <span className="select-text border-b border-border group-hover:border-foreground transition-colors duration-300">
                {email.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

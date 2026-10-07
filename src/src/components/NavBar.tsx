import { motion } from "framer-motion";
import type { Translations } from "@/i18n/translations";

interface NavBarProps {
  t: Translations;
  locale: string;
  toggleLocale: () => void;
  activeSection?: string | null;
}

const NavBar = ({ t, locale, toggleLocale, activeSection }: NavBarProps) => {
  const links = [
    { id: "about", label: t.nav.about },
    { id: "projects", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between section-padding !py-5 bg-background/80 backdrop-blur-sm border-b border-border/50"
    >
      <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="font-display text-lg tracking-wide text-foreground">
        {t.hero.name}
      </a>
      <div className="flex items-center gap-6 md:gap-8 text-sm font-body">
        {links.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollTo(e, link.id)}
              data-active={isActive}
              className={`underline-hover transition-colors duration-300 ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          );
        })}
        <button
          onClick={toggleLocale}
          className="text-muted-foreground hover:text-foreground transition-colors duration-300 border border-border rounded-sm px-2 py-0.5 text-xs tracking-wider"
        >
          {locale === "en" ? "中文" : "EN"}
        </button>
      </div>
    </motion.nav>
  );
};

export default NavBar;

import { motion } from "framer-motion";
import type { Translations } from "@/i18n/translations";

interface NavBarProps {
  t: Translations;
  locale: string;
  toggleLocale: () => void;
}

const NavBar = ({ t, locale, toggleLocale }: NavBarProps) => {
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
      <br/>
      <div className="flex items-center gap-6 md:gap-8 text-sm font-body">
        <a href="#about" onClick={(e) => scrollTo(e, "about")} className="underline-hover text-muted-foreground hover:text-foreground transition-colors duration-300">
          {t.nav.about}
        </a>
        <a href="#projects" onClick={(e) => scrollTo(e, "projects")} className="underline-hover text-muted-foreground hover:text-foreground transition-colors duration-300">
          {t.nav.projects}
        </a>
        <a href="#contact" onClick={(e) => scrollTo(e, "contact")} className="underline-hover text-muted-foreground hover:text-foreground transition-colors duration-300">
          {t.nav.contact}
        </a>
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

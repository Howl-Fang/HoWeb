import type { Translations } from "@/i18n/translations";

const Footer = ({ t }: { t: Translations }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="section-padding !py-8 border-t border-border">
      <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-muted-foreground font-body">
        <span>© {year} {t.hero.name}</span>
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
};

export default Footer;

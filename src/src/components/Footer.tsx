import type { Translations } from "@/i18n/translations";

const Footer = ({ t }: { t: Translations }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="section-padding !py-8 border-t border-border overflow-clip">
      <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-muted-foreground font-body">
        <span className="text-bloom w-fit">© {year} {t.hero.name}</span>
        <span className="text-bloom w-fit">{t.footer.rights}</span>
      </div>
    </footer>
  );
};

export default Footer;

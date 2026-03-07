import { useLocale } from "@/i18n/useLocale";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { locale, t, toggleLocale } = useLocale();

  return (
    <div className="min-h-screen bg-background">
      <NavBar t={t} locale={locale} toggleLocale={toggleLocale} />
      <HeroSection t={t} />
      <AboutSection t={t} />
      <ProjectsSection t={t} />
      <ContactSection t={t} />
      <Footer t={t} />
    </div>
  );
};

export default Index;

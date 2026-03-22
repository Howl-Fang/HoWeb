import { useLocale } from "@/i18n/useLocale";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// const Index = () => {
//   const { locale, t, toggleLocale } = useLocale();

//   return (
//     <div className="min-h-screen bg-background">
//       <NavBar t={t} locale={locale} toggleLocale={toggleLocale} />
//       <HeroSection t={t} />
//       <AboutSection t={t} />
//       <ProjectsSection t={t} />
//       <ContactSection t={t} />
//       <Footer t={t} />
//     </div>
//   );
// };

// export default Index;


import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Index() {
  const [loading, setLoading] = useState(true);
  const { locale, t, toggleLocale } = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
          >
            {/* <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-foreground rounded-full border-t-transparent"
            /> */}
            <motion.img
              src="/favicon.ico"
              alt="Loading..."
              className="w-8 h-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {
            <div className="min-h-screen bg-background">
              <NavBar t={t} locale={locale} toggleLocale={toggleLocale} />
              <HeroSection t={t} />
              <AboutSection t={t} />
              <ProjectsSection t={t} />
              <ContactSection t={t} />
              <Footer t={t} />
            </div>
    }
    </>
  );
}

export default Index;

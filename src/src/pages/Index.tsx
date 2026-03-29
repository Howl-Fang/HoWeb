import { useLocale } from "@/i18n/useLocale";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Index() {
  const [loading, setLoading] = useState(true);
  const { locale, t, toggleLocale } = useLocale();

  useEffect(() => {
    // 最少显示时长（毫秒）
    const MIN_LOADING_TIME = 1000; // 至少 1 秒
    const MAX_LOADING_TIME = 10000; // 最多 10 秒（超时保护）

    // 记录最少加载时间的开始时刻
    const startTime = Date.now();

    const handlePageLoad = () => {
      // 计算已经过了多长时间
      const elapsedTime = Date.now() - startTime;
      
      // 如果还没达到最少显示时长，继续等待
      if (elapsedTime < MIN_LOADING_TIME) {
        const remainingTime = MIN_LOADING_TIME - elapsedTime;
        setTimeout(() => setLoading(false), remainingTime);
      } else {
        // 已经超过最少显示时长，立即隐藏
        setLoading(false);
      }
    };

    // 监听 window load 事件（页面所有资源加载完成）
    if (document.readyState === "complete") {
      // 页面已经加载，但仍然要等待最少 1 秒
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        const remainingTime = MIN_LOADING_TIME - elapsedTime;
        setTimeout(() => setLoading(false), remainingTime);
      } else {
        setLoading(false);
      }
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    // 绝对超时保护：无论如何，3 秒后一定要隐藏（防止卡顿）
    const maxTimeoutId = setTimeout(() => setLoading(false), MAX_LOADING_TIME);

    return () => {
      window.removeEventListener("load", handlePageLoad);
      clearTimeout(maxTimeoutId);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
          >
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
      <div className="min-h-screen bg-background">
        <NavBar t={t} locale={locale} toggleLocale={toggleLocale} />
        <HeroSection t={t} />
        <AboutSection t={t} />
        <ProjectsSection t={t} />
        <ContactSection t={t} />
        <Footer t={t} />
      </div>
    </>
  );
}

export default Index;

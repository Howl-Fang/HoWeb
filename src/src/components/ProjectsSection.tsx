import { motion } from "framer-motion";
import type { Translations, Locale } from "@/i18n/translations";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { useState, useEffect, useRef } from "react";

interface ProjectsSectionProps {
  t: Translations;
  locale: Locale;
}

const ProjectsSection = ({ t, locale }: ProjectsSectionProps) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [displayRow1, setDisplayRow1] = useState<typeof projects>([]);
  const [displayRow2, setDisplayRow2] = useState<typeof projects>([]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const velocityRef = useRef(0);
  const currentScrollRef = useRef(0);
  const singleRowWidthRef = useRef(0);
  const totalContentWidthRef = useRef(0);
  const lastRefillScrollRef = useRef(0);

  const gap = 24;
  const acceleration = 0.1;
  const maxVelocity = 1.5;
  const bufferThreshold = 0.7; // Refill when 70% scrolled

  // Split projects into two rows
  const row1Projects = projects.filter((_, i) => i % 2 === 0);
  const row2Projects = projects.filter((_, i) => i % 2 === 1);

  // Initialize display arrays with 2 copies
  useEffect(() => {
    setDisplayRow1([...row1Projects, ...row1Projects]);
    setDisplayRow2([...row2Projects, ...row2Projects]);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || displayRow1.length === 0) return;

    let isWidthCalculated = false;

    const animate = () => {
      if (!isHovering) {
        if (velocityRef.current < maxVelocity) {
          velocityRef.current += acceleration;
        }
      } else {
        velocityRef.current = 0;
      }

      currentScrollRef.current += velocityRef.current;

      // Calculate width on first animation frame
      if (!isWidthCalculated) {
        const cards = container.querySelectorAll('[data-carousel-card]');
        let totalWidth = 0;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.width > 0) {
            totalWidth += rect.width;
          }
        });

        if (totalWidth > 0) {
          // Calculate single row width (original projects only)
          singleRowWidthRef.current = totalWidth / 2 + (row1Projects.length - 1) * gap;
          totalContentWidthRef.current = totalWidth + (displayRow1.length - 1) * gap;
          isWidthCalculated = true;
        }
      }

      // Dynamic refill: add more cards when approaching threshold
      const singleRowWidth = singleRowWidthRef.current;
      const refillPoint = singleRowWidth * bufferThreshold;

      if (
        singleRowWidth > 0 &&
        currentScrollRef.current >= refillPoint &&
        currentScrollRef.current - lastRefillScrollRef.current > singleRowWidth * 0.5
      ) {
        // Add more cards to buffer
        setDisplayRow1((prev) => [...prev, ...row1Projects]);
        setDisplayRow2((prev) => [...prev, ...row2Projects]);
        lastRefillScrollRef.current = currentScrollRef.current;
      }

      // Soft reset: when scrolled past first set, subtract one set of width
      if (singleRowWidth > 0 && currentScrollRef.current >= singleRowWidth) {
        currentScrollRef.current -= singleRowWidth;
        lastRefillScrollRef.current -= singleRowWidth;
      }

      setTranslateX(-currentScrollRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovering, displayRow1.length, row1Projects, row2Projects]);

  return (
    <section id="projects" className="section-padding bg-card">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-display text-card-foreground mb-8 section-padding"
      >
        {t.projects.title}
      </motion.h2>

      {projects.length > 0 ? (
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Gradient overlay for smoother edges */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

          {/* 2-row carousel */}
          <div
            ref={scrollContainerRef}
            className="overflow-hidden"
          >
            <motion.div
              className="grid gap-6"
              style={{ gridTemplateRows: '1fr 1fr' }}
              animate={{ x: translateX }}
              transition={{ type: "tween", duration: 0, ease: "linear" }}
            >
              {/* Row 1 */}
              <div className="flex gap-6" style={{ gridColumn: '1 / -1' }}>
                {displayRow1.map((project, index) => {
                  const isFirstSet = index < row1Projects.length;
                  return (
                    <div
                      key={`row1-${project.id}-${index}`}
                      data-carousel-card
                      className="flex-shrink-0"
                      style={{ maxWidth: '400px' }}
                    >
                      <ProjectCard
                        project={project}
                        locale={locale}
                        index={index}
                        hoveredId={hoveredProjectId}
                        onHoverChange={setHoveredProjectId}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Row 2 */}
              <div className="flex gap-6" style={{ gridColumn: '1 / -1' }}>
                {displayRow2.map((project, index) => {
                  const isFirstSet = index < row2Projects.length;
                  return (
                    <div
                      key={`row2-${project.id}-${index}`}
                      data-carousel-card
                      className="flex-shrink-0"
                      style={{ maxWidth: '400px' }}
                    >
                      <ProjectCard
                        project={project}
                        locale={locale}
                        index={index}
                        hoveredId={hoveredProjectId}
                        onHoverChange={setHoveredProjectId}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="border border-border border-dashed rounded-md p-10 md:p-16 text-center section-padding"
        >
          <p className="text-muted-foreground font-body text-lg mb-2">
            {t.projects.comingSoon}
          </p>
          <p className="text-muted-foreground/70 font-body text-sm">
            {t.projects.description}
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;

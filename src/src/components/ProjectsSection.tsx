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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const velocityRef = useRef(0);
  const currentScrollRef = useRef(0);

  const gap = 24; // gap-6 = 1.5rem
  const acceleration = 0.1;
  const maxVelocity = 1.5;
  const deceleration = 0.95;

  // Split projects into two rows
  const row1Projects = projects.filter((_, i) => i % 2 === 0);
  const row2Projects = projects.filter((_, i) => i % 2 === 1);

  // Create multiple duplicates for seamless infinite loop (at least 3 copies)
  const duplicatedRow1 = [...row1Projects, ...row1Projects, ...row1Projects];
  const duplicatedRow2 = [...row2Projects, ...row2Projects, ...row2Projects];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Store the single row width for reset logic
    let singleRowWidth = 0;
    let isWidthCalculated = false;

    const animate = () => {
      if (!isHovering) {
        // Accelerate when not hovering
        if (velocityRef.current < maxVelocity) {
          velocityRef.current += acceleration;
        }
      } else {
        // Just stop (don't decelerate to zero, just pause)
        velocityRef.current = 0;
      }

      currentScrollRef.current += velocityRef.current;

      // Calculate width on first animation frame
      if (!isWidthCalculated) {
        const cards = container.querySelectorAll('[data-carousel-card]');
        let totalWidth = 0;
        let cardCount = 0;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.width > 0) {
            totalWidth += rect.width;
            cardCount++;
          }
        });

        // singleRowWidth = one set of original projects
        if (cardCount > 0) {
          singleRowWidth = totalWidth / 3 + (row1Projects.length - 1) * gap;
          isWidthCalculated = true;
        }
      }

      // Seamless loop: reset when we've scrolled past the first copy
      if (singleRowWidth > 0 && currentScrollRef.current >= singleRowWidth) {
        currentScrollRef.current -= singleRowWidth;
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
  }, [isHovering, row1Projects, row2Projects, gap]);

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
                {duplicatedRow1.map((project, index) => {
                  const isFirstSet = index < row1Projects.length;
                  return (
                    <div
                      key={`row1-${project.id}-${isFirstSet ? 'original' : 'duplicate'}`}
                      data-carousel-card
                      className="flex-shrink-0"
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
                {duplicatedRow2.map((project, index) => {
                  const isFirstSet = index < row2Projects.length;
                  return (
                    <div
                      key={`row2-${project.id}-${isFirstSet ? 'original' : 'duplicate'}`}
                      data-carousel-card
                      className="flex-shrink-0"
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

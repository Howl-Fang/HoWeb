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
  const scrollSpeedRef = useRef(1); // pixels per frame

  const cardWidth = 320; // Fixed card width
  const gap = 24; // gap-6 = 1.5rem
  const cardWithGap = cardWidth + gap;

  // Create duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let currentScroll = 0;
    let velocity = 0;
    const acceleration = 0.1;
    const maxVelocity = 1.5;
    const deceleration = 0.95;

    const animate = () => {
      if (isHovering) {
        // Decelerate when hovering
        velocity *= deceleration;
      } else {
        // Accelerate when not hovering
        if (velocity < maxVelocity) {
          velocity += acceleration;
        }
      }

      currentScroll += velocity;

      // Seamless loop: reset position when reaching the end
      const totalWidth = projects.length * cardWithGap;
      if (currentScroll >= totalWidth) {
        currentScroll = 0;
      }

      setTranslateX(-currentScroll);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovering, projects.length, cardWithGap]);

  return (
    <section id="projects" className="section-padding bg-card">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display text-card-foreground mb-8"
        >
          {t.projects.title}
        </motion.h2>

        {projects.length > 0 ? (
          <div 
            className="relative overflow-hidden rounded-lg"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Gradient overlay for smoother edges */}
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

            {/* Horizontal scroll container - 2 rows */}
            <div
              ref={scrollContainerRef}
              className="overflow-hidden"
            >
              <motion.div
                ref={contentRef}
                className="flex gap-6"
                animate={{ x: translateX }}
                transition={{ type: "tween", duration: 0, ease: "linear" }}
              >
                {duplicatedProjects.map((project, index) => {
                  const isFirstSet = index < projects.length;
                  const row = index % 2 === 0 ? 1 : 2;

                  return (
                    <div
                      key={`${project.id}-${isFirstSet ? 'original' : 'duplicate'}`}
                      style={{ width: cardWidth, flexShrink: 0 }}
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
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="border border-border border-dashed rounded-md p-10 md:p-16 text-center"
          >
            <p className="text-muted-foreground font-body text-lg mb-2">
              {t.projects.comingSoon}
            </p>
            <p className="text-muted-foreground/70 font-body text-sm">
              {t.projects.description}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

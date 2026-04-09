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
  const [displayItems1, setDisplayItems1] = useState<Array<{ project: typeof projects[0]; id: string }>>([]);
  const [displayItems2, setDisplayItems2] = useState<Array<{ project: typeof projects[0]; id: string }>>([]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const velocityRef = useRef(0);
  const currentScrollRef = useRef(0);
  const virtualIndexRef = useRef(0);
  const containerWidthRef = useRef(0);
  const singleRowWidthRef = useRef(0);

  const gap = 24;
  const acceleration = 0.1;
  const maxVelocity = 1.5;
  const preloadBuffer = 1.5; // Load 1.5x container width ahead

  const row1Projects = projects.filter((_, i) => i % 2 === 0);
  const row2Projects = projects.filter((_, i) => i % 2 === 1);

  // Generate display items based on virtual index and container width
  const generateDisplayItems = useCallback((
    rowProjects: typeof projects,
    startIndex: number,
    rowCount: number
  ) => {
    if (rowProjects.length === 0 || containerWidthRef.current === 0) return [];
    
    const itemsCount = Math.ceil(containerWidthRef.current * preloadBuffer / 400); // 400 is avg card width
    const items = [];
    
    for (let i = 0; i < itemsCount; i++) {
      const actualIndex = (startIndex + i) % rowProjects.length;
      const project = rowProjects[actualIndex];
      items.push({
        project,
        id: `${project.id}-${startIndex + i}`, // Unique key for each rendered position
      });
    }
    
    return items;
  }, []);

  // Initialize with first set of items
  useEffect(() => {
    setDisplayItems1(generateDisplayItems(row1Projects, 0, row1Projects.length));
    setDisplayItems2(generateDisplayItems(row2Projects, 0, row2Projects.length));
  }, [generateDisplayItems, row1Projects, row2Projects]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || displayItems1.length === 0) return;

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

      // Calculate dimensions on first frame
      if (!isWidthCalculated) {
        const cards = container.querySelectorAll('[data-carousel-card]');
        let totalWidth = 0;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.width > 0) {
            totalWidth += rect.width;
          }
        });

        if (totalWidth > 0 && displayItems1.length > 0) {
          containerWidthRef.current = container.clientWidth;
          singleRowWidthRef.current = totalWidth / displayItems1.length;
          isWidthCalculated = true;
        }
      }

      // Update virtual index based on scroll
      const singleRowWidth = singleRowWidthRef.current;
      if (singleRowWidth > 0) {
        // Calculate how many original items we've scrolled past
        const cardsScrolled = Math.floor(currentScrollRef.current / singleRowWidth);
        virtualIndexRef.current = cardsScrolled % row1Projects.length;

        // When approaching the end (70% scrolled), regenerate to maintain buffer
        if (displayItems1.length > 0) {
          const displayedWidth = displayItems1.length * singleRowWidth;
          const scrollProgress = currentScrollRef.current % displayedWidth;

          if (scrollProgress > displayedWidth * 0.7) {
            // Refill the display items from new starting position
            const newStartIndex = (virtualIndexRef.current + Math.floor(displayItems1.length * 0.5)) % row1Projects.length;
            setDisplayItems1(generateDisplayItems(row1Projects, newStartIndex, row1Projects.length));
            setDisplayItems2(generateDisplayItems(row2Projects, newStartIndex, row2Projects.length));
            
            // Soft reset: move back by the amount we've scrolled
            currentScrollRef.current = currentScrollRef.current % displayedWidth;
          }
        }
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
  }, [isHovering, displayItems1.length, row1Projects, row2Projects, generateDisplayItems]);

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
                {displayItems1.map(({ project, id }) => (
                  <div
                    key={id}
                    data-carousel-card
                    className="flex-shrink-0"
                    style={{ maxWidth: '400px' }}
                  >
                    <ProjectCard
                      project={project}
                      locale={locale}
                      index={0}
                      hoveredId={hoveredProjectId}
                      onHoverChange={setHoveredProjectId}
                    />
                  </div>
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex gap-6" style={{ gridColumn: '1 / -1' }}>
                {displayItems2.map(({ project, id }) => (
                  <div
                    key={id}
                    data-carousel-card
                    className="flex-shrink-0"
                    style={{ maxWidth: '400px' }}
                  >
                    <ProjectCard
                      project={project}
                      locale={locale}
                      index={0}
                      hoveredId={hoveredProjectId}
                      onHoverChange={setHoveredProjectId}
                    />
                  </div>
                ))}
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

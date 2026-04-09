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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Simple horizontal scroll with fixed card size
  const cardWidth = 320; // Fixed card width
  const gap = 24; // gap-6 = 1.5rem

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
          <div className="relative overflow-hidden">
            {/* Horizontal scroll container - 2 rows */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
              style={{
                scrollBehavior: 'smooth',
                scrollSnapType: 'x mandatory',
              }}
            >
              <div className="flex flex-col gap-6">
                {/* First row */}
                {projects
                  .filter((_, i) => i % 2 === 0)
                  .map((project, index) => (
                    <div key={`row1-${project.id}`} style={{ width: cardWidth }}>
                      <ProjectCard
                        project={project}
                        locale={locale}
                        index={index}
                        hoveredId={hoveredProjectId}
                        onHoverChange={setHoveredProjectId}
                      />
                    </div>
                  ))}
              </div>
              <div className="flex flex-col gap-6">
                {/* Second row */}
                {projects
                  .filter((_, i) => i % 2 === 1)
                  .map((project, index) => (
                    <div key={`row2-${project.id}`} style={{ width: cardWidth }}>
                      <ProjectCard
                        project={project}
                        locale={locale}
                        index={index}
                        hoveredId={hoveredProjectId}
                        onHoverChange={setHoveredProjectId}
                      />
                    </div>
                  ))}
              </div>
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

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
  const [columns, setColumns] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      
      if (width < 768) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute projects into columns for masonry layout
  const projectsByColumn = Array.from({ length: columns }, () => [] as typeof projects);
  projects.forEach((project, index) => {
    projectsByColumn[index % columns].push(project);
  });

  return (
    <section id="projects" className="section-padding bg-card">
      <div className="max-w-6xl mx-auto">
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
            ref={containerRef}
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {projectsByColumn.map((columnProjects, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-6">
                {columnProjects.map((project, indexInColumn) => {
                  const projectIndex = projects.findIndex(p => p.id === project.id);
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      locale={locale}
                      index={projectIndex}
                      hoveredId={hoveredProjectId}
                      onHoverChange={setHoveredProjectId}
                    />
                  );
                })}
              </div>
            ))}
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

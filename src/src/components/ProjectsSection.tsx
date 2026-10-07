import { motion } from "framer-motion";
import type { Translations, Locale } from "@/i18n/translations";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionMarker from "./SectionMarker";
import { useState, useEffect, useMemo, useRef } from "react";

interface ProjectsSectionProps {
  t: Translations;
  locale: Locale;
}

// Rough height model for balancing the columns: a card is a fixed frame plus
// the text and tags it has to wrap. Measuring instead would need a second
// layout pass and would fight the entry animations.
const estimateCardHeight = (project: Project, locale: Locale) =>
  150 + project.description[locale].length * 0.55 + project.tags.join("").length * 4;

const ProjectsSection = ({ t, locale }: ProjectsSectionProps) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [columns, setColumns] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (!gridRef.current) return;
      
      const containerWidth = gridRef.current.clientWidth;
      const gap = 24; // gap-6 = 1.5rem = 24px
      const minCardWidth = 280; // Minimum card width
      
      // Calculate how many columns can fit
      let cols = Math.floor((containerWidth + gap) / (minCardWidth + gap));
      cols = Math.max(1, Math.min(cols, 3)); // Clamp between 1 and 3
      
      setColumns(cols);
    };

    // Use ResizeObserver for better responsiveness
    const resizeObserver = new ResizeObserver(updateColumns);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    updateColumns();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Distribute projects into columns for the masonry layout. Round-robin
  // (index % columns) looked balanced but left the columns very different
  // heights once cards had different amounts of text, so send each card to
  // whichever column is currently shortest.
  const projectsByColumn = useMemo(() => {
    const buckets = Array.from(
      { length: columns },
      () => [] as { project: Project; index: number }[]
    );
    const heights = new Array(columns).fill(0) as number[];

    projects.forEach((project, index) => {
      const shortest = heights.indexOf(Math.min(...heights));
      buckets[shortest].push({ project, index });
      heights[shortest] += estimateCardHeight(project, locale);
    });

    return buckets;
  }, [columns, locale]);

  return (
    <section id="projects" className="section-padding bg-card">
      <div className="max-w-3xl mx-auto">
        <SectionMarker index="02" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 60px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display text-card-foreground mb-8"
        >
          {t.projects.title}
        </motion.h2>

        {projects.length > 0 ? (
          <div
            ref={gridRef}
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {projectsByColumn.map((columnProjects, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-6">
                {columnProjects.map(({ project, index }) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    locale={locale}
                    index={index}
                    hoveredId={hoveredProjectId}
                    onHoverChange={setHoveredProjectId}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 60px 0px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="border border-border border-dashed rounded-md p-10 md:p-16 text-center"
          >
            <p className="text-muted-foreground font-body text-lg mb-2">
              {t.projects.comingSoon}
            </p>
            <p className="text-muted-foreground font-body text-sm">
              {t.projects.description}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

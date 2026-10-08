import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/translations";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  index: number;
  hoveredId: string | null;
  onHoverChange: (id: string | null) => void;
}

const ProjectCard = ({ project, locale, index, hoveredId, onHoverChange }: ProjectCardProps) => {
  const title = project.title[locale];
  const description = project.description[locale];
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== project.id;

  return (
    // Entrance and hover sit on separate elements: sharing one meant the hover
    // lift waited out the entrance stagger, and lifted the card twice over
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      // start the reveal well before the card reaches the screen: at reading
      // speed the 320px of travel covers most of the animation, so the card is
      // already there by the time it is looked at
      viewport={{ once: true, margin: "0px 0px 320px 0px" }}
      onMouseEnter={() => onHoverChange(project.id)}
      onMouseLeave={() => onHoverChange(null)}
      className="relative group"
      transition={{
        duration: 0.35,
        ease: "easeOut",
        // cap the cascade so the last card never lags far behind the first
        delay: Math.min(index * 0.03, 0.12),
      }}
    >
      {/* 卡片容器 */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          opacity: isOtherHovered ? 0.6 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="relative border border-border rounded-lg p-6 bg-card/60 backdrop-blur-md z-10"
      >
        {/* 头部：标题和标签 */}
        <div className="mb-4">
          <h3
            className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isHovered ? "text-primary" : "text-card-foreground"
            }`}
          >
            {title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 描述 */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* 操作按钮 */}
        <div className="flex gap-3 justify-start">
          {project.github && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {/* {locale === "zh" ? "源代码" : "GitHub"} */}
                  {"GitHub"}
                </span>
              </a>
            </Button>
          )}
          {project.demo && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="gap-2"
            >
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {locale === "zh" ? "预览" : "Demo"}
                </span>
              </a>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;

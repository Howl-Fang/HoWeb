import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  locale: "en" | "zh";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => onHoverChange(project.id)}
      onMouseLeave={() => onHoverChange(null)}
      className="relative group"
      animate={{
        y: isHovered ? -8 : 0,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
        delay: index * 0.05,
      }}
    >
      {/* 卡片容器 */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          opacity: isOtherHovered ? 0.4 : 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="relative border border-border rounded-lg p-6 bg-card/50 backdrop-blur-sm z-10"
      >
        {/* 头部：标题和标签 */}
        <div className="mb-4">
          <motion.h3
            animate={{
              color: isHovered ? "hsl(var(--primary))" : "hsl(var(--card-foreground))",
            }}
            transition={{ duration: 0.25 }}
            className="text-xl font-semibold mb-3"
          >
            {title}
          </motion.h3>
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
                  {locale === "zh" ? "源代码" : "GitHub"}
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

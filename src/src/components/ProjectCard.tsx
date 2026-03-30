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
      {/* SVG 流动渐变边框 - 同步浮起和动画 */}
      <motion.svg
        width="100%"
        height="100%"
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.25s ease-out",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <defs>
          {/* 流动渐变线条 Pattern - 黑→灰→白→灰→黑 */}
          <pattern
            id="flow-gradient"
            x="0"
            y="0"
            width="40"
            height="100%"
            patternUnits="userSpaceOnUse"
          >
            {/* 黑 */}
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#000" strokeWidth="1" />
            {/* 黑→灰 过渡 */}
            <line x1="5" y1="0" x2="5" y2="100%" stroke="#333" strokeWidth="1" />
            <line x1="10" y1="0" x2="10" y2="100%" stroke="#666" strokeWidth="1" />
            {/* 灰→白 过渡 */}
            <line x1="15" y1="0" x2="15" y2="100%" stroke="#999" strokeWidth="1" />
            <line x1="18" y1="0" x2="18" y2="100%" stroke="#bbb" strokeWidth="1" />
            <line x1="20" y1="0" x2="20" y2="100%" stroke="#fff" strokeWidth="1" />
            {/* 白→灰 过渡 */}
            <line x1="22" y1="0" x2="22" y2="100%" stroke="#bbb" strokeWidth="1" />
            <line x1="25" y1="0" x2="25" y2="100%" stroke="#999" strokeWidth="1" />
            {/* 灰→黑 过渡 */}
            <line x1="30" y1="0" x2="30" y2="100%" stroke="#666" strokeWidth="1" />
            <line x1="35" y1="0" x2="35" y2="100%" stroke="#333" strokeWidth="1" />
          </pattern>
        </defs>

        {/* 顶部边框 */}
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="url(#flow-gradient)"
          strokeWidth="2"
          strokeDasharray="40 40"
          initial={{ strokeDashoffset: 0 }}
          animate={isHovered ? {
            strokeDashoffset: [0, -40, -40],
          } : {
            strokeDashoffset: 0,
          }}
          transition={isHovered ? {
            duration: 2,
            times: [0, 0.3, 1],
            ease: [
              [0.34, 1.56, 0.64, 1],  // 弹性快速开始
              [0.25, 0.46, 0.45, 0.94], // 平滑减速到缓慢
            ],
            repeat: Infinity,
            repeatType: "loop",
          } : {
            duration: 0.25,
          }}
        />

        {/* 右边框 */}
        <motion.line
          x1="99"
          y1="1"
          x2="99"
          y2="100"
          stroke="url(#flow-gradient)"
          strokeWidth="2"
          strokeDasharray="40 40"
          initial={{ strokeDashoffset: 0 }}
          animate={isHovered ? {
            strokeDashoffset: [0, -40, -40],
          } : {
            strokeDashoffset: 0,
          }}
          transition={isHovered ? {
            duration: 2,
            times: [0, 0.3, 1],
            ease: [
              [0.34, 1.56, 0.64, 1],
              [0.25, 0.46, 0.45, 0.94],
            ],
            repeat: Infinity,
            repeatType: "loop",
          } : {
            duration: 0.25,
          }}
        />

        {/* 底部边框 */}
        <motion.line
          x1="100"
          y1="99"
          x2="0"
          y2="99"
          stroke="url(#flow-gradient)"
          strokeWidth="2"
          strokeDasharray="40 40"
          initial={{ strokeDashoffset: 0 }}
          animate={isHovered ? {
            strokeDashoffset: [0, -40, -40],
          } : {
            strokeDashoffset: 0,
          }}
          transition={isHovered ? {
            duration: 2,
            times: [0, 0.3, 1],
            ease: [
              [0.34, 1.56, 0.64, 1],
              [0.25, 0.46, 0.45, 0.94],
            ],
            repeat: Infinity,
            repeatType: "loop",
          } : {
            duration: 0.25,
          }}
        />

        {/* 左边框 */}
        <motion.line
          x1="1"
          y1="100"
          x2="1"
          y2="1"
          stroke="url(#flow-gradient)"
          strokeWidth="2"
          strokeDasharray="40 40"
          initial={{ strokeDashoffset: 0 }}
          animate={isHovered ? {
            strokeDashoffset: [0, -40, -40],
          } : {
            strokeDashoffset: 0,
          }}
          transition={isHovered ? {
            duration: 2,
            times: [0, 0.3, 1],
            ease: [
              [0.34, 1.56, 0.64, 1],
              [0.25, 0.46, 0.45, 0.94],
            ],
            repeat: Infinity,
            repeatType: "loop",
          } : {
            duration: 0.25,
          }}
        />
      </motion.svg>

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

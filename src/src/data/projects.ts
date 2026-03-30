export interface Project {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: {
      en: "HoWeb",
      zh: "HoWeb",
    },
    description: {
      en: "A modern personal website built with React, TypeScript, and Tailwind CSS. Features responsive design, dark mode support, and multi-language internationalization.",
      zh: "使用 React、TypeScript 和 Tailwind CSS 构建的现代个人网站。具有响应式设计、深色模式支持和多语言国际化功能。",
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/Howl-Fang/HoWeb",
    demo: "https://Howl-Fang.win",
  },
  {
    id: "project-2",
    title: {
      en: "Project Template",
      zh: "项目模板",
    },
    description: {
      en: "A reusable project template with best practices for modern web development.",
      zh: "一个包含现代网页开发最佳实践的可重用项目模板。",
    },
    tags: ["Template", "Starter"],
    github: "#",
  },
  {
    id: "project-3",
    title: {
      en: "Coming Soon",
      zh: "敬请期待",
    },
    description: {
      en: "More exciting projects are under development.",
      zh: "更多激动人心的项目正在开发中。",
    },
    tags: ["WIP"],
  },
];

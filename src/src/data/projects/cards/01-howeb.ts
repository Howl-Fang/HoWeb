import type { Project } from "../types";

export default {
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
  // github: "https://github.com/Howl-Fang/HoWeb",
  demo: "https://Howl-Fang.github.io",
  image: "https://avatars.githubusercontent.com/u/69738986?v=4",
} satisfies Project;

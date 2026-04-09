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
    id: "project-4",
    title: {
      en: "Disable AWDL",
      zh: "禁用 AWDL",
    },
    description: {
      en: "Disables AWDL to optimize moonlight performance on macOS. This tool is designed to improve the performance of Moonlight streaming by disabling the Apple Wireless Direct Link (AWDL) protocol, which can interfere with network performance.",
      zh: "禁用 AWDL 以优化 macOS 上的 Moonlight 性能。该工具旨在通过禁用 Apple Wireless Direct Link (AWDL) 协议来提高 Moonlight 流媒体的性能，该协议可能会干扰网络性能。",
    },
    tags: ["Shell Script", "macOS"],
    github: "https://github.com/Howl-Fang/Disable-AWDL-for-Moonlight-Streaming-on-Mac",
  },
  {
    id: "project-5",
    title: {
      en: "COMP2012H",
      zh: "COMP2012H",
    },
    description: {
      en: "Course COMP2012H, OOP of C++",
      zh: "课程 COMP2012H，C++ 面向对象编程",
    },
    tags: ["C++", "OOP"],
    github: "https://github.com/Howl-Fang/COMP2012H",
  },
  {
    id: "project-6",
    title: {
      en: "Mix-m4s-from-bilibili-cache",
      zh: "从 B 站缓存混合 m4s",
    },
    description: {
      en: "A tool to merge m4s files from Bilibili cache into a single video file.",
      zh: "一个将 B 站缓存中的 m4s 文件合并成单个视频文件的工具。",
    },
    tags: ["Python", "Bilibili"],
    github: "https://github.com/Howl-Fang/Mix-m4s-from-bilibili-cache",
  },
  {
    id: "project-1000",
    title: {
      en: "Coming Soon",
      zh: "敬请期待",
    },
    description: {
      en: "More exciting projects are under development.",
      zh: "更多激动人心的项目正在开发中。",
    },
    tags: ["TODO"],
  },
];

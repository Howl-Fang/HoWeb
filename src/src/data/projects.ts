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
    // github: "https://github.com/Howl-Fang/HoWeb",
    demo: "https://Howl-Fang.github.io",
    image: "https://avatars.githubusercontent.com/u/69738986?v=4",
  },
  {
    id: "project-2",
    title: {
      en: "Notes Set",
      zh: "笔记集",
    },
    description: {
      en: "A collection of notes and resources on various topics",
      zh: "关于各种主题的笔记和资源集合",
    },
    tags: ["Markdown"],
    github: "https://github.com/Howl-Fang/Notes_set",

  },
  {
    id: "project-3",
    title: {
      en: "Pathology-Image-Classification",
      zh: "病理图像分类",
    },
    description: {
      en: "A project for classifying pathology images using deep learning techniques. Using Virchow2 and MIL.",
      zh: "一个使用深度学习技术对病理图像进行分类的项目。使用 Virchow2 和 MIL。",
    },
    tags: ["Python", "Deep Learning", "Computer Vision"],
    github: "https://github.com/Howl-Fang/Pathology-Image-Classifications",
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
    id: "project-10",
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
    id: "project-11",
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
      en: "More exciting projects are under development. Stay tuned at my GitHub.",
      zh: "更多激动人心的项目正在开发中。关注我的 GitHub。",
    },
    tags: [],
    github: "https://github.com/Howl-Fang"
  },
];

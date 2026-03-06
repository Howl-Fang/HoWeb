export type Locale = "en" | "zh";

const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Your Name",
      tagline: "Designer & Developer crafting thoughtful digital experiences.",
    },
    about: {
      title: "About",
      p1: "I believe in the power of simplicity. With a background in design and engineering, I build things that feel intuitive and look beautiful.",
      p2: "Currently exploring the intersection of creativity and technology — always learning, always making.",
    },
    projects: {
      title: "Projects",
      comingSoon: "New works coming soon.",
      description: "This space is reserved for upcoming projects. Stay tuned.",
    },
    contact: {
      title: "Get in Touch",
      description: "Feel free to reach out for collaborations or just a friendly hello.",
      email: "Email",
      placeholder: "hello@example.com",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  zh: {
    nav: {
      about: "关于",
      projects: "项目",
      contact: "联系",
    },
    hero: {
      greeting: "你好，我是",
      name: "你的名字",
      tagline: "设计师与开发者，专注于打造精心设计的数字体验。",
    },
    about: {
      title: "关于我",
      p1: "我相信简约的力量。凭借设计与工程的双重背景，我构建直觉且美观的事物。",
      p2: "目前正在探索创意与技术的交汇处——不断学习，不断创造。",
    },
    projects: {
      title: "项目",
      comingSoon: "新作品即将推出。",
      description: "此空间为即将到来的项目预留，敬请期待。",
    },
    contact: {
      title: "联系我",
      description: "欢迎就合作或任何事情与我联系。",
      email: "邮箱",
      placeholder: "hello@example.com",
    },
    footer: {
      rights: "保留所有权利。",
    },
  },
};

export type Translations = typeof translations.en;

export default translations;

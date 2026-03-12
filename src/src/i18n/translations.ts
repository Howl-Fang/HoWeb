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
      name: "Howl Fang",
      tagline: "Soul Traveler",
    },
    about: {
      title: "About",
      p1: "My life is in a continuous \"beta version.\"",
      p2: "I define no boundaries.",
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
      placeholder: "Howl.Fang@outlook.com",
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
      name: "汤圆圆",
      tagline: "灵魂行者",
    },
    about: {
      title: "关于我",
      p1: "开发生活的新方向",
      p2: "不定义边界",
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
      placeholder: "Howl.Fang@outlook.com",
    },
    footer: {
      rights: "保留所有权利。",
    },
  },
};

export type Translations = typeof translations.en;

export default translations;

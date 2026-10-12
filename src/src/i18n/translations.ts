export type Locale = "en" | "zh";

const translations = {
  en: {
    head: {
      title: "Howl Fang",
      description: "Howl Fang — engineering with an eye for design",
    },
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Howl Fang",
      tagline: "Engineering with an eye for design",
    },
    about: {
      title: "About",
      p1: "I build software end to end — the systems behind it and the surface you touch.",
      p2: "My life is in a continuous \"beta version.\"",
    },
    projects: {
      title: "Projects",
      comingSoon: "Coming soon.",
      description: "This space is reserved for upcoming projects. Stay tuned.",
    },
    contact: {
      title: "Get in Touch",
      description: "Questions, collaboration, or just a chat — all welcome.",
      email: "Email",
      placeholder: "Howl.Fang@outlook.com",
      placeholder2: "me@Howl-Fang.win",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  zh: {
    head: {
      title: "汤圆圆",
      description: "汤圆圆 —— 工程，也讲究设计",
    },
    nav: {
      about: "关于",
      projects: "项目",
      contact: "联系",
    },
    hero: {
      greeting: "你好，我是",
      name: "汤圆圆",
      tagline: "工程，也讲究设计",
    },
    about: {
      title: "关于我",
      p1: "我做完整的软件：背后的系统，和你碰到的那一层。",
      p2: "我的人生一直处于 beta 版本。",
    },
    projects: {
      title: "项目",
      comingSoon: "快来了",
      description: "此空间为即将到来的项目预留，敬请期待。",
    },
    contact: {
      title: "联系我",
      description: "欢迎来访，合作、咨询亦或闲聊",
      email: "邮箱",
      placeholder: "Howl.Fang@outlook.com",
      placeholder2: "me@Howl-Fang.win",
    },
    footer: {
      rights: "保留所有权利",
    },
  },
};

export type Translations = typeof translations.en;

export default translations;

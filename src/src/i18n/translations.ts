export type Locale = "en" | "zh";

const translations = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, Here's",
      name: "Howl Fang",
      tagline: "Soul Traveler",
    },
    about: {
      title: "About",
      p1: "We let our little boat drift where it would, over the thousand acres of watery waste.",
      // p1: "My life is in a continuous \"beta version.\"",
      p2: "My life is in a continuous \"beta version.\"",
    },
    projects: {
      title: "Projects",
      comingSoon: "Coming soon.",
      description: "This space is reserved for upcoming projects. Stay tuned.",
    },
    contact: {
      title: "Get in Touch",
      description: "Be free to reach me. Query, collaboration or just chat are welcomed",
      email: "Email",
      placeholder: "Howl.Fang@outlook.com",
      placeholder2: "me@Howl-Fang.win",
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
      p1: "纵一苇之所如，凌万顷之茫然。",
      p2: "开发生活的新方向",
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

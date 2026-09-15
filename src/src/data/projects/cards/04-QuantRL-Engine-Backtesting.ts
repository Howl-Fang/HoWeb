import type { Project } from "../types";

export default {
  id: "project-4",
  title: {
    en: "QuantRL-Engine",
    zh: "QuantRL-Engine",
  },
  description: {
    en: "A realistic, cost-aware daily backtesting system utilizing PPO and Attention-based reinforcement learning for trading.",
    zh: "基于真实交易成本与无未来函数回测，探索 PPO 强化学习智能体的日线择时系统。"
  },
  tags: ["Backtesting", "Reinforcement Learning (PPO)", "Attention Mechanism", "Turnover Control"],
  github: "https://github.com/Howl-Fang/Backtesting-Engine",
  // demo: "https://Howl-Fang.github.io",
  image: "https://avatars.githubusercontent.com/u/69738986?v=4",
} satisfies Project;

import type { Project } from "../types";

export default {
  id: "project-awdl",
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
} satisfies Project;

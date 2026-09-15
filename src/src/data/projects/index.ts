import type { Project } from "./types";

export type { Project } from "./types";

const modules = import.meta.glob<{ default: Project | Project[] }>("./cards/*.ts", {
  eager: true,
});

export const projects: Project[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .flatMap(([, module]) =>
    Array.isArray(module.default) ? module.default : [module.default]
  );

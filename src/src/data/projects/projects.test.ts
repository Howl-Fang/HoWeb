import { describe, it, expect } from "vitest";
import { projects } from "./index";

describe("projects data", () => {
  it("loads the card files", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("gives every project a unique id", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ships a title and description in both languages", () => {
    for (const project of projects) {
      for (const locale of ["en", "zh"] as const) {
        expect(project.title[locale].trim(), `${project.id} title.${locale}`).not.toBe("");
        expect(
          project.description[locale].trim(),
          `${project.id} description.${locale}`
        ).not.toBe("");
      }
    }
  });

  it("orders cards by file name with digits counted as numbers", () => {
    // card files are prefixed 01-, 02-, ... 100-, and the glob is sorted with
    // numeric collation, so 100- comes last even though "100" < "11" as text
    expect(projects[0].id).toBe("project-1");
    expect(projects[projects.length - 1].id).toBe("project-1000");
  });
});

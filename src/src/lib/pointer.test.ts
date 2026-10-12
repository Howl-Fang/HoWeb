import { describe, it, expect, afterEach, vi } from "vitest";
import { createPointerFilter } from "./pointer";

const event = (pointerType: string) => ({ pointerType }) as PointerEvent;

const withFinePointer = () =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("pointer: fine"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

describe("createPointerFilter", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("accepts a mouse and a pen, and rejects touch", () => {
    const canUsePointer = createPointerFilter();

    expect(canUsePointer(event("mouse"))).toBe(true);
    expect(canUsePointer(event("pen"))).toBe(true);
    expect(canUsePointer(event("touch"))).toBe(false);
  });

  it("falls back to the pointer capability when the type is unknown", () => {
    // the global stub reports matches: false, so an unclassified pointer is
    // treated as one that cannot hover
    expect(createPointerFilter()(event(""))).toBe(false);

    withFinePointer();
    expect(createPointerFilter()(event(""))).toBe(true);
  });
});

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLocale } from "./useLocale";

const setBrowserLanguage = (language: string) =>
  Object.defineProperty(window.navigator, "language", { value: language, configurable: true });

describe("useLocale", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setBrowserLanguage("en-US");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("falls back to the browser language", () => {
    setBrowserLanguage("zh-CN");
    const { result } = renderHook(() => useLocale());

    expect(result.current.locale).toBe("zh");
    expect(result.current.t.hero.name).toBe("汤圆圆");
  });

  it("prefers a stored choice over the browser language", () => {
    window.localStorage.setItem("howeb-locale", "en");
    setBrowserLanguage("zh-CN");

    const { result } = renderHook(() => useLocale());

    expect(result.current.locale).toBe("en");
  });

  it("ignores a stored value that is not a known locale", () => {
    window.localStorage.setItem("howeb-locale", "de");

    const { result } = renderHook(() => useLocale());

    expect(result.current.locale).toBe("en");
  });

  it("still works when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });

    const { result } = renderHook(() => useLocale());

    expect(result.current.locale).toBe("en");
  });

  it("switching language persists the choice and syncs the document", () => {
    const { result } = renderHook(() => useLocale());

    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe("Howl Fang");

    act(() => result.current.toggleLocale());

    expect(result.current.locale).toBe("zh");
    expect(window.localStorage.getItem("howeb-locale")).toBe("zh");
    expect(document.documentElement.lang).toBe("zh-CN");
    expect(document.title).toBe("汤圆圆");
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Index from "./Index";

describe("Index", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "language", {
      value: "en-US",
      configurable: true,
    });
  });

  it("renders the hero and every section heading", () => {
    render(<Index />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Howl Fang");
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Get in Touch" })).toBeInTheDocument();
  });

  it("renders a card per project", () => {
    render(<Index />);

    // every project card links out to at least one destination
    expect(screen.getAllByRole("link", { name: /GitHub|Demo|预览/ }).length).toBeGreaterThan(0);
  });

  it("switches the whole page to Chinese from the nav toggle", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: "中文" }));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("汤圆圆");
    expect(screen.getByRole("heading", { name: "关于我" })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("zh-CN");
    expect(document.title).toBe("汤圆圆");
  });
});

import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom has neither observer; the components only use them for layout and
// visibility bookkeeping, so a no-op that never fires keeps rendering safe
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: ObserverStub,
});

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: ObserverStub,
});

// Without the canvas package jsdom throws a "not implemented" error; the
// particle layer already treats a missing context as "nothing to draw"
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  writable: true,
  value: () => null,
});

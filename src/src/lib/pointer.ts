/**
 * Filter for pointer events that come from a pointer able to hover.
 *
 * A browser that cannot classify a pointer reports an empty pointerType, so
 * those events fall back to the capability media query rather than being
 * treated as touch.
 */
export const createPointerFilter = () => {
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

  return (event: PointerEvent) => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") return true;
    if (event.pointerType === "touch") return false;
    return supportsFinePointer;
  };
};

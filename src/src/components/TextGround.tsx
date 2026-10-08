import type { ReactNode } from "react";

/**
 * Wraps a block of copy that needs a ground behind it.
 *
 * The ground is a pseudo-element of this wrapper, and the wrapper never
 * animates — which is the point. Opacity on an element applies to its
 * pseudo-elements too, so while copy faded in on the sheet, its ground was
 * see-through for the same 0.6s and the pinned hero showed through the lower
 * half of whatever the ground was supposed to be hiding. The ground arrives
 * whole; only the words fade.
 */
const TextGround = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={`text-bloom w-fit ${className}`}>{children}</div>
);

export default TextGround;

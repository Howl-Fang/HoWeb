import { useEffect, useState } from "react";

/**
 * Reports which of the given section ids currently crosses the middle band of
 * the viewport. `ids` must be referentially stable (a module constant), or the
 * observer is rebuilt on every render.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // document order, so a tall section settling into the band wins
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      // the band excludes the top and bottom thirds, so only the section being
      // read counts as current rather than every section on screen
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

---
name: webkit-shot
description: Render the running dev server in real WebKit — Safari's engine — and save a screenshot. Use only when the user asks for a Safari check or a Safari-only rendering bug is being chased.
---

# webkit-shot

Safari-only bugs (a shadow that does not paint, filters, compositing of pinned
layers) cannot be reproduced in Chromium, and Playwright's WebKit build does
not launch on this machine — it dies with `Bus error: 10`. This drives the
*system* WebKit through WKWebView instead: the same engine as Safari, with
nothing to download. It needs `swiftc`, which is already present.

**Run it when the user asks for a Safari check, and when a Safari-only report
needs a second opinion** — it has already caught one real bug (a shadow layer
that painted nothing) and cleared a false lead. It is not part of the routine
fix → verify loop.

## Build and run

```bash
cd .claude/skills/webkit-shot
swiftc -O shot.swift -o shot                    # once, ~20s

# shot <url> <out.png> <w> <h> [scrollY] [dark|light] [cssFile]
./shot http://localhost:8080/ /tmp/hero.png 1440 900 0 dark
./shot http://localhost:8080/ /tmp/hero.png 1440 900 480 dark override.css
```

Start the dev server first (`cd src && npm run dev`, serves on 8080).

The optional `cssFile` is injected as a `<style>` after load — that is how to
A/B a declaration: hide the element under test and diff the two captures, or
freeze the moving parts (`canvas{visibility:hidden !important}`) so a diff is
not swamped by the particle field.

Set `PROBE='JSON.stringify(...)'` to print a JS expression evaluated just
before the snapshot — computed styles, element rects, `scrollY`. Prefer this
over reading pixels when the question is "did the browser get the right
value".

## Reading a result

The PNG comes out at the window's backing scale (2x on Retina). The capture is
a viewport, not the whole page: scroll with the `scrollY` argument.

Comparing two captures: diff them in Python (`numpy` and `PIL` are installed).
A diff of exactly zero is a strong result — e.g. it proved that Safari painted
nothing for a `color: transparent` shadow layer, since hiding its shadow
changed not one pixel, while the same declaration on the heading moved 110k
pixels.

## What this engine does and does not tell you

Same engine as Safari, but headless and never attached to a visible window, so
its compositing of pinned and translucent layers can still differ from
Safari.app. Treat "reproduces here" as proof and "does not reproduce here" as
a hint, not a refutation — check with the user before calling a Safari bug
fixed.

Behaviour established in this build:

- a second layer holding a `color: transparent` copy of the glyphs painted
  nothing, even though its computed `text-shadow` was correct; the same
  declaration on the `<h1>` paints (see `HeroSection`)
- `overflow-x: clip` on an ancestor changes no pixel of the output, and the
  ramp outside that box keeps painting — yet Safari.app drops exactly that
  ramp, and Firefox draws it as the spec says. So this engine cannot settle
  clipping questions: it follows the spec where the Safari bug lives outside
  it. Take the user's report as the measurement in those cases
- `filter: blur()` paints normally, including its spill past the element box
- a tint of the background colour over a flat background is invisible by
  construction: to test a gradient like the one above the sheet, the thing
  behind it has to be visible, so do not hide the particle canvas first

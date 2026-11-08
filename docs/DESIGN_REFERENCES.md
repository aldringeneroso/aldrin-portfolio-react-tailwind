# Design references

The portfolio adapts existing published designs and interaction patterns rather than claiming an original design system.

## Existing designs used

- **Featured work:** [Brittany Chiang's v4 featured-project component](https://github.com/bchiang7/v4/blob/master/src/components/sections/featured.js). The alternating image/content arrangement, technology lists, and source links are adapted to this React/Vite project. Separate, equal-width columns replace the overlapping panels so titles and descriptions remain clear of the screenshots. Text, tags, and links align left. The screenshots remain fully colored and the mobile composition stacks images above text. The MIT license is preserved in `licenses/brittany-chiang-MIT.txt`.
- **Motion direction:** [Joffrey Spitzer's minimalist portfolio breakdown on Codrops](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/). The reference informs the restrained staggered text/image reveals and typography-first composition. No third-party personal content or project assets are copied.
- **Resume:** [Jake Gutierrez's Resume](https://github.com/jakegut/resume). The single-column hierarchy, section rules, dated education rows, technical-skill groups, and linked project titles are adapted with ReportLab. The MIT license is preserved in `licenses/jake-resume-MIT.txt`.

## Interface libraries

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): scoped hero entrance, scroll-triggered section reveals, project-image scrub, and page progress. Cleanup reverts animations and triggers on unmount. `prefers-reduced-motion` disables these effects.
- [Pretext](https://github.com/chenglou/pretext): its documented preparation and line-layout APIs balance headings after the correct fonts load. Text is visible before enhancement, stays selectable, and has a single accessible text equivalent. ResizeObserver recalculates line layout. The library is loaded in a separate chunk.
- **Icons:** [Font Awesome's self-hosted webfont approach](https://docs.fontawesome.com/web/setup/host-yourself/webfonts) supplies solid action icons and brand logos using local WOFF2 files. Font Awesome's font license and attribution remain in `public/assets/icons/LICENSE.txt`.

## Assets and attribution

The portrait and project screenshots are stored in `public/assets/` and retain their original colors in both themes. The résumé is built from portfolio content using `scripts/build-resume.py`.

The contact email adapts [Lee Munroe's responsive HTML email template](https://github.com/leemunroe/responsive-html-email-template); its license is kept in `emails/LICENSE.txt`. README link badges use [Shields.io](https://shields.io/badges/static-badge). SVG badge images are limited to the README; the portfolio uses font icons.

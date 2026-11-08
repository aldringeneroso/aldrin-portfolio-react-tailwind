# Design references and implementation

The portfolio adapts existing published designs and interaction patterns rather than claiming an original design system.

## Existing designs used

- **Featured work:** [Brittany Chiang's v4 featured-project component](https://github.com/bchiang7/v4/blob/master/src/components/sections/featured.js). The alternating image/content arrangement, technology lists, and source links are adapted to this React/Vite project. Separate, equal-width columns replace the overlapping panels so titles and descriptions remain clear of the screenshots. Text, tags, and links align left. The screenshots remain fully colored and the mobile composition stacks images above text. The MIT license is preserved in `licenses/brittany-chiang-MIT.txt`.
- **Motion direction:** [Joffrey Spitzer's minimalist portfolio breakdown on Codrops](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/). The reference informs the restrained staggered text/image reveals and typography-first composition. No third-party personal content or project assets are copied.
- **Resume:** [Jake Gutierrez's Resume](https://github.com/jakegut/resume). The single-column hierarchy, section rules, dated education rows, technical-skill groups, and linked project titles are adapted with ReportLab. The MIT license is preserved in `licenses/jake-resume-MIT.txt`.

## Requested libraries

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): scoped hero entrance, scroll-triggered section reveals, project-image scrub, and page progress. Cleanup reverts animations and triggers on unmount. `prefers-reduced-motion` disables these effects.
- **Three.js:** the chrome sculpture, its fallback, and the dependency were removed at Aldrin's request.
- [Pretext](https://github.com/chenglou/pretext): its documented preparation and line-layout APIs balance headings after the correct fonts load. Text is visible before enhancement, stays selectable, and has a single accessible text equivalent. ResizeObserver recalculates line layout. The library is loaded in a separate chunk.
- **fal:** not used. Aldrin explicitly chose to omit fal imagery; no generated asset remains pending. The real portrait and full-color project screenshots are retained.
- **Icons:** [Font Awesome's self-hosted webfont approach](https://docs.fontawesome.com/web/setup/host-yourself/webfonts) supplies solid action icons and brand logos using local WOFF2 files. All previous SVG assets and CSS masks are removed. Font Awesome's font license and attribution remain in `public/assets/icons/LICENSE.txt`.

## Review scope

The production build is run after source changes. The updated one-page resume was previously rendered and visually inspected. The corrected desktop project layout and hero are visually reviewed in the local production preview. No automated tests are written or run, and no contact-form test emails are sent.

Pretext loads separately. No loading screen blocks the text, portrait, navigation, or contact form. The logo remains as supplied; standalone arrows that suggested actions on the portrait and skill cards are removed. Arrows inside real links continue to indicate navigation or downloads.

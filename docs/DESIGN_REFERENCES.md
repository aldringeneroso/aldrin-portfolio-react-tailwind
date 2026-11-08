# Design references and implementation

The portfolio adapts existing published designs and interaction patterns rather than claiming an original design system.

## Existing designs used

- **Featured work:** [Brittany Chiang's v4 featured-project component](https://github.com/bchiang7/v4/blob/master/src/components/sections/featured.js). The alternating twelve-column grid, layered description panels, technology lists, and source links are adapted to this React/Vite project. The screenshots remain fully colored and the mobile composition stacks images above text. The MIT license is preserved in `licenses/brittany-chiang-MIT.txt`.
- **Motion direction:** [Joffrey Spitzer's minimalist portfolio breakdown on Codrops](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/). The reference informs the restrained staggered text/image reveals and typography-first composition. No third-party personal content or project assets are copied.
- **Resume:** [Jake Gutierrez's Resume](https://github.com/jakegut/resume). The single-column hierarchy, section rules, dated education rows, technical-skill groups, and linked project titles are adapted with ReportLab. The MIT license is preserved in `licenses/jake-resume-MIT.txt`.

## Requested libraries

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): scoped hero entrance, scroll-triggered section reveals, project-image scrub, page progress, and scroll-driven sculpture rotation. Cleanup reverts animations and triggers on unmount. `prefers-reduced-motion` disables these effects.
- [Three.js](https://threejs.org/): a chrome torus-knot model built from the documented [TorusKnotGeometry](https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry) and the official [RoomEnvironment example](https://github.com/mrdoob/three.js/blob/dev/examples/jsm/environments/RoomEnvironment.js). The renderer loads after the browser is idle, caps pixel ratio, pauses offscreen and in background tabs, and disposes GPU resources. A simple decorative fallback remains when WebGL is unavailable.
- [Pretext](https://github.com/chenglou/pretext): its documented preparation and line-layout APIs balance headings after the correct fonts load. Text is visible before enhancement, stays selectable, and has a single accessible text equivalent. ResizeObserver recalculates line layout. The library is loaded in a separate chunk.
- **fal:** requested for a decorative landing-page background. The integration now reports **installed**, but its generation tools are not exposed to this active chat turn and no `FAL_KEY` exists in the workspace. Computer Use stopped during setup because it could not reliably determine the active browser URL. No fal image or video has been generated or presented as complete. The real portrait and both project screenshots are used as supplied.

## Asset brief for the pending fal background

A quiet, abstract studio-paper background with soft sculptural folds, graphite shadows, and large clear areas; monochrome, understated, editorial. No text, logos, people, devices, or fabricated project screenshots. Generate one landscape still and store the selected asset in `public/assets/` once fal is connected. It is decoration behind the hero composition, not a replacement for the real portrait. A looping background video is unnecessary for this layout.

## Review scope

The production build is run after source changes. The updated one-page resume is rendered and visually inspected. No automated tests are written or run, and no contact-form test emails are sent. Browser visual review could not be completed in this update because Computer Use stopped; that limitation is reported rather than treated as a visual pass.

The build may report the size of the separate Three.js chunk. That chunk is intentionally loaded after the browser is idle; Pretext also loads separately. No loading screen blocks the text, portrait, navigation, or contact form.

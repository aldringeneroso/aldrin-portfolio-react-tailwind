# Aldrin Portfolio - React + Tailwind CSS

Requires Node.js 22.12+ (or Node 20.19+).

```sh
npm install
npm run dev
```

Build for static hosting:

```sh
npm run build
npm run preview
```

- `src/App.jsx`: entry point for the portfolio composition in `src/components/Portfolio.jsx`.
- `src/components/`: portfolio sections, preserved EmailJS form, Pretext heading layout, and the lazy-loaded Three.js sculpture.
- `src/hooks/usePortfolioMotion.js`: scoped GSAP/ScrollTrigger motion with reduced-motion support.
- `src/index.css`: Tailwind CSS v4 import and the responsive black-and-white editorial design.
- `src/content.js`: biography, skills, projects, education, links.
- `public/assets/`: full-color photos/screenshots, icons, and the updated one-page résumé PDF.
- `vercel.json`: deployment settings for the root Vite app; the previous résumé URL redirects to its new asset location.
- `emails/`: receiving-email HTML adapted from Lee Munroe’s responsive template, its license, and EmailJS setup instructions.
- `scripts/build-resume.py`: reproducible résumé authoring using profile, project, education, and skill data from `src/content.js`.
- `docs/DESIGN_REFERENCES.md`: the existing designs adapted for this update, attribution, library behavior, and the pending fal asset.

For direct email delivery, follow [the EmailJS setup guide](emails/README.md). The public EmailJS identifiers are configured in `src/components/ContactForm.jsx`; optional `VITE_EMAILJS_*` overrides are listed in `.env.example`. The receiving template sends to `aldringeneroso1@gmail.com`; the visitor's email is used for replies. No email password, private key, or OAuth token is stored in this project. No live email is sent as part of the production build.

Keep static downloads and photos in `public/assets/` and reference them with `/assets/` URLs. The supplied profile photo is saved as `public/assets/aldrin-generoso-profile.png` and displayed in the hero and About sections. The supplied project screenshots are `a-promise-kept.png` and `ai-floorplan-analysis.png`. All photos and screenshots retain their original colors.

Icons are local Font Awesome Free 7.3.1 SVG assets in `public/assets/icons/`, sourced from [Font Awesome](https://github.com/FortAwesome/Font-Awesome/tree/7.x/svgs). Their attribution comments and `LICENSE.txt` are included. Decorative icons beside visible labels are hidden from screen readers and inherit the current theme's text color.

The AI Floorplan Analysis summary and technology tags are based on the [project README](https://github.com/aldringeneroso/ai-floorplan-analysis/blob/main/README.md), [30 October integration checkpoint](https://github.com/aldringeneroso/ai-floorplan-analysis/blob/main/docs/PUBLICATION_20261030.md), and frontend package manifest. No live demo URL has been supplied.

The project runs from this folder. `node_modules/` contains installed dependencies and `dist/` contains generated production output; both are ignored by Git.

The résumé now matches both featured projects, includes their actual repository links, and lists the B Hotel MIS internship without invented dates or responsibilities. Its layout adapts [Jake's Resume](https://github.com/jakegut/resume); the project presentation adapts [Brittany Chiang's v4 featured layout](https://github.com/bchiang7/v4). The corresponding MIT licenses are in `docs/licenses/`.

Rebuild the résumé with Python and ReportLab using `python scripts/build-resume.py`. Its source reads portfolio content directly and retains the supplied contact number. Preview the generated PDF after changing content. The download URL remains `/assets/aldrin-generoso-resume.pdf`.

The requested fal integration is now installed, but its generation tools are not available in this active chat turn. Computer Use also stopped during setup because it could not verify the active browser URL. No fal-generated asset is included yet. GSAP, Three.js, and Pretext are implemented with CSS/text fallbacks for their enhancements. No automated tests are added or run.

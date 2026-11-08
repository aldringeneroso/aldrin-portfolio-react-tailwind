<div align="center">

# Aldrin E. Generoso

**Software Engineer · Computer Science Student**

Turning ideas into experiences.

[![LinkedIn][badge-linkedin]](https://www.linkedin.com/in/aldrin-esmeralda-generoso-633b1a416/)
[![GitHub][badge-github]](https://github.com/aldringeneroso)
[![Email][badge-email]](mailto:aldringeneroso1@gmail.com)
[![Download résumé][badge-resume]](public/assets/aldrin-generoso-resume.pdf)

![React 19](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-20232A?style=flat-square&logo=javascript&logoColor=F7DF1E)
![Vite 8](https://img.shields.io/badge/Vite_8-20232A?style=flat-square&logo=vite&logoColor=BD34FE)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-20232A?style=flat-square&logo=tailwindcss&logoColor=38BDF8)

</div>

---

## The portfolio

A personal space for my work in software engineering, web applications, and game development. I’m studying Computer Science at Cavite State University’s Bacoor City Campus, based in Bacoor, Cavite, Philippines. My experience includes an MIS internship at B Hotel.

The site pairs a black-and-white editorial layout with full-color photography and project screenshots. Large serif headings, restrained motion, and a persistent light/dark toggle keep the focus on the work.

### Inside the site

- **Introduction & about** — my background, interests, portrait, and quick access to LinkedIn, GitHub, and my résumé.
- **Featured work** — project screenshots, descriptions, technology tags, and source repositories.
- **Toolkit & journey** — skills, education, internship, and certification.
- **Contact** — direct contact links and an EmailJS form with a designed inbox notification.
- **Thoughtful details** — responsive layouts, reduced-motion support, keyboard focus states, a skip link, and self-hosted Font Awesome font icons.

## Featured projects

### 01 / Unnamed Fantasy: A Promise Kept

[![A Promise Kept — colorful pixel-art koi pond title screen](public/assets/a-promise-kept.png)](https://github.com/aldringeneroso/Unnamed-Fantasy-A-Promise-Kept)

A visual novel and action-RPG hybrid with branching narrative events. Modular systems manage health, economy, affection, and day progression, with JSON-based multi-slot saves.

**Godot 4 · Dialogic 2 · JSON**

[![View on GitHub][badge-source]](https://github.com/aldringeneroso/Unnamed-Fantasy-A-Promise-Kept)

### 02 / AI Floorplan Analysis

[![AI Floorplan Analysis — VED Electrical Services homepage and wiring layout](public/assets/ai-floorplan-analysis.png)](https://github.com/aldringeneroso/ai-floorplan-analysis)

An AI-assisted floor-plan analysis and electrical planning application for VED Electrical Services. It supports floor-plan uploads, review of detected rooms, walls, and electrical symbols, synchronized 2D/3D layouts, electrical routing, and material-based cost estimates.

**React · FastAPI · MySQL · OpenCV · Three.js**

[![View on GitHub][badge-source]](https://github.com/aldringeneroso/ai-floorplan-analysis)

## Portfolio tech stack

| Layer               | Technology                  | Role                                                      |
| ------------------- | --------------------------- | --------------------------------------------------------- |
| Interface           | React 19 + JavaScript       | Reusable portfolio sections and interactive controls      |
| Development & build | Vite 8                      | Local development and static production output            |
| Styling             | Tailwind CSS 4 + custom CSS | Responsive composition, typography, and theme tokens      |
| Motion              | GSAP + ScrollTrigger        | Entrance animations, section reveals, and scroll progress |
| Text layout         | Pretext                     | Balanced headings with visible text fallbacks             |
| Contact             | EmailJS Browser SDK         | Direct email delivery from the contact form               |
| Icons               | Font Awesome Free 7.3.1     | Local WOFF2 solid and brand icons; no SVG rendering       |
| Résumé authoring    | Python + ReportLab          | Reproducible one-page PDF built from portfolio content    |

## Run locally

Use **Node.js 22.12+**, or Node.js 20.19+ within the 20.x release line, and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

The build is written to `dist/`. Vercel configuration is included in [vercel.json](vercel.json).

## Updating the portfolio

This portfolio grows with my work. New projects, content, and design updates can be added through the files below.

| Update                                                    | Location                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| Biography, skills, projects, education, and contact links | [src/content.js](src/content.js)                                   |
| Page composition and sections                             | [src/components/Portfolio.jsx](src/components/Portfolio.jsx)       |
| Featured project presentation                             | [src/components/Projects.jsx](src/components/Projects.jsx)         |
| Colors, typography, spacing, and responsive layouts       | [src/index.css](src/index.css)                                     |
| Scroll and reveal animations                              | [src/hooks/usePortfolioMotion.js](src/hooks/usePortfolioMotion.js) |
| Photos, screenshots, font icons, and résumé               | [public/assets/](public/assets/)                                   |

Keep static assets in `public/assets/` and reference them with `/assets/` URLs. Photos and project screenshots retain their colors in both themes.

### Contact form

The form uses the configured public EmailJS identifiers. To use another account, copy [.env.example](.env.example) to `.env.local`, set all three values, and restart Vite:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The receiving email and reply settings are configured in the EmailJS template. See the [email setup guide](emails/README.md) for the complete configuration and the [notification template](emails/contact-notification.html). Only public browser identifiers belong in `VITE_` variables; keep passwords, private keys, and OAuth tokens out of the project.

### Downloadable résumé

The [one-page résumé](public/assets/aldrin-generoso-resume.pdf) follows the featured projects and portfolio content. To regenerate it with Python, Node.js, and ReportLab available:

```sh
python scripts/build-resume.py
```

Review the generated PDF before publishing. The site download remains `/assets/aldrin-generoso-resume.pdf`.

## Design credits

- **Project presentation:** adapted from [Brittany Chiang’s v4 portfolio](https://github.com/bchiang7/v4), with separate image and text columns.
- **Résumé layout:** adapted from [Jake Gutierrez’s Resume](https://github.com/jakegut/resume).
- **Contact notification:** adapted from [Lee Munroe’s responsive HTML email template](https://github.com/leemunroe/responsive-html-email-template).
- **Iconography:** [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome/tree/7.3.1/webfonts), self-hosted as webfonts.
- **README badges:** [Shields.io](https://shields.io/badges/static-badge), with SVG badge images used only in this README.

See [design references](docs/DESIGN_REFERENCES.md), [layout licenses](docs/licenses/), the [email template license](emails/LICENSE.txt), and the [Font Awesome license](public/assets/icons/LICENSE.txt) for attribution and implementation details.

---

<div align="center">

**Have a project, opportunity, or idea in mind?**

[![LinkedIn][badge-linkedin]](https://www.linkedin.com/in/aldrin-esmeralda-generoso-633b1a416/)
[![Email][badge-email]](mailto:aldringeneroso1@gmail.com)

</div>

[badge-github]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[badge-email]: https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white
[badge-source]: https://img.shields.io/badge/View_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[badge-linkedin]: https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTEwMC4zIDQ0OGwtOTIuOSAwIDAtMjk5LjEgOTIuOSAwIDAgMjk5LjF6TTUzLjggMTA4LjFDMjQuMSAxMDguMSAwIDgzLjUgMCA1My44IDAgMzkuNSA1LjcgMjUuOSAxNS44IDE1LjhzMjMuOC0xNS44IDM4LTE1LjggMjcuOSA1LjcgMzggMTUuOCAxNS44IDIzLjggMTUuOCAzOGMwIDI5LjctMjQuMSA1NC4zLTUzLjggNTQuM3pNNDQ3LjkgNDQ4bC05Mi43IDAgMC0xNDUuNmMwLTM0LjctLjctNzkuMi00OC4zLTc5LjItNDguMyAwLTU1LjcgMzcuNy01NS43IDc2LjdsMCAxNDguMS05Mi44IDAgMC0yOTkuMSA4OS4xIDAgMCA0MC44IDEuMyAwYzEyLjQtMjMuNSA0Mi43LTQ4LjMgODcuOS00OC4zIDk0IDAgMTExLjMgNjEuOSAxMTEuMyAxNDIuM2wwIDE2NC4zLS4xIDB6Ii8%2BPC9zdmc%2B
[badge-resume]: https://img.shields.io/badge/Resume-333333?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTAgNjRDMCAyOC43IDI4LjcgMCA2NCAwTDIxMy41IDBjMTcgMCAzMy4zIDYuNyA0NS4zIDE4LjdMMzY1LjMgMTI1LjNjMTIgMTIgMTguNyAyOC4zIDE4LjcgNDUuM0wzODQgNDQ4YzAgMzUuMy0yOC43IDY0LTY0IDY0TDY0IDUxMmMtMzUuMyAwLTY0LTI4LjctNjQtNjRMMCA2NHptMjA4LTUuNWwwIDkzLjVjMCAxMy4zIDEwLjcgMjQgMjQgMjRMMzI1LjUgMTc2IDIwOCA1OC41ek0xNzUgNDQxYzkuNCA5LjQgMjQuNiA5LjQgMzMuOSAwbDY0LTY0YzkuNC05LjQgOS40LTI0LjYgMC0zMy45cy0yNC42LTkuNC0zMy45IDBsLTIzIDIzIDAtODYuMWMwLTEzLjMtMTAuNy0yNC0yNC0yNHMtMjQgMTAuNy0yNCAyNGwwIDg2LjEtMjMtMjNjLTkuNC05LjQtMjQuNi05LjQtMzMuOSAwcy05LjQgMjQuNiAwIDMzLjlsNjQgNjR6Ii8%2BPC9zdmc%2B

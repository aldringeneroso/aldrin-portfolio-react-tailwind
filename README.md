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

- `src/App.jsx`: JavaScript React components, reference-inspired layout, mobile menu, theme switch, email-draft contact form.
- `src/index.css`: Tailwind CSS v4 import, shared Tailwind component utilities, and custom visual styles.
- `src/content.js`: biography, skills, projects, education, links.
- `public/assets/`: static assets, including the supplied résumé PDF (unchanged).
- `vercel.json`: deployment settings for the root Vite app; the previous résumé URL redirects to its new asset location.

Keep static downloads and photos in `public/assets/` and reference them with `/assets/` URLs. The supplied profile photo is saved as `public/assets/aldrin-generoso-profile.jpeg` and displayed in the hero and About sections. The supplied project screenshots are `a-promise-kept.png` and `ai-floorplan-analysis.png`. All photos and screenshots retain their original colors.

Icons are local Font Awesome Free 7.3.1 SVG assets in `public/assets/icons/`, sourced from [Font Awesome](https://github.com/FortAwesome/Font-Awesome/tree/7.x/svgs). Their attribution comments and `LICENSE.txt` are included. Decorative icons beside visible labels are hidden from screen readers and inherit the current theme's text color.

The AI Floorplan Analysis summary and technology tags are based on the [project README](https://github.com/aldringeneroso/ai-floorplan-analysis/blob/main/README.md), [30 October integration checkpoint](https://github.com/aldringeneroso/ai-floorplan-analysis/blob/main/docs/PUBLICATION_20261030.md), and frontend package manifest. No live demo URL has been supplied.

The project runs from this folder. `node_modules/` contains installed dependencies and `dist/` contains generated production output; both are ignored by Git.

The MIS internship at B Hotel is included without invented dates or responsibilities. The supplied PDF predates that update. Contact form opens an email draft; it does not send directly. No Sites account or hosting credentials are required.

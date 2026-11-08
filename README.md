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

Keep static downloads and future photos in `public/assets/` and reference them with `/assets/` URLs. The current portrait and project illustrations are rendered by React components in `src/App.jsx`.

The project runs from this folder. `node_modules/` contains installed dependencies and `dist/` contains generated production output; both are ignored by Git.

The MIS internship at B Hotel is included without invented dates or responsibilities. The supplied PDF predates that update. Photo is an initials placeholder. Project previews are illustrations. Contact form opens an email draft; it does not send directly. No Sites account or hosting credentials are required.

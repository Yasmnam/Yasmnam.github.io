# Portfolio — Yasaman Aminian

Built with [Astro](https://astro.build) and React. Static output, deployed to
GitHub Pages at https://yasmnam.github.io/.

## Run it

Needs Node 22.12 or newer.

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # static site into ./dist
npm run preview   # serve ./dist locally
npm run check     # type-check .astro and .ts files
```

Pushing to `main` deploys automatically (`.github/workflows/deploy.yml`).

## Where things live

```
src/pages/             one file per URL: index.astro, <slug>/index.astro
src/layouts/           BaseLayout (head, analytics, meter), ArticleLayout (case study chrome)
src/components/        TopBar, Footer; home/* (Hero, EditorsNote, ProductSection, …)
src/components/islands React components that run in the browser: Carousel, HoverVideo
src/data/              typed content: caseStudies.ts, products.ts, principles.ts
src/styles/            tokens.css, base.css and one CSS file per component (main.css imports all)
src/scripts/           small client scripts: motion.js, analytics.js, meter.js
static/                copied as-is: public/images/…, robots.txt, sitemap.xml
```

Everything is rendered to static HTML. React only runs for the islands, which
hydrate when they scroll into view (`client:visible`).

## Add a case study

1. Add an entry to `src/data/caseStudies.ts`: slug, number, product, the home
   page row (short title, card title, summary, thumbnail) and the page details
   (title, description, kicker, meta strip, optional hero video, sections for
   the contents list, next stories).
2. Create `src/pages/<slug>/index.astro` and wrap the body in
   `<ArticleLayout study={getCaseStudy('<slug>')}>`. Give each
   `<section class="cs-section">` an `id` matching `sections` in the data.
3. Put images in `static/public/images/<slug>/` and reference them as
   `/public/images/<slug>/…`.
4. Add the URL to `static/sitemap.xml`.

The home page rows, "In this edition", the contents list and the next-story
links all come from the data, so there's no other markup to touch.

See CLAUDE.md for design decisions, accessibility constraints and history.

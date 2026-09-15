# Yasaman Aminian — Portfolio

Personal portfolio for a product designer working in regulated software
(pharmacy platforms, health records, archives). Hand-coded, no framework.
Replaces an existing Framer site.

## Run it

Any static server. No build step, no dependencies.

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Structure

```
index.html              single page, semantic HTML
src/styles/main.css     all styles, design tokens at the top in :root
src/scripts/main.js     contrast meter + scroll reveals
public/images/          project images and portrait
public/fonts/           self-hosted fonts (currently empty)
```

`imgFallback()` is deliberately inline in `<head>`, not in `main.js` —
inline `onerror` handlers can fire before a deferred script runs.

## The concept

A newspaper. Not decoration — the structure is doing work:

- Masthead, edition line, spec block (Type / Focus / Location / Status)
- Case studies set as filed articles: kicker, headline, dateline, body, tools

A numbered footnotes section under "About" once carried context that would
otherwise clutter the entries — removed; the case study entries and their
own full pages now carry that context inline instead.

The reference point was heronaiapp.com, which borrows the visual language of
its own subject (building codes). The equivalent here is accessibility
criteria and design tokens.

## Design tokens

All in `:root` in `main.css`. Change them there, never hardcode values.

Newsprint palette:
- `--paper: #E4E0D4` surround
- `--sheet: #ECECE8` the page itself — cooler, more neutral gray-white than
  the original `#F0EDE3` cream
- `--ink: #14161A` body text
- `--ink-mid: #484C55` secondary
- `--ink-quiet: #5C616A` labels, captions
- `--spot: #93291F` print red, used sparingly

Type:
- `--masthead` Playfair Display 900 — masthead and large display only
- `--serif` Literata — body
- `--mono` IBM Plex Mono — technical labels, datelines, spec block

Big headlines (`.lead-article h2`, `.cs-head h1`) render through the
`.reveal-line{overflow:hidden}` scroll-reveal mask. At the tight line-heights
these once used (1.03–1.04) with Literata, the font's real line box ran
taller than the mask and permanently clipped the tops of ascenders/caps and
the descenders — not just during the reveal animation, at rest too. Both now
use `var(--masthead)` at weight 700 with `line-height:1.32`, which clears it
(verified by comparing actual glyph-ink bounding boxes against the mask, not
just eyeballing a screenshot). If you touch either rule, or add a new heading
wrapped in `.reveal-line`, re-check for this — a manually split two-line
heading (like `.lead-article h2`, two separate `.reveal-line`s) is at risk;
a single wrapping heading (like `.cs-head h1`) is much safer since the
`.reveal-line`'s height auto-sizes around however many lines it wraps to.

## Accessibility — non-negotiable

Every text colour has been checked against the sheet **after** the newsprint
texture darkens it (roughly 4%). Current ratios on the textured surface:

| Token | Ratio | Status |
|---|---|---|
| `--ink` | 14.1:1 | pass |
| `--ink-mid` | 6.7:1 | pass |
| `--ink-quiet` | 4.8:1 | pass, tight |
| `--spot` | 6.3:1 | pass |

(Recomputed after the `--sheet` change to `#ECECE8` — ratios moved by well
under a tenth of a point, since the new tone is close in lightness to the
old cream, just less warm.)

`--ink-quiet` has almost no headroom. **If you increase the opacity of any
newsprint layer, re-check it.** An earlier version of the texture pushed this
token to 3.6:1 — a genuine AA failure caused entirely by decoration.

The contrast meter on the page measures live and will show the failure, so
use it: hover the small mono labels after any change to the texture or palette.

Also required:
- Reduced-motion is handled; scroll reveals show content immediately
- Every image has real alt text
- Focus states visible on all interactive elements
- Skip link first in the DOM

## The newsprint texture

Four fixed layers in `main.css`, all `pointer-events:none`, z-index 40–43
(below the navbar at 70 and the meter at 60):

1. `.np-halftone` — press screen dots, 3px grid
2. `.np-ghost` — print-through from the reverse of the sheet
3. `.np-fibre` — paper tooth, SVG turbulence
4. `.np-mottle` — uneven inking, large-scale turbulence

They must sit **above** the sheet. The sheet has an opaque background, so
texture placed below it only shows in the margins.

## The contrast meter

`src/scripts/main.js`. Follows the cursor and measures whatever text it is
over: climbs to the nearest element with a text node, walks up for the first
opaque background, computes the WCAG ratio, applies the correct threshold
(3:1 for large text, 4.5:1 otherwise, with the bold-at-18.66px rule).

It is the strongest evidence on the page — accessibility demonstrated rather
than claimed. Keep it working.

## Still to do

1. ~~**Case study pages.**~~ Done. `/drawerredesign`, `/patienthistory`,
   `/sensecast`, `/mml` each have their own `index.html` (so the extensionless
   links resolve as static-server directory indexes), reusing `main.css` and
   the shared header/texture/meter markup via a new `.cs-*` component set
   (`.cs-head`, `.cs-section`, `.cs-numbered`, `.cs-figure`, `.cs-quote`,
   `.cs-stats`, `.cs-next`, plus `.cs-meta`, `.cs-gap`, `.cs-compare` and
   `.cs-diagram` added for the ARKK rewrite — see item 5). Content and images
   were pulled from the live
   Framer site (yasaman-aminian.framer.website) — each page uses 4-5 curated
   figures (not every source image, except `/drawerredesign` — see item 7,
   which imports every figure from its Framer source) with alt text written after actually
   viewing each one, self-hosted under `public/images/<slug>/`. Quotes from
   real users are kept verbatim (including American spelling); narration
   around them uses British spelling per the content rules.
2. ~~**Self-host homepage images.**~~ Done for the 4 case-study cards — each
   uses the actual landing-page thumbnail from the live Framer site (the
   same hero shot she originally hotlinked), just downloaded and self-hosted
   at `public/images/drawer-redesign.png`, `patient-history.png`,
   `sensecast.png` and `mml.png` — the exact filenames CLAUDE.md already
   named as the expected local fallbacks. `patient-history.png` was
   previously missing entirely; the other three replace hotlinks to
   `framerusercontent.com`. (These are the landing-page card thumbnails,
   distinct from the 4-5 curated in-article figures each case study's own
   page uses under `public/images/<slug>/`.) Remaining: the About section's
   portrait still hotlinks to Framer with a missing local fallback
   (`portrait.jpg`) — no source photo has been provided to self-host in its
   place. Update: `drawer-redesign.png` (the homepage card thumbnail for
   `/drawerredesign`) was later swapped to a generic wireframe of the
   dashboard — the "Cover image" she had selected in Framer's own
   `CaseStudyCard` component for that project (found via `getSelectedNodesXml`
   after she said to use "the one selected in Framer"; her Framer file also
   has a `Projects` CMS collection, but that's unrelated leftover template
   demo data — Landio/Portfolite/Fade/Polo, not her real case studies).
   `drawer-redesign.png` had a second, unrelated job — it was also the
   homepage's own site-wide `og:image`/`twitter:image` (the whole portfolio's
   social-preview image, nothing to do with this one card) — so before
   overwriting it, the original real screenshot was preserved as
   `drawer-redesign-photo.png` and the site-wide meta tags repointed there,
   so swapping the card's cover didn't silently change what the whole
   portfolio link previews as when shared.
3. **Real contact links.** LinkedIn and Dribbble are `#`. Note: the real
   LinkedIn URL is `https://www.linkedin.com/in/yasaman-aminian/` (found on
   the live Framer site while pulling case study content) — not yet wired in.
4. **Deploy.** Static — Netlify, Vercel or GitHub Pages all work as-is.
5. ~~**Verify the ARKK case study copy.**~~ Done — `/workflowredesign`
   (case study one, "Rebuilding a workflow builder around the people who use
   it most") was rewritten from her own "Draft 4" brief, replacing the
   version reconstructed from a screenshot. New: an `Overview` fact table
   (`.cs-meta`), a text-placeholder style for narrative gaps (`.cs-gap`,
   not currently used — the draft's gaps were resolved using already
   fact-checked content from the prior version: the rejected drawer layouts,
   the Foblex Flow capability audit, and what "converging" involved), a
   three-way layout comparison (`.cs-compare`), and two hand-drawn inline
   SVGs (`.cs-diagram`) for the ownership split and the three drawer widths
   — both marked `aria-hidden` with the equivalent information carried in
   the visible figcaption, since main.js's contrast meter and the
   `reveal-line` mask do not otherwise apply to SVG content. Corrected the
   timeframe from the placeholder "2024–2025" to the brief's "April – July
   2026", and the role from "Lead product designer — 4 initiatives" to
   "owned two of three initiatives end to end" — the homepage card was
   updated to match both. The kicker on the page itself read "Case study
   five", inconsistent with the homepage's "Case study one" — fixed to
   match. The hero image and homepage card thumbnail now use
   `workflow-testing-drawer.png` (was `canvas-tree.png`), the shot closest
   to "canvas with the drawer open at half screen, straight-on". Two
   `.cs-figure-pending` placeholders remain, both dropped from the new
   structure's copy since no source exists yet: the legacy modal-based
   editor, and a capability-audit diagram (the audit itself now runs as
   text, under "Where I joined the process"). Two narrative specifics the
   draft flagged as gaps were resolved with deliberately neutral language
   rather than invented detail, per the content rule below: the drawer's
   "specific failures" (one verified failure — no grouping/ordering — is
   used rather than the "two or three" the draft asked for), and what made
   undo/redo "complicated" (left general — "the complexity of doing it
   properly" — rather than naming an unverified technical cause). One line
   from the draft was dropped rather than shipped as an unverified
   claim: that tabs "matched how users already thought about some activity
   types" — no source confirms which ones.
6. ~~**No real ARKK UI screenshots.**~~ Done — she does not want any real
   product screenshots in this case study, and wants no image repeated. Of
   the three original real screenshots, two (`runtime-settings-drawer.png`,
   `workflow-testing-drawer.png`) had already been replaced with supplied
   generic wireframes (`drawer-wireframe.png` for Initiative two,
   `testing-panel-wireframe.png` for the hero figure). The third
   (`canvas-tree.png`, Initiative one) had no wireframe replacement, and
   `testing-panel-wireframe.png` had been reused a second time for
   Initiative three — both fixed by drawing original hand-coded inline SVGs
   (`.cs-diagram`, same pattern as the ownership and drawer-width diagrams):
   a generic canvas node-tree with a toolbar strip for Initiative one, and a
   before/after flow ("leave the environment to validate" vs "test in
   place") for Initiative three. All three original real screenshots were
   deleted from `public/images/workflowredesign/` — nothing references them
   any more. The case study's only real (non-wireframe, non-diagram) images
   now are none; every figure is either a wireframe with placeholder content
   or a hand-drawn schematic.

   Still outstanding: a FigJam board of "Node interaction requirements" /
   "Connection interaction requirements" was shared inline in chat (meant to
   support "What Foblex Flow gave, and what it cost") but was never saved to
   disk as a locatable file (checked Downloads, Desktop, Documents, Pictures,
   and session temp dirs) — needs her to save/share it as an actual file
   before it can be added, and since it's a real artefact (not a wireframe),
   check with her first given the no-real-screenshots preference above.
7. ~~**Import all content into `/drawerredesign`.**~~ Done — she asked to
   "bring all the contents" from her Framer source, not just curated
   highlights, and to miss nothing. Source was read via the Framer MCP
   server (a `mcp.unframer.co` connector she pasted a URL for; already
   registered in-session under a different connector ID, so it didn't need
   re-adding — `getProjectXml` lists pages/nodeIds, but `getNodeXml` only
   works reliably on whichever page is currently focused in her live Framer
   editor, so unfocused pages were instead read from the published site,
   `yasaman-aminian.framer.website/drawerredesign`, which is server-rendered
   with full text and image URLs in the raw HTML — `getProjectWebsiteUrl`
   gives that URL). All 16 numbered figures (the source's own "Fig N"
   captions) plus the one video were downloaded from
   `framerusercontent.com` and self-hosted under
   `public/images/drawerredesign/fig1…fig16`, replacing the previous 4
   curated images (`before.png`, `after.png`, `flowchart.png`,
   `design-decision.png`, now deleted). Exact image-to-caption mapping was
   confirmed visually (screenshots), not just by HTML order, since Framer's
   accessibility tree hides all of this page's images (empty `alt` attribute
   on every one — a real accessibility gap in the source that this rewrite
   fixes with real alt text). New content added that the previous curated
   version dropped entirely: the "My Role" paragraph, a Design
   credit/Team/Timeline `.cs-meta` block, the full 6-step "Process" list, all
   three persona cards (Fig. 3–5, with photos) and their concluding 5-point
   findings list, images for all four design iterations (Fig. 7–11, Fig. 7
   is two images stacked in one `.cs-figure` via the new `.cs-figure-stack`
   rule in main.css) with their verbatim stakeholder-feedback quotes, the
   "Eureka!" moment, the UX Research Plan board (Fig. 13), the front-end
   handoff spec (Fig. 14), and Onboarding & User Guidance as its own section
   with the Notion doc screenshot (Fig. 15) and the embedded Synthesia
   tutorial video (Fig. 16, `.cs-figure video` styling added to main.css,
   ~17MB, self-hosted with `controls preload="metadata"` since the static
   page has no scroll-triggered autoplay the way the Framer source does).
   Also fixed the page's kicker, which read "Case study one" against the
   homepage's "Case study two".
8. ~~**Same treatment for `/patienthistory`.**~~ Done — she selected the
   `/patienthistory` `CaseStudyCard` in Framer next and asked for the same
   cover-photo swap plus a full content import. Cover: `patient-history.png`
   replaced with the image selected in Framer
   (`8NQsgf03MlKsTLeO2W49ppWsi0.png` on `framerusercontent.com`) — no
   dual-usage conflict this time (unlike `drawer-redesign.png`), so it was a
   direct swap. Content: this page already used 4 curated figures, close to
   the source's own copy, so the gaps were narrower than drawerredesign's —
   added a brief "Process — three acts" overview section, all 3 thematic-
   analysis figures (Fig. 3–5; the old page only had 1 of the 3), and
   expanded Outcome from 3 stats to the source's full 5 items (kept `.cs-stats`
   for the 2 numeric ones, added a list for the 3 qualitative ones). Also
   fixed this page's kicker, which read "Case study two" against the
   homepage's "Case study three". Same visual-confirmation approach as
   drawerredesign: this source also hides all its images from the
   accessibility tree (empty `alt`), so every figure was viewed directly
   before writing real alt text, not inferred from HTML order alone.

   Fig. 6 (task analysis, before/after) turned out to have a transparent
   background — verified by inspecting its actual pixel/alpha data: the
   "Before"/"After" titles and the stat labels are white or near-white,
   meant to sit on a dark FigJam canvas, while the numbered step boxes are
   fully opaque white with dark text (unaffected either way). First fix was
   a `.cs-figure-dark` class (`background:#000` on the `img`) — worked, but
   she pointed out a flat black box doesn't match the newsprint design, so
   it was replaced with a hand-drawn inline `.cs-diagram` SVG instead (same
   pattern as ARKK's diagrams): two lane groups (Before/After) built from
   `var(--ink)`/`var(--ink-mid)`/`var(--rule)`/`var(--spot)` and `var(--mono)`
   for labels, spot-highlighting the improved "After" numbers and step
   borders. Unlike the ARKK diagrams, this one is **not** `aria-hidden` —
   it's real SVG `<text>`, genuinely reachable by a screen reader, because
   it carries the sub-step breakdown that isn't repeated anywhere in the
   surrounding prose (the ARKK diagrams were hidden because they only
   restated what the paragraph text already said). `.cs-figure-dark` and
   the source screenshot (`fig6-task-analysis.png`) were removed as
   unused.

   Fig. 3 (the thematic-analysis table) got the same complaint — a
   screenshot with a black header bar and a blur-most/spotlight-two-rows
   annotation style, neither of which fits the newsprint design. Since this
   one is genuinely tabular data (not a diagram), it's rebuilt as a real
   `<table>` — a new `.cs-table`/`.cs-table-wrap` component in main.css
   (mono uppercase headers, `var(--rule)` row dividers, the Outcome
   Sentiment column right-aligned in mono with `var(--spot)` for Negative,
   `var(--ink)` for Positive, `var(--ink-quiet)` for Neutral), wrapped in an
   `overflow-x:auto` div for narrow viewports. Content is the exact two
   worked examples per category (main/supportive) that were the only rows
   not blurred in the source image — genuinely sourced, not invented.
   `fig3-thematic-analysis-1.png` removed as unused. Fig. 4 (a real flow
   diagram, already high-contrast) and Fig. 5 (a FigJam sticky-note board,
   also fine) didn't have this problem and were left as images.

   Update: she felt the table itself still read cramped once styled — a
   4-column table squeezed into the ~46rem article column doesn't have
   room to breathe regardless of border/padding tweaks. Replaced
   `.cs-table`/`.cs-table-wrap` with `.cs-records`: each entry is a block
   with a category/sentiment header line (dateline-style, matching
   `.dateline`), the action as a real heading, and the implication as body
   text — the same rhythm as `.cs-numbered`, with generous per-record
   padding (1.8rem) instead of a spreadsheet metaphor.
9. ~~**Client-bar divider on the homepage.**~~ Done — a small header
   grouping the two apodienste case studies (`/drawerredesign` and
   `/patienthistory`) under their shared client, matching how the Framer
   source groups them by client in its own "next case studies" widget
   ("PharmaBits / apodienste — Pharmaceutical digital Services"). New
   `.client-bar` component in main.css: a 64×44 thumbnail plus a two-line
   mono label, sitting between the ARKK card and the drawerredesign card.
   The thumbnail reuses `drawer-redesign-photo.png` (the real "Insight
   Dashboard" screenshot preserved in item 2, above) — she pointed to it by
   selecting it in Framer (a `BgImg` inside an unrelated `SkillsProfile`
   section, found via `getSelectedNodesXml`), so no new asset was needed.

## Content rules

- British spelling
- Her voice: plain, measured, research-forward, past tense, verb-led
- Never invent metrics, client names or case study details. Everything on the
  page came from her actual Framer site. If something is unknown, mark it as a
  placeholder rather than filling it in.

## Things that were tried and rejected

Useful context so they are not re-proposed:

- Watercolour cursor trails — read as gimmicky, several rounds of it
- Dark studio-agency layout with fluid pastel background — "not me"
- Grid of gradient tiles reacting to the cursor — too rigid, then invisible
- A softer editorial version without strong scale contrast — "boring"

The newspaper direction was chosen because it is structural rather than
decorative, and because the technical readouts connect to her actual domain.

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
   `.cs-stats`, `.cs-next`). Content and images were pulled from the live
   Framer site (yasaman-aminian.framer.website) — each page uses 4-5 curated
   figures (not every source image) with alt text written after actually
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
   place.
3. **Real contact links.** LinkedIn and Dribbble are `#`. Note: the real
   LinkedIn URL is `https://www.linkedin.com/in/yasaman-aminian/` (found on
   the live Framer site while pulling case study content) — not yet wired in.
4. **Deploy.** Static — Netlify, Vercel or GitHub Pages all work as-is.
5. **Verify the ARKK case study copy.** `/workflowredesign` (case study five,
   "Redesigning the workflow builder canvas...") was added from a single
   screenshot of a case-study document she supplied in chat, not from a live
   site. The title, meta row (role/duration/platform/deliverables), section
   structure, initiative names, key-decision names, and the four "By the
   Numbers" stats were clearly legible and transcribed directly. The body
   paragraphs (problem description, Foblex Flow capability lists, process
   step descriptions, drawer pros/cons) were reconstructed from a
   lower-resolution read of the same screenshot and may not match her exact
   original wording — worth a pass against the source document to correct
   anything that drifted. 3 of the 5 figures now use real screenshots she
   supplied directly in chat, self-hosted at
   `public/images/workflowredesign/{canvas-tree,runtime-settings-drawer,
   workflow-testing-drawer}.png` (also used as the homepage card image).
   Two are still dashed placeholder boxes (`.cs-figure-pending`) with no
   source image yet: the legacy modal-based editor (in "The problem") and
   the Foblex Flow capability-audit diagram (in "Foblex Flow — capability
   audit") — swap those in under the same folder, same `<img>` pattern,
   once available.

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

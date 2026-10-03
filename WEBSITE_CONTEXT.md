# Viora Dental & Aesthetic Clinic — Website Context

Reference doc for future sessions. Covers the business, the site's current
state, and known gaps. Not a replacement for reading the code — see
`src/routes/index.tsx` for the actual page.

## Color palette

Defined in `src/styles.css` under "Viora palette" (all colors in oklch per
that file's own convention — see the hex comments next to each var for the
source value). Tokens keep their original names but hold new values as of
2026-10-03 (owner-supplied palette):

| Token | Hex | Role |
|---|---|---|
| `bone` | `#FAF8F5` | Canvas / page background |
| `frost` | `#F4F1ED` | Surfaces / cards |
| `champagne` | `#9E6B75` | Primary accent (buttons, labels) |
| `mauve` | `#895862` | Primary hover/focus (repurposed from old decorative pink) |
| `ink` | `#231818` | Primary text/headings |
| `taupe` | `#6B6060` | Muted/body subtext (**new token**) |
| `sage` | `#DFD9D2` | Borders/separators (repurposed from old decorative green) |

`sage` and `mauve` are also still used for the decorative hero/book-section
blur blobs and the Clinic section's trust-list dots — repointing them kept
those effects in-palette without touching any markup. The generic shadcn
tokens (`--background`, `--foreground`, `--primary`, `--border`, `--ring`,
etc., used by the 404/error pages in `__root.tsx`) were updated to match.
`WhatsApp us` buttons keep the hardcoded `#25D366` brand green — not part
of this palette, left alone intentionally.

A `champagne-text` token (`#93616B`, same hue/chroma, darker lightness)
exists specifically for champagne used **as text** on the bone background
(eyebrow section labels, star rating) — the full-strength `champagne`
measured 4.12:1 contrast there, short of WCAG AA's 4.5:1 for normal text;
`champagne-text` hits 4.76:1. `champagne` itself is unchanged for
backgrounds/buttons/decorative use, so the actual brand hex the owner gave
is preserved everywhere it's visually the "accent color." The 3 primary
"Book a consultation" buttons also switched from `text-ink font-medium` to
`text-bone font-semibold` on their champagne/mauve backgrounds for the
same reason (ink-on-champagne was 3.96:1, worse on the mauve hover state
at 2.99:1).

## Accessibility

- `prefers-reduced-motion: reduce` is respected: the `viora-drift`/
  `viora-drift-2` CSS animations are disabled via a media query in
  `styles.css`, and `useAutoplayVideo` (`src/hooks/use-autoplay-video.ts`)
  skips calling `play()` entirely when the user has that preference set —
  both Hero's and Clinic's videos stay paused on their poster frame
  instead of autoplaying.
- See "Color palette" above for the `champagne-text` contrast fix.

## SEO / sharing

- **Favicon**: previously the default scaffold placeholder (an unrelated
  orange/blue gradient heart icon). Regenerated from the real logo
  (`src/assets/viora-logo.jpg`, cropped square) into `public/favicon.ico`,
  `public/favicon-32x32.png`, and `public/apple-touch-icon.png`, all wired
  up in `__root.tsx`'s `links`.
- **Social share image** (`og:image`/`twitter:image`): previously unset —
  since WhatsApp is the primary sharing/booking channel, any shared link
  showed no preview thumbnail. `public/og-image.jpg` (1200×630) is cropped
  from `media/Doctor details.png` (the logo + wordmark + doctor-names
  lockup), referenced from both `__root.tsx` and `index.tsx`'s `head()`.
  **Note:** `og:image` is currently set as a relative path (`/og-image.jpg`)
  since the site has no production domain yet (not deployed/connected to
  Lovable). Once it has a real domain, this should become an absolute URL
  — some platforms require that for the preview to resolve correctly.
- **Structured data**: a `Dentist` (schema.org) JSON-LD block was added
  directly in `RootShell` in `__root.tsx` (not via the `head()` config) —
  name, address, phone, geo coordinates, opening hours, and the real
  4.7★/12-review aggregate rating. This is what enables Google to show
  rich results (stars, hours, "open now") for local search. Note:
  `reviewCount` is a fixed "12" — will go stale as reviews grow, but
  removing it would invalidate the `aggregateRating` block entirely
  (Google requires a count alongside the rating value). Left as-is
  deliberately (2026-10-03) — revisit periodically.
- **`public/sitemap.xml`** — lists `/` and `/book`, referenced from
  `robots.txt`'s `Sitemap:` directive. **Both use a placeholder domain**
  (`https://your-domain.example`) clearly commented in both files — sitemap
  URLs must be absolute to validate, and there's no real production domain
  yet. Replace before launch.

## Dev environment notes

- **Test suite**: `npx vitest run` (`src/test/app-routing.test.tsx`).
  Two things were broken here and are now fixed:
  1. `@testing-library/dom` was missing as an explicit devDependency —
     `@testing-library/react@16` needs it as a peer dependency, and
     `npm install --legacy-peer-deps` (used because `bun` isn't installed
     on this machine) silently skipped it. Installed explicitly.
  2. The test's `renderAt()` helper never called `router.load()` before
     rendering — without it, `RouterProvider` never resolves the initial
     route match in this memory-history test setup, so the DOM stays an
     empty `<div />` and the `waitFor` assertion times out. Now `async`
     and awaits `router.load()` first.
  Also: `useAutoplayVideo` (`src/hooks/use-autoplay-video.ts`) now guards
  `video.play()` with `?.catch()` instead of assuming it always returns a
  Promise — jsdom's stub (used by the test environment) returns `undefined`
  instead, which was crashing any component using the hook (Hero, Clinic)
  whenever rendered under test, tripping the router's error boundary. This
  is a real defensive fix, not test-only scaffolding.
- **Package manager**: this repo's lockfile is `bun.lock` (bun is the
  intended manager), but `bun` isn't installed on this machine, so this
  session has used `npm install --legacy-peer-deps` throughout.
  `package-lock.json` is gitignored since it's a local artifact, not the
  project's real lockfile. Peer-dependency gaps like the one above are the
  main risk of this workaround — if something seems to work in `bun` but
  not here (or vice versa), check for a missing peer dep first.

## Business facts (verified, from the owner)

- **Name:** Viora Dental And Aesthetics — a dental, multispecialty OPD, and
  diagnostic center.
- **Address:** 1st floor, A576, Koel Nagar A Block, Rourkela, Odisha 769014.
  In front of Jagannath Temple (owner-confirmed, 2026-10-03).
- **Phone:** +91 82808 10002
- **Hours:** Tue–Sun 10am–8pm, Monday 10am–12pm only (confirmed by owner,
  2026-10-03 — Google's listing shows this garbled as duplicate "am" ranges,
  decode with caution if re-scraping).
- **Email:** none provided yet — not shown on the site. Add when available.
- **Services:**
  - Dental: root canal treatment (RCT), tooth extraction, tooth-coloured
    fillings, teeth capping, dental implants, oral maxillofacial care.
  - Aesthetics/cosmetology: aesthetic/cosmetic treatments (incl. rhinoplasty
    support), skin & aesthetic care.
- **Audience:** patients (local, walk-in/phone-driven, landmark-oriented —
  "near Jagannath Mandir" is how people actually navigate there).
- **Primary CTA:** Book a consultation (currently implemented as a phone
  call, not an online form).
- **Google Business Profile:** "Viora Dental And Aesthetics" — 4.7★, 12
  reviews. Maps link: https://maps.app.goo.gl/rEvK8hhWjLTW7YT2A
  (coords ~22.259492, 84.887972, used for the embedded map).
- **Doctors** (credentials from `media/Doctor details.png`; real photos from
  `media/Dr Ayesha Roul.jpg` and `media/Dr Kiran Kumar Kanar.png`, now at
  `src/assets/doctor-ayesha-roul.jpg` / `src/assets/doctor-kiran-kanar.jpg` —
  the latter was originally a 1.2MB PNG, converted to a 107KB JPEG since
  it's a photo, not graphics; PNG's lossless compression was pure overhead):
  - Dr. Ayesha Roul — BDS, MDS — Reg. No. 2032(A)
  - Dr. Kiran Kumar Kanar — MBBS, DNB General Surgery — Reg. No. 20093
- **Logo:** real clinic logo (gold tooth + face mark) saved at
  `src/assets/viora-logo.jpg`, sourced from the clinic's Google Business
  photos (384×470, JPEG with white backing — fine for small/nav use, not
  high-res).

## Project history

There was an earlier attempt at this site at `C:\Users\DELL\viora-dental-clinic`
(Next.js, separate git repo, one commit, no remote) — the owner didn't like
that output and abandoned it without reconstructing it. **This folder
(`Desktop/Dental Clinic`) is the current, active rebuild.** No git repo has
been initialized here yet (intentional — not ready to connect to Lovable
yet). Don't confuse the two folders or treat the Next.js one as current.

## Tech stack

- TanStack Start + TanStack Router (file-based routing in `src/routes/`,
  auto-generates `src/routeTree.gen.ts` — don't hand-edit that file), React
  19, Vite, Tailwind CSS v4, shadcn/ui (Radix-based) components in
  `src/components/ui/`.
- Two pages now (`/` and `/book`), no CMS, no backend/stored booking data —
  the booking "system" is client-only (see Pages below).
- Connected to **Lovable** — pushes to the connected branch sync back to the
  Lovable editor. Per `AGENTS.md`: never force-push or rewrite published
  history (no rebase/amend/squash of pushed commits).

## Shared components

- `src/components/nav.tsx` — sticky nav with real logo, 5 anchor links
  (`/#treatments`, `/#clinic`, `/#doctors`, `/#reviews`, `/#book` — leading
  `/` so they work from any page), a "Book" pill linking to `/book`, and a
  mobile hamburger → `Sheet` (from `components/ui/sheet.tsx`) with the same
  links plus a "Book a consultation" CTA. Used on both pages.
- `src/components/footer.tsx` — logo wordmark + 4 links, also shared.
- `src/hooks/use-autoplay-video.ts` — `useAutoplayVideo<T>()` returns a ref
  for a muted/looping `<video>`; handles the explicit `play()`-on-mount
  workaround and `visibilitychange` resume. Used by both Hero and Clinic's
  videos — reuse this instead of duplicating the autoplay logic if another
  video gets added anywhere else.

## Site structure

**`/` (`src/routes/index.tsx`)** — one long component tree:

`Nav → Hero → Stats → Treatments → Clinic → Doctors → Reviews → Book → Footer`

Hero, Treatments, Clinic, Doctors, and the home-page Book section all share
the same ambient background: 3 large blurred, slowly drifting circles
(`viora-drift`/`viora-drift-2` CSS animations in `styles.css`) in
sage/champagne/mauve at 30–40% opacity, `pointer-events-none`, positioned
differently per section so it doesn't read as a copy-paste. Each of those
sections needs a `relative overflow-hidden` outer wrapper with the blobs
as the first children, then the actual content in a `relative` div after
them — follow that pattern if adding this effect to another section.

- **Hero** — eyebrow tag, H1/subcopy, landmark cue ("In front of Jagannath
  Temple, Koel Nagar, Rourkela" linking to the real Maps place page), two
  CTAs ("Book a consultation" → `/book`, "View treatments" → `#treatments`),
  a looping autoplay/muted clinic walkthrough video (replacing the old
  static hero image) with a floating "4.7 · 12 Google reviews" badge (real
  data). Video: `src/assets/clinic-hero.mp4` (H.264, ~1.3MB, 3s loop,
  converted with `ffmpeg` from the original `media/clinic video.mov` —
  Chrome can't play `.mov` at all, needed a remux+re-encode to `.mp4`),
  poster `src/assets/clinic-hero-poster.jpg` for instant paint before load.
  Autoplay is handled by the shared `useAutoplayVideo` hook (see below). A
  native `IntersectionObserver` (no new library) also drives a one-time
  fade/scale entrance animation on the video card when the hero scrolls
  into view (Hero only, not Clinic's video).
- **Stats** — real data: 4.7★ Google rating, 12 Google reviews (2-tile
  centered row).
- **Treatments** — 6 cards, now mapped to the verified service list (each
  card covers 1–2 real services, no image reused, nothing fabricated):
  Root canal & extractions, Tooth-coloured fillings, Teeth capping &
  crowns, Implants & oral surgery, Rhinoplasty support, Skin & aesthetic
  care. The `/book` page's treatment dropdown mirrors these exact titles.
  Has the same ambient drift-blob background as Hero (see below).
- **Clinic** — same clinic walkthrough video as Hero (`clinic-hero.mp4`,
  `aspect-[4/5]`, same autoplay hook), not a static image anymore — the old
  `clinic-portrait.jpg` stock photo is deleted. Deliberately the same loop
  as Hero (owner's choice — only footage available). Plus 3 generic trust
  bullets (board-certified, transparent pricing, calm environment). Same
  ambient drift-blob background as Hero, layered on top of its existing
  `bg-frost/40` tint.
- **Doctors** — real names/credentials/photos (see Business facts above),
  photo cards (aspect 4:5, `object-top` crop since source photos are tall
  phone shots with the face near the top). Same ambient drift-blob
  background as Hero.
- **Reviews** — 3 real Google reviews (Yash Chhatwani, Anjana Sahu, Kirti
  Pattnaik) with a "4.7★ on Google · 12 reviews" link to the real listing.
- **Book** (home section, id="book") — "Book a consultation" (now links to
  `/book`, the form page) + "WhatsApp us" (`wa.me`) CTAs, Hours card (real),
  Contact card (real address + phone, `tel:` link), live Google Maps embed
  + "Get directions" (links to the real place page, not the short link —
  the short link resolved to a photo, not the place page).
- **Footer**.

**`/book` (`src/routes/book.tsx`)** — the dedicated booking page:

- Form: Name, Phone (required), Preferred date (native date input),
  Preferred time of day (Morning/Afternoon/Evening select), Treatment
  (select, mirrors the 6 Treatments cards + "Not sure"), Notes (optional).
- On submit: builds a formatted multi-line message from the fields and
  opens `wa.me/918280810002?text=...` with it pre-filled — **no backend, no
  stored data, no secrets.** The clinic confirms manually over WhatsApp.
- Below the form: a plain "Prefer to call? +91 82808 10002" fallback.
- Hand-styled native inputs (not shadcn `Input`/`Select`) to match the
  site's bespoke frost/ink/champagne look rather than generic shadcn
  tokens.

## Known gaps / deferred work

Nothing open from the original UX/IA audit list — all items are done.

No CMS or stored-data backend exists — if the clinic later wants booking
requests to land somewhere other than WhatsApp (email, a dashboard), that's
a real infra decision (email service + API key, or a database) and should
be discussed before building, same as the booking page itself was.

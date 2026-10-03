# Viora Dental & Aesthetic Clinic — Website Context

Reference doc for future sessions. Covers the business, the site's current
state, and known gaps. Not a replacement for reading the code — see
`src/routes/index.tsx` for the actual page.

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
  `src/assets/doctor-ayesha-roul.jpg` / `src/assets/doctor-kiran-kanar.png`):
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

## Site structure

**`/` (`src/routes/index.tsx`)** — one long component tree:

`Nav → Hero → Stats → Treatments → Clinic → Doctors → Reviews → Book → Footer`

- **Hero** — eyebrow tag, H1/subcopy, landmark cue ("In front of Jagannath
  Temple, Koel Nagar, Rourkela" linking to the real Maps place page), two
  CTAs ("Book a consultation" → `/book`, "View treatments" → `#treatments`),
  a looping autoplay/muted clinic walkthrough video (replacing the old
  static hero image) with a floating "4.7 · 12 Google reviews" badge (real
  data). Video: `src/assets/clinic-hero.mp4` (H.264, ~1.3MB, 3s loop,
  converted with `ffmpeg` from the original `media/clinic video.mov` —
  Chrome can't play `.mov` at all, needed a remux+re-encode to `.mp4`),
  poster `src/assets/clinic-hero-poster.jpg` for instant paint before load.
  Autoplay is triggered by an explicit `video.play()` on mount (React's
  `muted` JSX prop doesn't reliably set the attribute in time for the
  browser's autoplay gate — this is a known React/video gotcha), plus a
  `visibilitychange` listener that resumes playback if the browser pauses
  it for being backgrounded. A native `IntersectionObserver` (no new
  library) drives a one-time fade/scale entrance animation on the video
  card when the hero scrolls into view.
- **Stats** — real data: 4.7★ Google rating, 12 Google reviews (2-tile
  centered row).
- **Treatments** — 6 cards, now mapped to the verified service list (each
  card covers 1–2 real services, no image reused, nothing fabricated):
  Root canal & extractions, Tooth-coloured fillings, Teeth capping &
  crowns, Implants & oral surgery, Rhinoplasty support, Skin & aesthetic
  care. The `/book` page's treatment dropdown mirrors these exact titles.
- **Clinic** — portrait image + 3 generic trust bullets (board-certified,
  transparent pricing, calm environment).
- **Doctors** — real names/credentials/photos (see Business facts above),
  photo cards (aspect 4:5, `object-top` crop since source photos are tall
  phone shots with the face near the top).
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

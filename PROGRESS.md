# SR Fashions Marketing Site — Plain HTML/CSS/JS + Firebase

Converts the uploaded Next.js project into plain HTML/CSS/JS. No build
step, no Node.js needed to run or edit it — open files directly or deploy
as static files. Firebase (free tier is plenty for this) replaces the
old JSON-file + JWT backend, since a static site has no server of its own
to write files to.

## How content storage works

- Every content section (hero, services, gallery, testimonials, about,
  FAQ, settings) lives as one Firestore document under `content/{name}` —
  same shape as the original `data/*.json` files.
- Images are uploaded to Firebase Storage; only the resulting **URL** is
  saved into the Firestore document. The site always displays images by
  URL — nothing about "storage" means storing image bytes in the database.
- Anyone can **read** content (that's the public website). Only the one
  admin account (matched by email, hardcoded in `firestore.rules` /
  `storage.rules`) can **write**.

## Completed (milestone 1 — data + auth foundation)

- `css/tokens.css`, `css/components.css`, `css/site.css` — same design
  system as before (Wine/Antique Gold/Ivory Silk, running-stitch divider)
- `js/firebase-config.js` — Firebase init, plus the single `ADMIN_EMAIL` constant
- `js/content-store.js` — `getContent`/`watchContent`/`saveContent` per domain
- `js/defaults.js` — real fallback content seeded verbatim from your
  uploaded `data/*.json` files, so the site isn't blank before first save
- `js/upload.js` — image upload → Storage → returns URL to save
- `js/admin/auth.js` — register/login/signOut/`requireAdmin()` guard
- `admin/register.html`, `admin/login.html`
- `firestore.rules`, `storage.rules` — single hardcoded admin email

## Completed (milestone 2 — all public pages)

- `js/chrome.js` — shared header/nav/footer/floating WhatsApp+Call buttons,
  rendered from Settings content so contact info only needs editing once
  (in the admin, later) instead of in every HTML file
- `index.html` + `js/pages/home.js` — hero, why-trust-us, services preview,
  gallery preview, testimonials, CTA banner
- `pages/about.html` + `about.js` — Seema Thakur's story, mission/vision,
  why-trust-us list, FAQ accordion-style list
- `pages/services.html` + `services.js` — all 6 services with images
- `pages/gallery.html` + `gallery.js` — full grid with category filter
  (bridal/party-wear/designer/custom-stitching)
- `pages/contact.html` + `contact.js` — business info + inquiry form,
  submissions saved to a Firestore `inquiries` collection (public can
  create, only admin can read/manage — added the matching rule)

## Completed (milestone 3 — admin shell + first CMS pages)

- `css/admin.css` — sidebar layout, repeater items, image previews, toast notifications
- `js/admin/shell.js` — `initAdminShell()`: renders the sidebar nav (9 sections)
  and gates every admin page behind `requireAdmin()` in one call
- `js/admin/toast.js` — save/error toast notifications
- `admin/dashboard.html` — live stats (new inquiries, gallery count, services
  count) + quick links
- `admin/hero.html` + `admin-hero.js` — full hero editor including background
  image upload/replace
- `admin/gallery.html` + `admin-gallery.js` — add photo (upload → Storage →
  URL saved), delete photo, category picker

## Completed (milestone 4 — remaining admin pages + PWA + docs)

- `admin/services.html` + `admin-services.js` — add/edit/delete, optional
  image per service
- `admin/testimonials.html` + `admin-testimonials.js` — add/delete, star rating
- `admin/about.html` + `admin-about.js` — story/mission/vision/why-trust-us,
  plus a full FAQ add/delete repeater on the same page
- `admin/settings.html` + `admin-settings.js` — brand/contact/address/hours,
  feeds the header/footer/floating buttons on every public page
- `admin/inquiries.html` + `admin-inquiries.js` — reads Contact form
  submissions, mark handled / delete
- `admin/password.html` + `admin-password.js` — change password (re-
  authenticates with current password first, per Firebase's requirement)
- `manifest.webmanifest`, `sw.js`, `offline.html`, `icons/` — reused from
  the other project, shortcuts/description corrected for this site's actual
  pages
- `docs/SETUP.md` — Firebase project setup specific to this site, plus a
  summary of what changed vs. the original Next.js version

## Completed (milestone 5 — final parity pass against the original)

Checked the uploaded project's component list against what had been built
and added the pieces that were missing from the homepage:

- **Boutique Intro** — story teaser with a bridal photo, years-of-craft /
  outfits-stitched stats, and a link to the full About page
- **Featured Bridal Collection** — a 4-item bridal-only preview grid
  (separate from the general gallery preview)
- **Google Reviews placeholder badge** — matches the original's
  4.9★/120+ reviews placeholder, pending real Google Business Profile integration
- **Newsletter signup** — saves to a new `newsletter` Firestore collection
  (public create, admin-only read — same pattern as inquiries; added the
  matching security rule)
- **Scroll-to-top button** — appears after scrolling 400px, on every page
  (added to the shared `pwa.js` so no page needed individual wiring)

## Status: complete

Every section from the original uploaded project now has a plain
HTML/CSS/JS equivalent — 5 public pages (with 9 homepage sections) + 9
admin pages, all backed by Firebase. No build step anywhere.

**What you still need to do yourself** (can't be done without your live
Firebase project): fill in `js/firebase-config.js`, deploy the security
rules, and register your admin account once — all three steps are in
`docs/SETUP.md`.

## Note on the admin password

Your password was never written into any file — `admin/register.html`
creates the Firebase Auth account directly when you submit the form once,
so Firebase stores it (hashed) on Google's servers, not in this codebase.
Use the email/password you gave me once, on that page, after Firebase is
connected (see the setup doc once it's written).

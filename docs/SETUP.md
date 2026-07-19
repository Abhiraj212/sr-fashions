# Setup — SR Fashions Marketing Site

## 1. Create a Firebase project

Follow the same steps as `docs/GITHUB_SETUP.md`/`docs/FIREBASE_SETUP.md` in
the other SR Fashions project if you have it — or briefly:

1. [Firebase Console](https://console.firebase.google.com) → Add project.
2. Enable **Authentication** → Email/Password sign-in method.
3. Enable **Firestore Database** → start in production mode.
4. Enable **Storage** → start in production mode.
5. Project Settings → General → Your apps → add a Web app → copy the config
   object.

## 2. Fill in your Firebase config

Open `js/firebase-config.js` and replace the `REPLACE_ME` values with the
config from step 1.

## 3. Deploy the security rules

Install the Firebase CLI once (needs Node.js — or do this from GitHub
Codespaces if your machine can't run Node, see `docs/GITHUB_SETUP.md` in
the other project for that path):

```bash
npm install -g firebase-tools
firebase login
firebase init firestore storage hosting
# When it asks for your public folder, enter: .
# When it asks about rewriting all URLs to /index.html, say No (multi-page site)
firebase deploy --only firestore:rules,storage:rules
```

## 4. Create your admin account

1. Open `admin/register.html` (either locally, or on the deployed site).
2. Enter the email address the site is locked to (`skatoch829@gmail.com`)
   and choose your password there — nowhere else.
3. You'll land on the dashboard automatically.

From then on, use `admin/login.html`.

## 5. Deploy the site

```bash
firebase deploy --only hosting
```

That's it — no build step. Every file in this folder is served as-is.

## 6. Seeding real content

The site launches with the real content from your original project already
built in as **fallback defaults** (`js/defaults.js`) — so it looks right
immediately, even before you've saved anything in the admin. The first time
you save any section in the admin (Hero, Services, etc.), that becomes the
live version in Firestore and the fallback is no longer used for that
section.

## What's different from the original Next.js version

- No build step, no `npm run build`, no Node.js needed to run it.
- Content lives in Firestore instead of `data/*.json` files on a server —
  this is what makes admin edits show up live on a static site with no
  server of its own.
- Images are uploaded to Firebase Storage and referenced by URL, instead of
  living in the project's `public/gallery/` folder.
- Admin auth is Firebase Authentication instead of the original JWT/bcrypt
  cookie system — same idea (one trusted admin), different mechanism, no
  server needed to verify it.

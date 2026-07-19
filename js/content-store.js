import {
  doc, getDoc, setDoc, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase-config.js";
import { DEFAULT_CONTENT } from "./defaults.js";

const COLLECTION = "content";

/**
 * Every content domain (hero, services, gallery, testimonials, about, faq,
 * settings) is one Firestore document under content/{domain} — same shape
 * as the original project's data/<name>.json files, so nothing about how
 * pages consume the data had to change, only where it's read from.
 *
 * Falls back to DEFAULT_CONTENT (seeded from the real site copy) if the
 * document doesn't exist yet — the site never shows a blank page on first
 * run, before an admin has saved anything.
 */
export async function getContent(domain) {
  const snap = await getDoc(doc(db, COLLECTION, domain));
  if (snap.exists()) return snap.data().value;
  return DEFAULT_CONTENT[domain];
}

/** Live-updates a callback whenever a content domain changes — used on public pages so edits show up without a manual refresh. */
export function watchContent(domain, callback) {
  return onSnapshot(doc(db, COLLECTION, domain), (snap) => {
    callback(snap.exists() ? snap.data().value : DEFAULT_CONTENT[domain]);
  });
}

/** Admin-only (enforced by firestore.rules matching ADMIN_EMAIL, not by this function). */
export async function saveContent(domain, value) {
  await setDoc(doc(db, COLLECTION, domain), {
    value,
    updatedAt: new Date().toISOString(),
  });
}

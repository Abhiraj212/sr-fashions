import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as fbSignOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth, ADMIN_EMAIL } from "../firebase-config.js";

export async function register(email, password) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    throw new Error("This site only allows one specific admin email to register.");
  }
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export function signOut() {
  return fbSignOut(auth);
}

/**
 * Redirects to login if not signed in as the admin, or resolves with the
 * user otherwise. Call at the top of every admin page's script.
 * Security is actually enforced by firestore.rules/storage.rules (which
 * check the same ADMIN_EMAIL match) — this guard is for UX (don't show the
 * page), not the real security boundary.
 */
export function requireAdmin() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        window.location.href = "/admin/login.html";
        return;
      }
      resolve(user);
    });
  });
}

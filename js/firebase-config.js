// Firebase config — fill in from Firebase Console → Project Settings →
// General → Your apps. See ../docs/SETUP.md.
// No build step: this is a native browser ES module.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiHBcuStDp95PXYtdnl1hG7eEAh88T2XQ",
  authDomain: "sr-fashions-dd616.firebaseapp.com",
  projectId: "sr-fashions-dd616",
  storageBucket: "sr-fashions-dd616.firebasestorage.app",
  messagingSenderId: "955675198029",
  appId: "1:955675198029:web:1164c4dde991247d709204",
};

// The only account allowed to write content. Matched directly against the
// signed-in user's email in firestore.rules and storage.rules — no Cloud
// Functions or custom claims needed for a single-admin site like this one.
export const ADMIN_EMAIL = "skatoch829@gmail.com";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

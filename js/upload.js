import {
  ref, uploadBytes, getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { storage } from "./firebase-config.js";

/**
 * Uploads a File to Storage under images/{folder}/{timestamp-filename} and
 * returns its public download URL. That URL is what gets saved into the
 * Firestore content doc (e.g. gallery item `.image`, hero `.backgroundImage`)
 * — the site always shows images by URL, never stores image bytes in
 * Firestore itself.
 */
export async function uploadImage(file, folder = "general") {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `images/${folder}/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

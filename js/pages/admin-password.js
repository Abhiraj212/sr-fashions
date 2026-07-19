import { initAdminShell } from "../admin/shell.js";
import { auth } from "../firebase-config.js";
import {
  EmailAuthProvider, reauthenticateWithCredential, updatePassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { showToast } from "../admin/toast.js";
import { $ } from "../dom.js";

const user = await initAdminShell();

const form = $("#password-form");
const errorBox = $("#error");
const submitText = $("#submit-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.style.display = "none";

  const current = $("#current").value;
  const new1 = $("#new1").value;
  const new2 = $("#new2").value;

  if (new1 !== new2) {
    errorBox.style.display = "block";
    errorBox.querySelector(".error-text").textContent = "New passwords don't match.";
    return;
  }

  submitText.textContent = "Updating…";
  try {
    // Firebase requires a recent sign-in before allowing a password change —
    // this re-proves identity with the current password first.
    const credential = EmailAuthProvider.credential(user.email, current);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, new1);
    showToast("Password updated.");
    form.reset();
  } catch (err) {
    errorBox.style.display = "block";
    errorBox.querySelector(".error-text").textContent =
      err.code === "auth/invalid-credential" ? "Current password is incorrect." : err.message;
  } finally {
    submitText.textContent = "Update password";
  }
});

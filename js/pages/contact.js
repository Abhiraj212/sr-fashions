import { getContent } from "../content-store.js";
import { renderChrome } from "../chrome.js";
import { $ } from "../dom.js";
import { db } from "../firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

await renderChrome();

getContent("settings").then((settings) => {
  $("#address").textContent = settings.address;
  $("#hours").textContent = settings.hours;
  $("#phones").innerHTML = `<a href="tel:${settings.contact.phonePrimaryRaw}" class="text-wine">${settings.contact.phonePrimary}</a> · <a href="tel:${settings.contact.phoneSecondary.replace(/\D/g, "")}" class="text-wine">${settings.contact.phoneSecondary}</a>`;
  $("#email").innerHTML = `<a href="mailto:${settings.contact.email}" class="text-wine">${settings.contact.email}</a>`;
});

const form = $("#contact-form");
const statusBox = $("#form-status");
const submitText = $("#submit-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitText.textContent = "Sending…";
  statusBox.style.display = "none";

  const name = $("#name").value;
  const phone = $("#phone").value;
  const message = $("#message").value;

  try {
    // Public-writable, admin-readable-only collection — see firestore.rules.
    // No email/SMS dispatch exists in this plain-JS build (that needed a
    // server); the admin dashboard's Inquiries page is where these show up.
    await addDoc(collection(db, "inquiries"), {
      name,
      phone,
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    });
    form.style.display = "none";
    statusBox.style.display = "block";
    statusBox.innerHTML = '<p style="color:var(--color-sage); font-weight:600;">Thank you — we\'ll get back to you soon. For faster response, call us directly.</p>';
  } catch (err) {
    statusBox.style.display = "block";
    statusBox.innerHTML = `<span class="error-text">Something went wrong — please call us instead.</span>`;
    submitText.textContent = "Send inquiry";
  }
});

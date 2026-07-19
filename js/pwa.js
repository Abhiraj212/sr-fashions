// Registers the service worker and wires up the install-prompt banner.
// Include on every page: <script type="module" src="/js/pwa.js"></script>

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}

let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById("install-banner");
  if (banner) banner.classList.add("visible");
});

document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("install-btn");
  const dismissBtn = document.getElementById("install-dismiss");
  const banner = document.getElementById("install-banner");

  installBtn?.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    banner?.classList.remove("visible");
  });

  dismissBtn?.addEventListener("click", () => {
    banner?.classList.remove("visible");
  });

  // ---- Scroll to top ----
  const scrollBtn = document.createElement("button");
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.textContent = "↑";
  scrollBtn.style.cssText =
    "position:fixed; left:1rem; bottom:2rem; z-index:40; width:2.75rem; height:2.75rem; border-radius:50%; " +
    "background:var(--color-ink); color:var(--color-ivory); border:none; font-size:1.125rem; cursor:pointer; " +
    "box-shadow:var(--shadow-card); display:none;";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// SR Fashions service worker.
//
// Strategy:
// - App shell (icons, manifest, fonts, built JS/CSS) — cache-first, since
//   these are versioned by Next.js build hashes and safe to cache long-term.
// - Pages (navigations) — network-first with a cached fallback, so content
//   stays fresh when online but the site still opens offline.
// - Firebase Functions calls (callable HTTPS requests) are NEVER cached —
//   order status, prices, and availability must always be live. See the
//   fetch handler below, which explicitly bypasses the cache for any
//   request to *.cloudfunctions.net or the Functions emulator.
// - Bump CACHE_VERSION on every deploy that changes cached assets so old
//   caches get cleaned up in `activate`.

const CACHE_VERSION = "sr-fashions-marketing-v1";
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/offline.html",
];

const NEVER_CACHE_HOSTS = ["cloudfunctions.net", "firestore.googleapis.com", "firebasestorage.googleapis.com"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never intercept Firebase API traffic — always hit the network directly.
  if (NEVER_CACHE_HOSTS.some((host) => url.hostname.includes(host))) {
    return;
  }

  // Only handle same-origin GET requests below.
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Navigations (page loads): network-first, falling back to cache, then
  // to a dedicated offline page.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  // Static assets: cache-first.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});

// ---- Push notifications ----
// Payload shape sent from backend/functions/src/notifications/channels/push.ts
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const payload = event.data.json();
  event.waitUntil(
    self.registration.showNotification(payload.notification?.title ?? "SR Fashions", {
      body: payload.notification?.body ?? "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-96.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/"));
});

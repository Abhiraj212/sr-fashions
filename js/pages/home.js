import { getContent } from "../content-store.js";
import { renderChrome } from "../chrome.js";
import { $, el } from "../dom.js";
import { db } from "../firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

await renderChrome();

// ---- Boutique intro (story teaser) ----
Promise.all([getContent("about"), getContent("settings"), getContent("gallery")]).then(([about, settings, gallery]) => {
  $("#intro-eyebrow").textContent = `Est. ${settings.brand.established}`;
  $("#intro-story").textContent = about.story;
  $("#intro-years").textContent = `${about.yearsOfExperience}+`;
  const bridalImage = gallery.find((g) => g.category === "bridal");
  if (bridalImage) $("#intro-image").src = bridalImage.image;
});

// ---- Featured bridal collection ----
getContent("gallery").then((items) => {
  const bridalItems = items.filter((i) => i.category === "bridal").slice(0, 4);
  const grid = $("#bridal-grid");
  bridalItems.forEach((item, i) => {
    grid.append(
      el("div", {
        class: "gallery-item",
        style: i === 0 ? "grid-column: span 2; grid-row: span 2;" : "",
      }, [el("img", { src: item.image, alt: item.title, loading: "lazy" })])
    );
  });
});

// ---- Hero ----
getContent("hero").then((hero) => {
  $("#hero-eyebrow").textContent = hero.eyebrow;
  const h1 = $("#hero-headline");
  h1.textContent = hero.headline;
  h1.style.fontSize = "";
  h1.className = "";
  h1.style.cssText = "font-size:3rem; font-weight:600; line-height:1.05; margin-top:1rem;";
  $("#hero-subheadline").textContent = hero.subheadline;
  $("#hero-description").textContent = hero.description;
  $("#hero-primary-cta").textContent = hero.primaryCtaLabel;
  $("#hero-primary-cta").href = hero.primaryCtaHref;
  $("#hero-secondary-cta").textContent = hero.secondaryCtaLabel;
  $("#hero-secondary-cta").href = hero.secondaryCtaHref;
});

// ---- Why trust us (from About) ----
getContent("about").then((about) => {
  const grid = $("#why-trust-us");
  for (const reason of about.whyTrustUs) {
    grid.append(
      el("div", { class: "card" }, [
        el("div", { class: "card-body" }, [el("p", { text: reason })]),
      ])
    );
  }
});

// ---- Services (first 6) ----
getContent("services").then((services) => {
  const grid = $("#services-grid");
  for (const service of services) {
    grid.append(
      el("div", { class: "card" }, [
        el("div", { class: "card-body" }, [
          el("h3", { text: service.title, style: "font-size:1.125rem;" }),
          el("p", { text: service.shortDescription, class: "mt-2 text-muted", style: "font-size:0.875rem;" }),
        ]),
      ])
    );
  }
});

// ---- Gallery preview (first 6) ----
getContent("gallery").then((items) => {
  const grid = $("#gallery-grid");
  for (const item of items.slice(0, 6)) {
    grid.append(
      el("div", { class: "gallery-item" }, [
        el("img", { src: item.image, alt: item.title, loading: "lazy" }),
      ])
    );
  }
});

// ---- Newsletter signup ----
const newsletterForm = $("#newsletter-form");
newsletterForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = $("#newsletter-email").value;
  try {
    // Public-writable, admin-readable-only — same pattern as inquiries.
    await addDoc(collection(db, "newsletter"), { email, createdAt: new Date().toISOString() });
    newsletterForm.style.display = "none";
    $("#newsletter-status").style.display = "block";
  } catch {
    // Fail quietly here — a newsletter signup isn't critical enough to
    // interrupt the visitor with an error message.
  }
});

// ---- Testimonials ----
getContent("testimonials").then((testimonials) => {
  const grid = $("#testimonials-grid");
  for (const t of testimonials) {
    const stars = "★".repeat(t.rating) + "☆".repeat(5 - t.rating);
    grid.append(
      el("div", { class: "card" }, [
        el("div", { class: "card-body" }, [
          el("div", { class: "review-stars", text: stars }),
          el("p", { class: "mt-2", style: "font-size:0.875rem;", text: `“${t.quote}”` }),
          el("p", { class: "mt-4", style: "font-weight:600;", text: `${t.name}, ${t.location}` }),
          el("p", { class: "text-muted", style: "font-size:0.75rem;", text: t.occasion }),
        ]),
      ])
    );
  }
});

import { getContent } from "../content-store.js";
import { el, $ } from "../dom.js";

const NAV_LINKS = [
  { href: "/index.html", label: "Home" },
  { href: "/pages/about.html", label: "About" },
  { href: "/pages/services.html", label: "Services" },
  { href: "/pages/gallery.html", label: "Gallery" },
  { href: "/pages/contact.html", label: "Contact" },
];

export async function renderHeader() {
  const mount = $("#site-header");
  if (!mount) return;
  const settings = await getContent("settings");

  const path = window.location.pathname;

  mount.innerHTML = "";
  mount.append(
    el("div", { class: "measuring-tape" }),
    el("div", { class: "container header-inner" }, [
      el("a", { href: "/index.html", class: "brand" }, [
        "SR Fashions",
        el("span", { class: "tag", text: settings.brand.boutiqueName }),
      ]),
      el(
        "nav",
        { class: "nav-links" },
        NAV_LINKS.map((link) =>
          el("a", {
            href: link.href,
            text: link.label,
            style: path.endsWith(link.href) ? "color:var(--color-wine);" : "",
          })
        )
      ),
      el("a", { href: "/pages/contact.html", class: "btn btn-primary", text: "Book a Consultation" }),
    ])
  );
}

export async function renderFooter() {
  const mount = $("#site-footer");
  if (!mount) return;
  const settings = await getContent("settings");

  mount.innerHTML = "";
  mount.append(
    el("div", { class: "container mt-4" }, [el("span", { class: "stitch stitch-light stitch-full" })]),
    el("div", { class: "container footer-grid" }, [
      el("div", {}, [
        el("p", { style: "font-family:var(--font-display); font-size:1.25rem;", text: settings.brand.name }),
        el("p", { class: "mt-1", text: settings.brand.boutiqueName }),
        el("p", { class: "mt-4", text: settings.address }),
      ]),
      el("div", {}, [
        el("h4", { text: "Contact" }),
        el("p", { class: "mt-2", text: settings.contact.email }),
        el("p", { class: "mt-1", text: `${settings.contact.phonePrimary} · ${settings.contact.phoneSecondary}` }),
      ]),
      el("div", {}, [el("h4", { text: "Hours" }), el("p", { class: "mt-2", text: settings.hours })]),
    ]),
    el("div", { class: "container footer-bottom", text: `© ${new Date().getFullYear()} ${settings.brand.name}. All rights reserved.` })
  );
}

/** Floating WhatsApp + Call buttons, present on every page. */
export async function renderFloatingButtons() {
  const mount = $("#floating-buttons");
  if (!mount) return;
  const settings = await getContent("settings");

  mount.innerHTML = "";
  mount.append(
    el(
      "a",
      {
        href: `https://wa.me/${settings.contact.whatsappNumber}`,
        target: "_blank",
        rel: "noopener",
        "aria-label": "Chat on WhatsApp",
        style:
          "position:fixed; right:1rem; bottom:5.5rem; z-index:40; width:3rem; height:3rem; border-radius:50%; background:#25D366; color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.5rem; text-decoration:none; box-shadow:var(--shadow-card);",
      },
      "💬"
    ),
    el(
      "a",
      {
        href: `tel:${settings.contact.phonePrimaryRaw}`,
        "aria-label": "Call the boutique",
        style:
          "position:fixed; right:1rem; bottom:2rem; z-index:40; width:3rem; height:3rem; border-radius:50%; background:var(--color-wine); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.25rem; text-decoration:none; box-shadow:var(--shadow-card);",
      },
      "📞"
    )
  );
}

export async function renderChrome() {
  await Promise.all([renderHeader(), renderFooter(), renderFloatingButtons()]);
}

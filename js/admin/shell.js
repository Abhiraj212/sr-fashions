import { requireAdmin, signOut } from "./auth.js";
import { $, el } from "../dom.js";

const NAV_ITEMS = [
  { href: "/admin/dashboard.html", label: "Dashboard" },
  { href: "/admin/hero.html", label: "Hero" },
  { href: "/admin/services.html", label: "Services" },
  { href: "/admin/gallery.html", label: "Gallery" },
  { href: "/admin/testimonials.html", label: "Testimonials" },
  { href: "/admin/about.html", label: "About & FAQ" },
  { href: "/admin/inquiries.html", label: "Inquiries" },
  { href: "/admin/settings.html", label: "Settings" },
  { href: "/admin/password.html", label: "Change Password" },
];

/**
 * Call at the top of every admin page. Renders the sidebar into
 * #admin-sidebar, gates the page behind requireAdmin(), and returns the
 * signed-in user once resolved.
 */
export async function initAdminShell() {
  const user = await requireAdmin();

  const mount = $("#admin-sidebar");
  if (mount) {
    const path = window.location.pathname;
    mount.innerHTML = "";
    mount.append(
      el("div", { style: "padding:1.25rem; border-bottom:1px solid rgba(36,27,30,0.1);" }, [
        el("p", { style: "font-family:var(--font-display); font-size:1.125rem; font-weight:600;", text: "SR Fashions" }),
        el("p", { class: "text-muted", style: "font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;", text: "Admin" }),
      ]),
      el(
        "nav",
        { style: "flex:1; overflow-y:auto; padding:0.75rem;" },
        NAV_ITEMS.map((item) =>
          el("a", {
            href: item.href,
            text: item.label,
            style: `display:block; margin-bottom:0.25rem; border-radius:var(--radius); padding:0.5rem 0.75rem; font-size:0.875rem; font-weight:500; text-decoration:none; ${
              path.endsWith(item.href)
                ? "background:var(--color-wine); color:var(--color-ivory);"
                : "color:rgba(36,27,30,0.8);"
            }`,
          })
        )
      ),
      el("div", { style: "padding:0.75rem; border-top:1px solid rgba(36,27,30,0.1);" }, [
        el("button", {
          text: "Sign out",
          style: "width:100%; text-align:left; background:none; border:none; padding:0.5rem 0.75rem; font-size:0.875rem; color:rgba(36,27,30,0.6); cursor:pointer;",
          onClick: async () => {
            await signOut();
            window.location.href = "/admin/login.html";
          },
        }),
      ])
    );
  }

  return user;
}

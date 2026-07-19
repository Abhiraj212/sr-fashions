import { initAdminShell } from "../admin/shell.js";
import { getContent, saveContent } from "../content-store.js";
import { showToast } from "../admin/toast.js";
import { $, el } from "../dom.js";

await initAdminShell();

let items = await getContent("testimonials");

function renderList() {
  const container = $("#testimonials-list");
  container.innerHTML = "";
  for (const item of items) {
    const stars = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);
    container.append(
      el("div", { class: "repeater-item" }, [
        el("div", { class: "flex-between" }, [
          el("p", { style: "font-weight:600;", text: `${item.name}, ${item.location}` }),
          el("span", { class: "review-stars", text: stars }),
        ]),
        el("p", { class: "mt-2 text-muted", style: "font-size:0.875rem;", text: `“${item.quote}”` }),
        el("p", { class: "text-muted mt-1", style: "font-size:0.75rem;", text: item.occasion }),
        el("div", { class: "repeater-actions" }, [
          el("button", {
            class: "btn btn-ghost btn-sm text-wine",
            text: "Delete",
            onClick: async () => {
              if (!confirm(`Remove this testimonial from ${item.name}?`)) return;
              items = items.filter((i) => i.id !== item.id);
              await saveContent("testimonials", items);
              renderList();
              showToast("Testimonial removed.");
            },
          }),
        ]),
      ])
    );
  }
}
renderList();

$("#add-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const newItem = {
    id: `t${Date.now()}`,
    name: $("#new-name").value,
    location: $("#new-location").value,
    rating: Number($("#new-rating").value),
    occasion: $("#new-occasion").value,
    quote: $("#new-quote").value,
  };
  items = [...items, newItem];
  await saveContent("testimonials", items);
  renderList();
  e.target.reset();
  showToast("Testimonial added.");
});

import { getContent } from "../content-store.js";
import { renderChrome } from "../chrome.js";
import { $, el } from "../dom.js";

await renderChrome();

const CATEGORY_LABELS = {
  bridal: "Bridal",
  "party-wear": "Party Wear",
  designer: "Designer",
  "custom-stitching": "Custom Stitching",
};

let allItems = [];
let activeCategory = "all";

function renderGrid() {
  const grid = $("#gallery-grid");
  grid.innerHTML = "";
  const items = activeCategory === "all" ? allItems : allItems.filter((i) => i.category === activeCategory);
  for (const item of items) {
    grid.append(
      el("div", { class: "gallery-item" }, [
        el("img", { src: item.image, alt: item.title, loading: "lazy" }),
      ])
    );
  }
}

function renderFilters(categories) {
  const container = $("#category-filters");
  const options = ["all", ...categories];
  container.innerHTML = "";
  for (const cat of options) {
    const btn = el("button", {
      class: cat === activeCategory ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm",
      text: cat === "all" ? "All" : CATEGORY_LABELS[cat] || cat,
      onClick: () => {
        activeCategory = cat;
        renderFilters(categories);
        renderGrid();
      },
    });
    container.append(btn);
  }
}

getContent("gallery").then((items) => {
  allItems = items;
  const categories = [...new Set(items.map((i) => i.category))];
  renderFilters(categories);
  renderGrid();
});

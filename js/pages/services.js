import { getContent } from "../content-store.js";
import { renderChrome } from "../chrome.js";
import { $, el } from "../dom.js";

await renderChrome();

getContent("services").then((services) => {
  const grid = $("#services-grid");
  for (const service of services) {
    grid.append(
      el("div", { class: "card" }, [
        service.image
          ? el("img", { src: service.image, alt: service.title, style: "width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:var(--radius-lg) var(--radius-lg) 0 0;" })
          : null,
        el("div", { class: "card-body" }, [
          el("h3", { text: service.title, style: "font-size:1.125rem;" }),
          el("p", { text: service.shortDescription, class: "mt-2 text-muted", style: "font-size:0.9375rem;" }),
        ]),
      ])
    );
  }
});

import { getContent } from "../content-store.js";
import { renderChrome } from "../chrome.js";
import { $, el } from "../dom.js";

await renderChrome();

getContent("about").then((about) => {
  $("#story").textContent = about.story;
  $("#owner-intro").textContent = about.ownerIntro;
  $("#mission").textContent = about.mission;
  $("#vision").textContent = about.vision;

  const list = $("#why-trust-us");
  for (const reason of about.whyTrustUs) {
    list.append(el("li", { text: reason }));
  }
});

getContent("faq").then((faqs) => {
  const container = $("#faq-list");
  for (const faq of faqs) {
    container.append(
      el("div", { class: "card mt-4" }, [
        el("div", { class: "card-body" }, [
          el("h3", { text: faq.question, style: "font-size:1rem;" }),
          el("p", { text: faq.answer, class: "mt-2 text-muted", style: "font-size:0.9375rem;" }),
        ]),
      ])
    );
  }
});

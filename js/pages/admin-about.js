import { initAdminShell } from "../admin/shell.js";
import { getContent, saveContent } from "../content-store.js";
import { showToast } from "../admin/toast.js";
import { $, el } from "../dom.js";

await initAdminShell();

// ---- About ----
let about = await getContent("about");

$("#story").value = about.story;
$("#ownerIntro").value = about.ownerIntro;
$("#mission").value = about.mission;
$("#vision").value = about.vision;
$("#yearsOfExperience").value = about.yearsOfExperience;
$("#whyTrustUs").value = about.whyTrustUs.join("\n");

$("#about-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitText = $("#submit-text");
  submitText.textContent = "Saving…";

  about = {
    story: $("#story").value,
    ownerIntro: $("#ownerIntro").value,
    mission: $("#mission").value,
    vision: $("#vision").value,
    yearsOfExperience: Number($("#yearsOfExperience").value),
    whyTrustUs: $("#whyTrustUs").value.split("\n").map((s) => s.trim()).filter(Boolean),
  };
  await saveContent("about", about);
  submitText.textContent = "Save About";
  showToast("About section saved.");
});

// ---- FAQ ----
let faqs = await getContent("faq");

function renderFaqs() {
  const container = $("#faq-list");
  container.innerHTML = "";
  for (const faq of faqs) {
    container.append(
      el("div", { class: "repeater-item" }, [
        el("p", { style: "font-weight:600;", text: faq.question }),
        el("p", { class: "mt-2 text-muted", style: "font-size:0.875rem;", text: faq.answer }),
        el("div", { class: "repeater-actions" }, [
          el("button", {
            class: "btn btn-ghost btn-sm text-wine",
            text: "Delete",
            onClick: async () => {
              if (!confirm("Remove this FAQ?")) return;
              faqs = faqs.filter((f) => f.id !== faq.id);
              await saveContent("faq", faqs);
              renderFaqs();
              showToast("FAQ removed.");
            },
          }),
        ]),
      ])
    );
  }
}
renderFaqs();

$("#faq-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  faqs = [...faqs, { id: `faq${Date.now()}`, question: $("#new-q").value, answer: $("#new-a").value }];
  await saveContent("faq", faqs);
  renderFaqs();
  e.target.reset();
  showToast("FAQ added.");
});

import { initAdminShell } from "../admin/shell.js";
import { getContent, saveContent } from "../content-store.js";
import { uploadImage } from "../upload.js";
import { showToast } from "../admin/toast.js";
import { $ } from "../dom.js";

await initAdminShell();

let current = await getContent("hero");

const fields = ["eyebrow", "headline", "subheadline", "description", "primaryCtaLabel", "primaryCtaHref", "secondaryCtaLabel", "secondaryCtaHref"];
for (const field of fields) {
  $(`#${field}`).value = current[field] ?? "";
}
$("#bg-preview").src = current.backgroundImage;

const form = $("#hero-form");
const submitText = $("#submit-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitText.textContent = "Saving…";

  try {
    const updated = { ...current };
    for (const field of fields) updated[field] = $(`#${field}`).value;

    const file = $("#bg-file").files[0];
    if (file) {
      updated.backgroundImage = await uploadImage(file, "hero");
    }

    await saveContent("hero", updated);
    current = updated;
    $("#bg-preview").src = updated.backgroundImage;
    $("#bg-file").value = "";
    showToast("Hero section saved.");
  } catch (err) {
    showToast(err.message || "Couldn't save.", true);
  } finally {
    submitText.textContent = "Save changes";
  }
});

import { initAdminShell } from "../admin/shell.js";
import { getContent, saveContent } from "../content-store.js";
import { uploadImage } from "../upload.js";
import { showToast } from "../admin/toast.js";
import { $, el } from "../dom.js";

await initAdminShell();

let items = await getContent("services");

function renderList() {
  const container = $("#services-list");
  container.innerHTML = "";
  for (const item of items) {
    const titleInput = el("input", { value: item.title });
    const descInput = el("textarea", { rows: "2", text: item.shortDescription });
    descInput.value = item.shortDescription;

    container.append(
      el("div", { class: "repeater-item", style: "display:flex; gap:1rem; align-items:flex-start;" }, [
        item.image ? el("img", { src: item.image, class: "image-preview", style: "width:6rem; max-width:6rem;" }) : null,
        el("div", { style: "flex:1;" }, [
          el("div", { class: "field" }, [el("label", { text: "Title" }), titleInput]),
          el("div", { class: "field" }, [el("label", { text: "Description" }), descInput]),
          el("div", { class: "repeater-actions" }, [
            el("button", {
              class: "btn btn-secondary btn-sm",
              text: "Save",
              onClick: async () => {
                item.title = titleInput.value;
                item.shortDescription = descInput.value;
                await saveContent("services", items);
                showToast("Service updated.");
              },
            }),
            el("button", {
              class: "btn btn-ghost btn-sm text-wine",
              text: "Delete",
              onClick: async () => {
                if (!confirm(`Remove "${item.title}"?`)) return;
                items = items.filter((i) => i.id !== item.id);
                await saveContent("services", items);
                renderList();
                showToast("Service removed.");
              },
            }),
          ]),
        ]),
      ])
    );
  }
}
renderList();

const addForm = $("#add-form");
const addBtnText = $("#add-btn-text");

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  addBtnText.textContent = "Saving…";

  try {
    const file = $("#new-file").files[0];
    const image = file ? await uploadImage(file, "services") : null;
    items = [
      ...items,
      {
        id: `service-${Date.now()}`,
        title: $("#new-title").value,
        shortDescription: $("#new-desc").value,
        image,
        icon: "Sparkles",
      },
    ];
    await saveContent("services", items);
    renderList();
    addForm.reset();
    showToast("Service added.");
  } catch (err) {
    showToast(err.message || "Couldn't add service.", true);
  } finally {
    addBtnText.textContent = "Add service";
  }
});

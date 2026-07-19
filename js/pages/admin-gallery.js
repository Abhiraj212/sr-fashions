import { initAdminShell } from "../admin/shell.js";
import { getContent, saveContent } from "../content-store.js";
import { uploadImage } from "../upload.js";
import { showToast } from "../admin/toast.js";
import { $, el } from "../dom.js";

await initAdminShell();

let items = await getContent("gallery");

function renderList() {
  const container = $("#gallery-list");
  container.innerHTML = "";
  for (const item of items) {
    container.append(
      el("div", { class: "repeater-item", style: "display:flex; gap:1rem; align-items:flex-start;" }, [
        el("img", { src: item.image, class: "image-preview", style: "width:6rem; max-width:6rem;" }),
        el("div", { style: "flex:1;" }, [
          el("p", { style: "font-weight:600;", text: item.title }),
          el("p", { class: "text-muted", style: "font-size:0.8rem;", text: item.category }),
          el("div", { class: "repeater-actions" }, [
            el("button", {
              class: "btn btn-ghost btn-sm text-wine",
              text: "Delete",
              onClick: async () => {
                if (!confirm(`Remove "${item.title}" from the gallery?`)) return;
                items = items.filter((i) => i.id !== item.id);
                await saveContent("gallery", items);
                renderList();
                showToast("Photo removed.");
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
  addBtnText.textContent = "Uploading…";

  try {
    const file = $("#new-file").files[0];
    const url = await uploadImage(file, "gallery");
    const newItem = {
      id: `g${Date.now()}`,
      title: $("#new-title").value,
      category: $("#new-category").value,
      image: url,
    };
    items = [...items, newItem];
    await saveContent("gallery", items);
    renderList();
    addForm.reset();
    showToast("Photo added to gallery.");
  } catch (err) {
    showToast(err.message || "Upload failed.", true);
  } finally {
    addBtnText.textContent = "Upload";
  }
});

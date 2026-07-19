import { initAdminShell } from "../admin/shell.js";
import { db } from "../firebase-config.js";
import {
  collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { showToast } from "../admin/toast.js";
import { $, el } from "../dom.js";
import { formatDateTime } from "../constants.js";

await initAdminShell();

async function load() {
  const snap = await getDocs(query(collection(db, "inquiries"), orderBy("createdAt", "desc")));
  const container = $("#inquiries-list");
  container.innerHTML = "";

  if (snap.empty) {
    container.append(el("p", { class: "text-muted", text: "No inquiries yet." }));
    return;
  }

  snap.forEach((docSnap) => {
    const inquiry = docSnap.data();
    const isNew = inquiry.status === "new";
    container.append(
      el("div", { class: "repeater-item" }, [
        el("div", { class: "flex-between" }, [
          el("p", { style: "font-weight:600;", text: inquiry.name }),
          el("span", { class: `badge ${isNew ? "badge-gold" : "badge-sage"}`, text: isNew ? "New" : "Handled" }),
        ]),
        el("p", { class: "text-muted mt-1", style: "font-size:0.8rem;", text: `${inquiry.phone} · ${formatDateTime(inquiry.createdAt)}` }),
        el("p", { class: "mt-2", style: "font-size:0.9375rem;", text: inquiry.message }),
        el("div", { class: "repeater-actions" }, [
          isNew
            ? el("button", {
                class: "btn btn-secondary btn-sm",
                text: "Mark handled",
                onClick: async () => {
                  await updateDoc(doc(db, "inquiries", docSnap.id), { status: "handled" });
                  load();
                  showToast("Marked as handled.");
                },
              })
            : null,
          el("button", {
            class: "btn btn-ghost btn-sm text-wine",
            text: "Delete",
            onClick: async () => {
              if (!confirm("Delete this inquiry?")) return;
              await deleteDoc(doc(db, "inquiries", docSnap.id));
              load();
              showToast("Inquiry deleted.");
            },
          }),
        ]),
      ])
    );
  });
}

load();

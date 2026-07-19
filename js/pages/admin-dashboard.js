import { initAdminShell } from "../admin/shell.js";
import { getContent } from "../content-store.js";
import { db } from "../firebase-config.js";
import { collection, query, where, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { $ } from "../dom.js";

await initAdminShell();

getContent("gallery").then((items) => ($("#stat-gallery").textContent = items.length));
getContent("services").then((items) => ($("#stat-services").textContent = items.length));

const newInquiriesQuery = query(collection(db, "inquiries"), where("status", "==", "new"));
getCountFromServer(newInquiriesQuery).then((snap) => {
  $("#stat-inquiries").textContent = snap.data().count;
});

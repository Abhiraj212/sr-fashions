import { initAdminShell } from "../admin/shell.js";
import { getContent, saveContent } from "../content-store.js";
import { showToast } from "../admin/toast.js";
import { $ } from "../dom.js";

await initAdminShell();

let settings = await getContent("settings");

$("#brandName").value = settings.brand.name;
$("#boutiqueName").value = settings.brand.boutiqueName;
$("#tagline").value = settings.brand.tagline;
$("#established").value = settings.brand.established;
$("#email").value = settings.contact.email;
$("#phonePrimary").value = settings.contact.phonePrimary;
$("#phonePrimaryRaw").value = settings.contact.phonePrimaryRaw;
$("#phoneSecondary").value = settings.contact.phoneSecondary;
$("#address").value = settings.address;
$("#hours").value = settings.hours;

$("#settings-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitText = $("#submit-text");
  submitText.textContent = "Saving…";

  settings = {
    brand: {
      name: $("#brandName").value,
      boutiqueName: $("#boutiqueName").value,
      tagline: $("#tagline").value,
      established: Number($("#established").value),
    },
    contact: {
      email: $("#email").value,
      phonePrimary: $("#phonePrimary").value,
      phonePrimaryRaw: $("#phonePrimaryRaw").value,
      phoneSecondary: $("#phoneSecondary").value,
      whatsappNumber: $("#phonePrimaryRaw").value,
    },
    address: $("#address").value,
    hours: $("#hours").value,
  };

  await saveContent("settings", settings);
  submitText.textContent = "Save settings";
  showToast("Settings saved — live everywhere now.");
});

/** Shorthand for document.querySelector. */
export function $(selector, root = document) {
  return root.querySelector(selector);
}

/** Shorthand for document.querySelectorAll, returned as a real array. */
export function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

/** Creates an element with attributes/children, without innerHTML string-building. */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

/** Escapes text for safe use inside innerHTML templates. */
export function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

/** Simple show/hide toggle by element reference. */
export function show(node) {
  node.style.display = "";
}
export function hide(node) {
  node.style.display = "none";
}

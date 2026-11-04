const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const PAYLOAD = `<img src=x onerror="window.__xss=1">`;

function mount() {
  const dom = new JSDOM("<body></body>", { runScripts: "outside-only" });
  const { window } = dom;
  window.salla = { money: v => String(v), lang: { onLoaded: f => f(), get: k => k } };
  window.eval(fs.readFileSync(path.join(__dirname, "../src/assets/js/partials/add-product-toast.js"), "utf8"));
  window.document.body.innerHTML = "<salla-add-product-toast></salla-add-product-toast>";
  const el = window.document.querySelector("salla-add-product-toast");
  return { window, el };
}

function render(el, options) {
  const opts = el.extractOptions(options);
  el.product = { name: "P", url: "/p", image: "/i.png", price: 1, originalPrice: 1, options: opts };
  el.isVisible = true;
  el.updateDOM();
}

test("option name, value and detail name render as literal text", () => {
  const { window, el } = mount();
  render(el, [
    { type: "text", name: PAYLOAD, value: PAYLOAD },
    { type: "radio", name: "Size", details: [{ name: PAYLOAD, is_selected: true }] },
    { type: "image", name: PAYLOAD, value: "x" },
  ]);
  const box = el.querySelector(".s-add-product-toast__options");
  assert.strictEqual(box.querySelectorAll("img").length, 0);
  assert.strictEqual(box.querySelectorAll("*").length, 3);
  const spans = [...box.querySelectorAll("span")].map(s => s.textContent);
  assert.deepStrictEqual(spans, [`${PAYLOAD}: ${PAYLOAD}`, `Size: ${PAYLOAD}`, PAYLOAD]);
  assert.strictEqual(window.__xss, undefined);
});

test("normal options and show-more link still render", () => {
  const { el } = mount();
  render(el, [1, 2, 3, 4].map(i => ({ type: "text", name: `N${i}`, value: `V${i}` })));
  const spans = [...el.querySelectorAll(".s-add-product-toast__options span")].map(s => s.textContent);
  assert.deepStrictEqual(spans, ["N1: V1", "N2: V2", "N3: V3"]);
  assert.ok(el.querySelector(".s-add-product-toast__show-more"));
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const productFile = new URL('../src/assets/js/product.js', import.meta.url);

function storefront(path) {
  const domNode = () => {
    const classes = new Set();
    return {
      classList: { add: (c) => classes.add(c), remove: (c) => classes.delete(c) },
      classes,
      innerHTML: '',
    };
  };
  const price = domNode();
  const unavailable = domNode();
  unavailable.classes.add('hidden');
  const displayed = [domNode(), domNode()];
  const requests = [];
  const events = new Map();
  const form = {
    elements: [{ willValidate: true, validity: { valid: true } }],
    addEventListener(_, listener) { this.change = listener; },
    selection: '',
  };
  const globals = {
    BasePage: class { static initiateWhenReady() {} },
    FormData: class { constructor(form) { this.selection = form.selection; } },
    document: { querySelector: () => form, querySelectorAll: () => [] },
    app: {
      element: (name) => name === '.price-wrapper' ? price : unavailable,
      onClick() {},
      toggleClassIf() {},
      productWeight: [],
      totalPrice: displayed,
      beforePrice: [],
    },
    salla: {
      money: String,
      event: { on: (event, callback) => events.set(event, callback) },
      product: {
        event: { onPriceUpdated: (callback) => events.set('success', callback) },
        getPrice(snapshot) {
          return new Promise((resolve, reject) => requests.push({ snapshot, resolve, reject }));
        },
      },
    },
  };
  const script = readFileSync(path, 'utf8').replace(/^import .*$|^window\.fslightbox = Fslightbox;$/gm, '');
  runInNewContext(script + '\nconst page = new Product(); page.registerEvents(); page.initProductOptionValidations();', globals);
  return {
    requests,
    price,
    unavailable,
    displayed,
    choose(selection, valid = true) {
      form.selection = selection;
      form.elements[0].validity.valid = valid;
      return form.change();
    },
    resolve(index, amount) {
      const result = { data: { price: amount, regular_price: amount } };
      events.get('success')?.(result);
      requests[index].resolve(result);
    },
    reject(index) {
      events.get('product::price.updated.failed')?.();
      requests[index].reject(new Error('Variant quote failed'));
    },
  };
}

test('latest response controls both price elements, even if an older price returns late', async () => {
  const page = storefront(productFile);
  const old = page.choose('A2 Stretched');
  const latest = page.choose('A2 Rolled');
  assert.equal(page.price.classes.has('hidden'), true);
  assert.deepEqual(page.requests.map((r) => r.snapshot.selection), ['A2 Stretched', 'A2 Rolled']);
  page.resolve(1, 249);
  await latest;
  page.resolve(0, 299);
  await old;
  assert.deepEqual(page.displayed.map((node) => node.innerHTML), ['249', '249']);
  assert.equal(page.price.classes.has('hidden'), false);
});

test('stale failed response cannot hide a newer valid price', async () => {
  const page = storefront(productFile);
  const old = page.choose('A2 Rolled');
  const latest = page.choose('A1 Rolled');
  page.resolve(1, 349);
  await latest;
  page.reject(0);
  await old;
  assert.equal(page.price.classes.has('hidden'), false);
  assert.equal(page.unavailable.classes.has('hidden'), true);
});

test('an incomplete selection invalidates the outstanding quote and does not request a new one', async () => {
  const page = storefront(productFile);
  const old = page.choose('A0 Rolled');
  await page.choose('A0', false);
  page.resolve(0, 549);
  await old;
  assert.equal(page.requests.length, 1);
  assert.equal(page.price.classes.has('hidden'), true);
});

test('latest failed response stays closed to an older successful quote', async () => {
  const page = storefront(productFile);
  const old = page.choose('A2 Stretched');
  const latest = page.choose('A0 Stretched');
  page.reject(1);
  await latest;
  page.resolve(0, 299);
  await old;
  assert.equal(page.price.classes.has('hidden'), true);
  assert.equal(page.unavailable.classes.has('hidden'), false);
});

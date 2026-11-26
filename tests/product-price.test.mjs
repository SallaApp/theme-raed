import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const productFile = new URL('../src/assets/js/product.js', import.meta.url);

function storefront(path) {
  const domNode = () => {
    const classes = new Set();
    return {
      classList: {
        add: (...names) => names.forEach((name) => classes.add(name)),
        remove: (...names) => names.forEach((name) => classes.delete(name)),
      },
      classes,
      innerHTML: '',
    };
  };
  const price = domNode();
  const unavailable = domNode();
  unavailable.classes.add('hidden');
  const displayed = [domNode(), domNode()];
  const beforePrice = domNode();
  const startingPriceTitle = domNode();
  const priceModes = {
    '.price_is_on_sale': domNode(),
    '.starting-or-normal-price': domNode(),
  };
  priceModes['.price_is_on_sale'].classList.add('hidden');
  priceModes['.starting-or-normal-price'].classList.add('showed');
  const requests = [];
  const events = new Map();
  const listeners = new Map();
  const form = {
    elements: [{ type: 'text', willValidate: true, validity: { valid: true } }],
    addEventListener(event, listener) { listeners.set(event, listener); },
    selection: '',
  };
  const globals = {
    BasePage: class { static initiateWhenReady() {} },
    FormData: class { constructor(form) { this.selection = form.selection; } },
    document: { querySelector: () => form, querySelectorAll: () => [] },
    app: {
      element: (name) => name === '.price-wrapper' ? price : unavailable,
      onClick() {},
      toggleClassIf(selector, activeClass, inactiveClass, predicate) {
        const { classList } = priceModes[selector];
        const matches = predicate();
        classList.add(matches ? activeClass : inactiveClass);
        classList.remove(matches ? inactiveClass : activeClass);
      },
      productWeight: [],
      totalPrice: displayed,
      beforePrice: [beforePrice],
      startingPriceTitle,
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
    beforePrice,
    startingPriceTitle,
    saleMode: priceModes['.price_is_on_sale'],
    regularMode: priceModes['.starting-or-normal-price'],
    input(selection, valid = true) {
      form.selection = selection;
      form.elements[0].validity.valid = valid;
      listeners.get('input')?.({ target: form.elements[0] });
    },
    choose(selection, valid = true) {
      form.selection = selection;
      form.elements[0].validity.valid = valid;
      return listeners.get('change')({ target: form.elements[0] });
    },
    resolve(index, amount, { regularPrice = amount, hasSalePrice = false } = {}) {
      const result = { data: { price: amount, regular_price: regularPrice, has_sale_price: hasSalePrice } };
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

test('typing before blur invalidates an outstanding quote and change requests the new price once', async () => {
  const page = storefront(productFile);
  const old = page.choose('Original engraving');
  page.input('New engraving');
  assert.equal(page.requests.length, 1);
  page.resolve(0, 299);
  await old;
  assert.equal(page.price.classes.has('hidden'), true);
  assert.deepEqual(page.displayed.map((node) => node.innerHTML), ['', '']);

  const latest = page.choose('New engraving');
  assert.deepEqual(page.requests.map((r) => r.snapshot.selection), ['Original engraving', 'New engraving']);
  page.resolve(1, 349);
  await latest;
  assert.equal(page.price.classes.has('hidden'), false);
  assert.deepEqual(page.displayed.map((node) => node.innerHTML), ['349', '349']);
});

test('clearing a required text option hides a settled price and ignores failures before blur', async () => {
  const page = storefront(productFile);
  const settled = page.choose('First engraving');
  page.resolve(0, 299);
  await settled;
  assert.equal(page.price.classes.has('hidden'), false);
  page.input('');
  assert.equal(page.price.classes.has('hidden'), true);

  const old = page.choose('Second engraving');
  page.input('', false);
  page.reject(1);
  await old;
  assert.equal(page.unavailable.classes.has('hidden'), true);
  await page.choose('', false);
  assert.equal(page.requests.length, 2);
  assert.equal(page.price.classes.has('hidden'), true);
});

test('sale prices render the discount and original price, then switch back to regular pricing', async () => {
  const page = storefront(productFile);
  const sale = page.choose('Sale variant');
  page.resolve(0, 249, { regularPrice: 299, hasSalePrice: true });
  await sale;
  assert.deepEqual(page.displayed.map((node) => node.innerHTML), ['249', '249']);
  assert.equal(page.beforePrice.innerHTML, '299');
  assert.equal(page.saleMode.classes.has('showed'), true);
  assert.equal(page.saleMode.classes.has('hidden'), false);
  assert.equal(page.regularMode.classes.has('hidden'), true);
  assert.equal(page.startingPriceTitle.classes.has('hidden'), true);
  assert.equal(page.price.classes.has('hidden'), false);

  const regular = page.choose('Regular variant');
  page.resolve(1, 399);
  await regular;
  assert.deepEqual(page.displayed.map((node) => node.innerHTML), ['399', '399']);
  assert.equal(page.beforePrice.innerHTML, '399');
  assert.equal(page.saleMode.classes.has('hidden'), true);
  assert.equal(page.saleMode.classes.has('showed'), false);
  assert.equal(page.regularMode.classes.has('showed'), true);
  assert.equal(page.regularMode.classes.has('hidden'), false);
  assert.equal(page.price.classes.has('hidden'), false);
});

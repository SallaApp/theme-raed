# Design Spec — "Tiraz / طراز" Salla Twilight Theme

- **Date:** 2026-06-06
- **Author:** tabadev217@gmail.com (with Claude)
- **Status:** Draft — awaiting user review
- **Goal:** A simple, professional, *publishable* Salla theme for a **clothes store in KSA**, built on the official Twilight engine, ready to test via the Salla CLI.

---

## 1. Purpose & Success Criteria

Build a fashion-focused Salla theme that:

1. Follows the **official Salla Twilight** structure exactly (so it can be submitted to the Salla Theme Marketplace without structural rejection).
2. Has a **bold, modern** visual identity tuned for an **Arabic-first (RTL) KSA clothing store**.
3. Runs locally with `salla theme preview` against the user's existing Salla Partners demo store.
4. Includes the full set of pages/components Salla expects for a Fashion-category theme.

**Done when:**
- `pnpm install` succeeds and `salla theme preview` renders the re-skinned home page on the demo store.
- Home page shows the fashion layout (hero → categories → new arrivals → promos → best sellers → KSA trust bar → brands → testimonials).
- Arabic RTL is the default; English is available as fallback.
- Branding (name, colors, fonts) reflects the Tiraz identity and is merchant-editable via `twilight.json` settings.

---

## 2. Strategy: Fork & Re-skin the Official `theme-raed`

Rather than building from scratch, we **fork the official Salla starter** [`SallaApp/theme-raed`](https://github.com/SallaApp/theme-raed) and re-skin it.

**Why:** theme-raed already ships every page, component, locale, and build-pipeline Salla's reviewers expect. Re-skinning it is the lowest-risk path to a *publishable* theme. Building from scratch risks missing required key features and failing the publish review.

**What stays untouched (proven, reused):**
- Overall folder structure (`src/views`, `src/assets`, `src/locales`, build configs).
- Page templates logic (cart, checkout, customer pages, product, blog, brands).
- Twilight JS SDK integration and existing components' wiring.

**What we change (the re-skin):**
- `twilight.json` — identity, settings, home-page composition & defaults.
- `tailwind.config.js` + `src/assets/styles/**` — color tokens, fonts, bolder UI.
- `src/locales/ar.json` + `en.json` — fashion-tuned, Arabic-first copy.
- Home component default content for a clothes store.

---

## 3. Brand Identity — "Tiraz / طراز"

| Token | Value | Notes |
|---|---|---|
| Theme name | `Tiraz` (طراز = "style/fashion") | Set in `twilight.json` |
| Page background | `#F2EADD` (light beige) | Main site background, warm boutique feel |
| Surface | `#FAF6EF` / `#FFFFFF` | Cards, product backgrounds |
| Text / primary | `#2A2520` (espresso/charcoal) | Headings, body text, strong contrast on beige |
| Accent | `#B07D56` (warm clay/caramel) | CTAs, sale tags, highlights — sits naturally on beige |
| Muted section | `#EAE0D1` (deeper beige) | Alternating section backgrounds |
| Heading font | `Tajawal` (heavy weights) | Arabic-first, geometric, modern |
| Body font | `Tajawal` (regular/medium) | System fallback chain |

> Palette shifted from the original bold charcoal+crimson to a **light-beige boutique** scheme per request. The look is now warm/elegant rather than punchy; UI still uses confident weights and generous imagery for a modern feel. All colors remain merchant-editable in `twilight.json`.

All color and font choices are exposed as **merchant-editable settings** in `twilight.json`, so store owners can recolor without code.

---

## 4. Home Page Composition (clothes store, KSA)

Assembled via `twilight.json` `features`/`components`, top to bottom:

1. **Hero slider** — "تشكيلة جديدة / New Collection" full-width banners.
2. **Main category links** — رجال · نساء · أطفال · إكسسوارات (Men / Women / Kids / Accessories).
3. **New Arrivals** — featured products grid.
4. **Promo square banners** — Sale / New Drop split banners.
5. **Best Sellers** — horizontal products slider.
6. **KSA trust bar (store features)** — fast/free shipping, الدفع عند الاستلام (COD), easy returns, secure payment, BNPL (Tabby/Tamara) messaging.
7. **Brands strip** — logo carousel.
8. **Testimonials** — customer reviews.

---

## 5. KSA-Specific Considerations

- **RTL Arabic** is the default layout/locale; English is a fallback locale.
- **SAR currency** formatting is handled by the Salla platform (no hardcoding).
- **Trust signals** front-and-center (COD, BNPL, fast shipping, returns) — high-conversion drivers in the KSA market.
- Copy and CTAs written in natural Arabic, not machine-literal translations.

---

## 6. Pages Included (restyled from theme-raed)

Home, Product (single + listing), Cart, Checkout flow, Customer (orders index/single, wishlist, profile, wallet, notifications), Blog (index/single), Brands (index/single), Landing pages, Thank-you, Loyalty, Static page-single.

---

## 7. File-Level Change Map

| File / Area | Change |
|---|---|
| `twilight.json` | `theme_name`, `version`, `repo_url`, `support_url`; color & font `settings`; fashion home `components`/`features` defaults |
| `tailwind.config.js` | Brand color tokens, font family, extended theme |
| `src/assets/styles/01-settings/global.scss` | CSS variables for brand colors |
| `src/assets/styles/01-settings/fonts.scss` | Tajawal font wiring |
| `src/assets/styles/03-elements/buttons.scss` | Bolder button styling |
| `src/assets/styles/04-components/product.scss` | Modern product-card hover/badges |
| `src/assets/styles/04-components/header.scss` & `footer.scss` | Re-skin |
| `src/locales/ar.json`, `en.json` | Fashion-tuned, Arabic-first copy |
| `src/views/components/home/*` | Default content tuned to clothing store |

---

## 8. Build & Test Workflow

Prerequisites (user confirmed Partners access): Node LTS ≥ 16.13.1, npm ≥ 6.14.0, `pnpm`, PHP ≥ 7.4, Composer, Salla CLI (`npm i -g @salla.sa/cli`).

1. Clone/scaffold theme-raed into `c:\WORK\salla`.
2. `pnpm install`.
3. `salla login` (Partners account) + GitHub PAT if needed.
4. `salla theme preview` → builds, deploys to local server, opens preview linked to demo store.
5. Verify home layout, RTL, colors, fonts, trust bar.
6. (Later) `salla theme publish` to submit for marketplace review.

---

## 9. Out of Scope (v1 / YAGNI)

- Custom checkout logic (Salla-managed).
- New bespoke components beyond re-skinning existing ones (can add post-launch).
- Multi-theme variants / additional industries.
- Payment gateway integration (platform-level, not theme-level).

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Salla CLI version drift vs. theme-raed | Use the theme-raed version pinned in its `package.json`; follow CLI prompts |
| Publish review rejection for missing features | We keep all theme-raed features intact; only re-skin |
| RTL/LTR style regressions | theme-raed already has `rtl.scss`/`ltr.scss`; test both |
| Font licensing | Tajawal is open-source (SIL OFL) — safe for commercial themes |

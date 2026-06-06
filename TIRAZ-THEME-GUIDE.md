# Tiraz / طراز — Salla Theme (Fashion · KSA)

A bold-yet-elegant **light-beige boutique** theme for clothing stores in Saudi Arabia,
built on Salla's official **Twilight** engine (forked & re-skinned from `theme-raed`).

- **Accent:** warm clay `#B07D56` · **Background:** light beige `#F2EADD` · **Font:** Tajawal
- **Language:** Arabic-first (RTL) + English
- **Home layout:** hero slider → category links → new arrivals → promo banners → best sellers → KSA trust bar → brands → testimonials

---

## 1. Prerequisites (already verified on this machine)

| Tool | Min version | Status |
|------|-------------|--------|
| Node.js | ≥ 16.13.1 | ✅ v24 |
| pnpm | ≥ 6 | ✅ v9 |
| PHP | ≥ 7.4 | ✅ 8.3 |
| Composer | latest | ✅ |
| Salla CLI | latest | ✅ installed (`salla`) |

You also need a **Salla Partners account** and a **demo store** (you confirmed you have these).

---

## 2. Log in first — the Salla CLI handles dependencies

> ⚠️ **Important:** Two of Salla's own dependencies
> (`@salla.sa/ui-address-autocomplete-widget`, `@salla.sa/ui-google-map-render`) are **private**
> on npm. A bare `pnpm install` will fail with a `404 / No authorization header` error until your
> npm client is authenticated against Salla's registry. The **Salla CLI does this for you** after login.

```powershell
salla login                 # authenticate with your Salla Partners account (opens browser)
```

## 3. Preview live on your demo store

```powershell
salla theme preview         # installs deps, builds, deploys to a local server, opens the preview
# optionally target a specific store:
salla theme preview -s <store-name-or-id>
```

`salla theme preview` links the theme to your store and opens a browser preview with hot reload.
This is the primary way to test — it manages the private-package install and the webpack build.

## 4. (Optional) Manual build once authenticated

After `salla login` has configured registry auth, these work locally:

```powershell
pnpm install
pnpm prod        # production build
pnpm watch       # rebuild on change while developing
```

---

## 5. Make it look exactly like the Tiraz design (2 dashboard settings)

Salla controls the **primary color** and **font** from the store dashboard (the theme only ships
defaults). For the exact Tiraz look, in your store dashboard → Theme settings:

1. **Primary color** → set to `#B07D56` (warm clay).
2. **Font** → Tajawal is already bundled by the theme and applied automatically; no action needed.

> The light-beige page background, cream product cards, rounded buttons, and category chips are all
> baked into the theme CSS and appear automatically — no dashboard step required.

---

## 6. Populate the demo store with sample clothing data (next step)

After previewing, we'll use the installed **Membrane `salla` skill** to seed your store with sample
products, categories (Men/Women/Kids/Accessories), and prices via the Salla API, so the home page
shows real fashion content instead of placeholders.

---

## 7. Publish to the Salla Theme Marketplace (when ready)

```powershell
salla theme publish
```

Salla reviews themes for a clear industry focus (Fashion ✓) and required key features. Because Tiraz
keeps all of `theme-raed`'s features intact, it satisfies the structural requirements; the review
focuses on quality and originality of the re-skin.

---

## What was customized vs. stock theme-raed

| Area | Change |
|------|--------|
| `twilight.json` | Theme name (طراز/Tiraz), description, repo/author; fashion home content (categories, hero, promo banners) |
| `src/assets/styles/01-settings/global.scss` | Clay accent + beige surface CSS variables, Tajawal default |
| `src/assets/styles/04-components/tiraz.scss` | New: beige page bg, cream cards, hover lift, clay buttons, category chips, trust bar |
| `src/assets/styles/app.scss` | Import the Tiraz skin last |
| `tailwind.config.js` | Tajawal added to font stacks |
| `src/views/layouts/master.twig` | Load Tajawal (Google Fonts) + `tiraz-theme` body class |

Design spec: [docs/superpowers/specs/2026-06-06-tiraz-salla-theme-design.md](docs/superpowers/specs/2026-06-06-tiraz-salla-theme-design.md)

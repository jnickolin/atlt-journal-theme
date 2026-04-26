# Journal Ghost Theme

A custom Ghost 5+ theme based on the official Journal theme.

## Dev server

```
npm run dev
```

Runs Gulp, which compiles CSS and JS and starts a live reload server. Always stop the dev server with `Ctrl + C` before installing npm packages.

## Build output

- `assets/built/screen.css` — compiled CSS
- `assets/built/vendor.min.js` — Ghost shared theme assets (pagination, dropdown, lightbox, etc.)
- `assets/built/main.min.js` — theme JS + npm packages, bundled via Rollup

Both script files are loaded in `default.hbs`. `vendor.min.js` must come before `main.min.js` since `main.min.js` depends on globals defined in the shared assets (e.g. `pagination`).

## JS build pipeline

The JS build is split into two Gulp tasks:

- `sharedJs` — concatenates Ghost shared theme assets from `node_modules/@tryghost/shared-theme-assets/assets/js/v1/` into `vendor.min.js`. Vendor files (reframe, photoswipe, etc.) must load before lib files.
- `js` — uses `@rollup/stream` with `@rollup/plugin-node-resolve` and `@rollup/plugin-commonjs` to bundle `assets/js/main.js` and any npm imports into `main.min.js`.

To add a new npm package, install it with `npm install`, then `import` it in `assets/js/main.js`. Rollup will bundle it automatically.

## Adding JS to specific pages

Use a `data-` attribute on the target element in the `.hbs` template to pass server-rendered values (like `{{title}}`) to JavaScript. Example in `partials/hp-banner.hbs`:

```html
<h2 id="typewriter-target" data-title="{{title}}"></h2>
```

Then read it in `assets/js/main.js`:

```js
const el = document.getElementById('typewriter-target');
if (el) { /* use el.getAttribute('data-title') */ }
```

## npm scripts

- `npm run dev` — development build with live reload
- `npm run test` — scan theme with gscan
- `npm run zip` — build a zip for upload to Ghost

## Git

The user uses `git commit -m "..."` to avoid opening Vim.

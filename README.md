# Customized Ghost Journal Theme

Customized handlebars theme for the blog, atimelikethis.net. Built on top of the official [Journal theme](https://github.com/TryGhost/Journal) by Ghost Foundation.

**Live site: https://atimelikethis.net**

## Customizations

This fork extends the base Journal theme with:

- **Typewriter animation** — a character-by-character reveal effect on the homepage banner, driven by a custom JS class with configurable speed and delay
- **Custom JS build pipeline** — Rollup bundles `assets/js/main.js` and any npm packages into `main.min.js`; Ghost shared assets are concatenated separately into `vendor.min.js` to preserve required load order
- **GitHub Actions deployment** — a workflow that compiles assets and packages the theme on push to `main`, then uploads it directly to the Ghost Admin API

## Development

Requires [Node.js](https://nodejs.org/). From the project root:

```bash
# Install dependencies
npm install

# Build and watch for changes
npm run dev

# Validate theme with gscan
npm run test

# Package theme as a zip for manual upload
npm run zip
```

CSS source lives in `assets/css/` and is compiled to `assets/built/` via Gulp/PostCSS. JS source lives in `assets/js/` and is bundled via Rollup into `assets/built/`.

## Based on

[Journal](https://github.com/TryGhost/Journal) by [Ghost Foundation](https://ghost.org), released under the [MIT License](LICENSE).

Customizations copyright (c) 2025 Jojo Nickolin.

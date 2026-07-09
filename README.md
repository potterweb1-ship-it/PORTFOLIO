# William Potter — Portfolio

Static multi-page portfolio site. No build step required.

## Structure
- `index.html` — home page (project index)
- `project-*.html` — individual case-study pages
- `support.js` — client-side runtime (renders the pages)
- `assets/` — images

## Deploying to GitHub Pages
1. Create a repository and push the contents of this folder to the root (or a `docs/` folder).
2. In **Settings → Pages**, set the source to your branch and the folder you pushed to.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

The pages load React from a public CDN (unpkg) at runtime, so an internet
connection is required to view them — which is always the case for a hosted site.

`.nojekyll` is included so GitHub Pages serves all files as-is.

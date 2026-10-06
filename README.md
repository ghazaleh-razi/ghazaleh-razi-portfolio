# Ghazaleh Razi — Portfolio

Phase 1 foundation: Next.js App Router, React, strict TypeScript, ESLint, and
Tailwind CSS. Layout and page are Server Components rendered at build time.
There are no API routes, server actions, runtime backend, or custom Client Components.

## Development

Use Node 24 LTS (`.nvmrc`), then:

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

Node 24 is the currently Active LTS release; `engines.node` accepts >=24 without
pinning a patch or npm version. Next.js 16 requires >=20.9, but Node 20 is
end-of-life and Node 22 is in Maintenance LTS. The lockfile records dependencies.

## Static hosting

The production build creates `out/` using `output: "export"`; no separate export
command or Node server is needed. Publish the contents of `out/` to GitHub Pages.
The export includes `.nojekyll` and `CNAME` for `ghazaleh-razi.com`.
Root-relative assets assume this custom domain. A repository subpath would
require `basePath` configuration. DNS and publishing are outside Phase 1.

## Foundation conventions

`src/app/globals.css` contains the approved semantic light/dark palette, Tailwind
color/font mappings, a mobile-first 1280px container, visible keyboard focus,
and reduced-motion rules. Border tokens are decorative; they must not be the
only way to identify future controls. Accent also supplies the focus-ring color.
Future accent-filled controls need separately verified label contrast.

Inter (body/UI) and Manrope (headings) use local Latin variable WOFF2 files through
`next/font/local`, so builds need no font downloads. Files are sourced from
Fontsource variable packages version 5.3.0; SIL Open Font Licenses in
`public/fonts/` are included in the static export. Additional scripts and italics
are outside current content needs.

System is the default theme. CSS follows OS changes, even without JavaScript.
An inline head script reads `portfolio-theme` before body paint: saved `light`
or `dark` sets the root `data-theme`; missing, invalid, `system`, or inaccessible
storage leaves System mode. No theme transition is applied.
`suppressHydrationWarning` is limited to the root, which the script can modify.

Future controls should persist `light`, `dark`, or `system` under this key, set
`document.documentElement.dataset.theme` for explicit modes, and remove that
attribute for System. Controls and cross-tab synchronization are deferred.
If a CSP is added, authorize the inline script by hash to preserve saved-theme
resolution before paint.

The placeholder has one main landmark, a focusable skip-link target, and one
heading. Portfolio sections and final visual design are deferred.

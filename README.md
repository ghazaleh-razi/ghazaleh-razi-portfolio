# Ghazaleh Razi — Portfolio

The portfolio homepage uses Next.js App Router, React, strict TypeScript, ESLint,
and Tailwind CSS. Content and layout are Server Components rendered at build time.
Only the native mobile navigation enhancement and theme control are Client Components.
There are no API routes, server actions, or runtime backend.

## Development

Use Node 24 LTS (`.nvmrc`), then:

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

On Windows with PowerShell script execution disabled, use `npm.cmd` for the same
commands. This does not require changing the machine's execution policy.

Node 24 is the currently Active LTS release; `engines.node` accepts >=24 without
pinning a patch or npm version. Next.js 16 requires >=20.9, but Node 20 is
end-of-life and Node 22 is in Maintenance LTS. The lockfile records dependencies.

## Static hosting

The production build creates `out/` using `output: "export"`; no separate export
command or Node server is needed. Publish the contents of `out/` to GitHub Pages.
The export includes `.nojekyll` and `CNAME` for `ghazaleh-razi.com`.
Root-relative assets assume this custom domain. A repository subpath would
require `basePath` configuration. DNS and publishing are deferred.

## Generated Next.js types

Next.js 16.3.8 generates `next-env.d.ts`; do not edit it manually. Development
uses `.next/dev/types/`, while `next typegen` and production builds use
`.next/types/`. The installed generator imports `routes.d.ts` and
`root-params.d.ts` (not `route-params.d.ts`). Switching between these commands
legitimately rewrites the imports. Keep the framework's isolated development
output; do not disable it, add Git assume-unchanged flags, or run a restore hook.

The supported repository policy is to leave `next-env.d.ts` generated and
untracked, as recommended in the [Next.js TypeScript documentation](https://nextjs.org/docs/app/api-reference/config/typescript).
It is listed in `.gitignore`. The previously committed generated file is removed
as an unstaged deletion for review. Commit that deletion together with the ignore
rule to stop tracking it. Adding an ignore rule alone cannot untrack an existing
file. No generated declarations are manually maintained.

`npm run typecheck` already runs `next typegen` before `tsc --noEmit`, so a clean
checkout does not need committed generated declarations. Run commands in the
order above for verification; stop the dev server first for deterministic type
generation. Builds regenerate the production imports naturally. `npm ci` installs
the locked dependencies but does not generate this declaration file; run
`npm run typecheck`, `npm run dev`, or `npm run build` afterward. Until then, a
fresh checkout may show missing-type diagnostics in the editor or with bare `tsc`.
Lint does not require the generated file. Static export is unaffected.

To leave all changes unstaged for this review, the local generated file is removed
after verification. Running a generation command before committing this policy
will recreate a tracked working-tree copy and temporarily erase the deletion
from the diff. Include the intended deletion when committing the policy; after
that commit, regenerated copies are ignored normally.

This installed Next.js version can scaffold `AGENTS.md` and `CLAUDE.md` when
`next dev` detects a coding agent. Those files contain tool instructions rather
than application documentation. `agentRules: false` in `next.config.ts` disables
that supported, optional behavior; neither artifact belongs in this repository.

## Foundation conventions

`src/app/globals.css` contains the approved semantic light/dark palette, Tailwind
color/font mappings, a mobile-first 1280px container, visible keyboard focus,
and reduced-motion rules. Border tokens are decorative; controls also have
visible labels. Light primary buttons use dark neutral fills, and dark primary
buttons use the accent with a dark label. Focus uses the semantic focus token.

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

The native theme select persists `light`, `dark`, or `system` under this key,
sets `document.documentElement.dataset.theme` for explicit modes, and removes
that attribute for System. Storage events synchronize open tabs. If storage is
unavailable, selection still applies in the current tab. CSS handles OS changes
in System mode. Theme changes have no global animation.
If a CSP is added, authorize the inline script by hash to preserve saved-theme
resolution before paint.

## Homepage content and interactions

`src/app/page.tsx` composes Header → Hero → Selected Work → Experience → About
→ Contact → Footer. Shared content is in `src/content/`; semantic section IDs
are `work`, `experience`, `about`, and `contact`. The native `details` mobile menu
works without JavaScript. Its enhancement adds Escape/focus return, closing
after selection or outside interaction, and focus recovery on desktop resize.
It is a non-modal disclosure, so the page remains interactive and has no focus trap.

`src/content/projects.ts` contains only completed, publishable projects. It is
intentionally empty: FlowOps, PulseBoard, and NexusDesk are planned. Selected
Work displays one honest publication note rather than fake work samples.
Add a project only with its real implementation and a working case-study route.
The presentation supports featured and supporting entries without a CMS or
separate generic card framework.

Owner-verified email, LinkedIn, and GitHub values belong in `src/content/site.ts`.
The contact section renders the verified email, LinkedIn, and GitHub links.
Profile links open in a new tab with `noreferrer`. The résumé is available at
`/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf`. The hero uses the supplied
1145×1374 portrait with descriptive alt text and reserved intrinsic dimensions.
Real project case studies remain deferred until after the initial launch.

## SEO and social sharing

The fixed production origin is `https://ghazaleh-razi.com`. Homepage metadata and
the Person/WebSite/ProfilePage graph live in `src/app/page.tsx`; root metadata
contains only shared site identity and the metadata base. The 404 has its own
title, Next.js's `noindex`, and no homepage canonical or profile graph.
`robots.ts` and `sitemap.ts` are explicitly static; the sitemap lists only `/`.
Icons use Next.js file conventions without duplicate manual declarations.

The checked-in 1200×630 PNG is shared by Open Graph and Twitter large cards. It
uses the site's dark palette and a deterministic text composition, with the
Geist font bundled in Next.js (the renderer does not support the site's WOFF2
fonts). It is never loaded as a homepage image. Regenerate it and the Apple touch
icon without installing packages:

```sh
node scripts/generate-social-image.mjs
npm run build
node scripts/verify-static-seo.mjs
```

The optional generator uses only React and Next.js already installed by the
lockfile; normal builds use the checked-in images. The verification script
checks the actual exported metadata, graph, crawling files, 404, links and assets.
See [the Phase 7 report](docs/phase-7-seo.md) for audit findings, validation,
verified production URLs and the post-deployment Search Console checklist.

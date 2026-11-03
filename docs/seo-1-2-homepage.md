# SEO-1.2 — Homepage on-page optimization

Date: November 3, 2026. Scope: local implementation; no deployment or merge.

## Pre-implementation audit

The working tree was clean on `feat/seo-homepage-optimization` at `9d2cf7c`.
No applicable AGENTS.md files were found. Implementation uses the dedicated
`seo/phase-1-2-homepage` branch.

Inspected the homepage, root layout, all homepage sections, shared content,
header/footer/navigation, theme and responsive styles, robots, sitemap,
not-found metadata, static SEO verifier, package scripts and Pages workflow.

| Item | Before | Intended after |
| --- | --- | --- |
| Title | Ghazaleh Razi — Frontend Engineer \| Angular & TypeScript | Ghazaleh Razi \| Angular Frontend Engineer & TypeScript Developer |
| Description | Frontend Engineer specializing in Angular and TypeScript, building scalable, maintainable web applications with a focus on frontend architecture and user experience. | Angular & TypeScript Frontend Engineer building enterprise web applications, complex business workflows, and reusable UI components. Open to collaboration. |
| H1 | Frontend Engineer | Angular Frontend Engineer |
| Supporting text | Angular & TypeScript | TypeScript · Enterprise Web Applications |
| Hero description | I build scalable frontend systems for complex web applications, with a focus on architecture, maintainability, and thoughtful user experiences. | I build maintainable Angular and TypeScript interfaces for complex business applications, focusing on reusable components, reliable API integrations, and intuitive user experiences. |
| Primary CTA | View selected work → #work | Discuss a Project → #contact |
| Canonical | https://ghazaleh-razi.com/ | Preserved |
| Structured data | One Person/WebSite/ProfilePage graph | Same entities, IDs and relationships; shared title/description update naturally |

`src/content/site.ts` supplies title and description to homepage metadata,
Open Graph, Twitter and the existing JSON-LD graph. `src/app/page.tsx` owns
homepage metadata. The root layout supplies only metadataBase and application
name, with no title template. There is one homepage H1; section H2s and nested
H3s already have appropriate semantics. The existing Contact section supports
both employment and freelance collaboration and is a focusable anchor target.

The canonical, HTTPS origin, 1200×630 social PNG and alt text, Person job title,
social profiles, robots and one-URL sitemap already satisfy this phase.
The not-found page has separate metadata and intentional noindex. Static export
uses `output: "export"` and `trailingSlash: true`; the Pages workflow already
runs lint, typecheck, build and the exported-HTML verifier.

Experience content supports the proposed Angular/TypeScript, enterprise
workflow, reusable component and API integration wording. No resume facts,
employment records, education, dates or project statuses need changes.
FlowOps, PulseBoard and NexusDesk remain planned; no case-study routes exist.

## Minimal implementation

- `src/content/site.ts`: replace the two shared SEO strings. Reuse the native
  Metadata API and graph consumers without duplicate configuration.
- `src/components/sections/hero.tsx`: update H1, supporting text, description
  and the existing primary CTA. Preserve personal name, resume link, classes,
  image dimensions and accessibility attributes.
- `scripts/verify-static-seo.mjs`: update expected SEO strings and H1; verify
  rendered positioning, one primary contact CTA, and graph descriptions.
- This report records the audit and validation evidence.

No CSS, architecture, dependencies, section order, other section copy,
navigation, theme behavior, social artwork, crawling files or schema structure
is changed.

## Validation

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint` | PASS | ESLint, zero warnings |
| `npm.cmd run typecheck` | PASS | Next.js route type generation and TypeScript |
| `npm.cmd run build` | PASS | Next.js 16.3.8 production build; all routes statically exported |
| `node scripts/verify-static-seo.mjs` | PASS | Fresh `out/index.html`, JSON-LD, robots, sitemap, 404 and assets |
| `git diff --check` | PASS | No whitespace errors |
| Local Chrome responsive checks | PASS | 320, 390, 767, 768, 895, 896, 1024 and 1440 CSS pixels, each in light and dark mode |
| Local Chrome interaction checks | PASS | Hero contact anchor by pointer and keyboard, skip link, mobile menu/Escape/contact focus, theme persistence and System changes |
| Local content/asset regression | PASS | One H1, unchanged section order and planned labels, loaded portrait with dimensions, resume PDF served correctly, preserved social/mailto links |
| Local JavaScript and no-JavaScript rendering | PASS | No homepage console, hydration, request or HTTP errors; Hero and CTA also work with JavaScript disabled |
| Local 404 | PASS | HTTP 404 and intentional noindex; expected browser 404 resource diagnostic only |
| Production deployment, live redirects, Search Console and external Rich Results testing | NOT TESTED | No deployment or account changes performed |
| Safari, Firefox, physical devices, screen reader and Lighthouse/CWV | NOT TESTED | Outside this focused local Chrome pass |

The pre-existing exported artifact also passed the original verifier before
edits; final validation above used a fresh production build. There is no
separate unit-test package script. No dependencies were installed.

The export verifier checks exactly one title, description, canonical and H1;
matching OG/Twitter copy and preserved image URL, alt and dimensions; one
Person/WebSite/ProfilePage graph with unchanged identity and relationships;
indexable homepage and separate noindex 404; all local assets, portrait
derivatives, icons, resume PDF, robots, sitemap and `.nojekyll`.

Browser: Chrome 156.0.8078.80 through an already cached Puppeteer installation,
using a temporary loopback HTTP server serving `out/`. All 16 viewport/theme
cases passed with no horizontal or Hero text overflow and working contact
navigation below the sticky header. Both explicit theme background colors
were asserted after rendering settled. Full-page 320px and 1440px screenshots
in both themes were captured; representative mobile and desktop screenshots
were visually inspected. Text wraps naturally at small widths; no CSS changes
were needed. This is local regression evidence, not a measured CLS/CWV result.

The first restricted Chrome launch timed out. After running Chrome with local
process permissions, the QA harness initially sampled System/theme styles
before the browser applied them. Explicit rendered-color waits corrected the
harness; the final complete run passed without application changes.

Temporary browser evidence is in
`C:\Users\ARAMIS3\AppData\Local\Temp\portfolio-seo-1-2-20261103`:
`browser-qa.cjs`, `browser-results.json` and `chrome-{320,1440}-{light,dark}.png`.
These are local diagnostics, not tracked project tooling. The temporary server
and browser were closed after testing.

## Delivery and limits

The four changed files are limited to shared SEO copy, Hero copy/CTA, the
existing verifier and this report. CSS, resume, experience, project statuses,
schema implementation, image assets, package files and deployment workflow
remain unchanged. A local reviewable commit is prepared on
`seo/phase-1-2-homepage`; no push, pull request, merge or deployment is performed.

Local implementation and available checks are complete. Live delivery and
search-engine interpretation must be confirmed after an authorized deployment.
Search Console indexing, selected canonical and rich-result recognition are
not inferred from local HTML checks. The public-origin fetch in the browsing
tool was unavailable; this does not establish a production outage.

Status: COMPLETED WITH LIMITATIONS (local verification complete; live and
cross-browser checks outstanding).

## Deferred work

SEO-1.3 — Angular Development Services Page. Not implemented here.

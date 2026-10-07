# Phase 7 — production SEO and social sharing

Completed against `feat/seo-social` on October 7, 2026. Production origin:
`https://ghazaleh-razi.com`. This report covers the local production export;
the public domain was not deployed or tested as a live hosting environment.

## 1. Initial audit

- The approved title, description, HTTPS metadata base and homepage canonical
  already existed. Root-level homepage metadata also appeared in exported
  `404.html`, including a misleading homepage canonical and two titles.
- There was no custom `not-found.tsx`; the existing 404 was Next.js's default.
- Robots, sitemap, Open Graph, Twitter cards, JSON-LD and social artwork were
  missing. The SVG icon already used the Next.js file convention.
- Identity, Angular/TypeScript positioning, work publication state, Experience,
  About and Contact were present in the static HTML. The page had one H1,
  logical H2/H3 sections, semantic landmarks and working anchor targets.
- Verified email/profile links, the résumé and an authentic portrait were
  already present. README statements claiming they were unavailable were stale.
- `output: "export"`, `trailingSlash: true`, local fonts and `agentRules: false`
  were already correct. The working tree was initially clean.

## 2. Implemented changes

Centralized public identity/SEO values in `src/content/site.ts`. Scoped homepage
metadata and JSON-LD to `page.tsx`; the layout retains shared metadata base and
application identity. Added static robots/sitemap routes, dedicated sharing
artwork, an Apple touch icon and a minimal branded 404 to correct its metadata
and provide a return link. Added a reusable exported-output verifier and
optional deterministic asset generator. Updated the stale asset/contact docs.

No dependency, version, routing configuration, theme, homepage design or
professional copy changes were needed. Phase 6 remains deferred.

## 3. Final title and description

Title:

> Ghazaleh Razi — Frontend Engineer | Angular & TypeScript

Description:

> Frontend Engineer specializing in Angular and TypeScript, building scalable, maintainable web applications with a focus on frontend architecture and user experience.

## 4. Canonical implementation

The Metadata API emits exactly one homepage canonical:
`https://ghazaleh-razi.com/`. The trailing slash agrees with the existing export
configuration. `metadataBase` uses the fixed HTTPS origin, never a preview host,
environment-dependent request host or repository URL. Canonical metadata is
page-specific; the 404 has no canonical. Future real pages need their own URLs.
This follows the [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

## 5. Robots and indexing

Homepage robots metadata is `index, follow, max-image-preview:large`. The
framework emits `noindex` only for the not-found output; this is intentional.
`src/app/robots.ts` uses `dynamic = "force-static"` and exports:

```text
User-Agent: *
Allow: /

Sitemap: https://ghazaleh-razi.com/sitemap.xml
```

There are no disallowed public assets or user-agent-specific restrictions.
Robots uses the [Next.js metadata route convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

## 6. Sitemap

`src/app/sitemap.ts` is explicitly static and emits a valid sitemap namespace
with one URL: `https://ghazaleh-razi.com/`. No résumé, section fragments, 404 or
future work routes are listed. No invented last-modified date, frequency or
priority is emitted. Extend the route only when real HTML pages are published.
See the [Next.js sitemap convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

## 7. Structured data and reasoning

One server-rendered JSON-LD graph contains three linked nodes:

- `Person`: verified name, professional title, description, homepage URL,
  existing portrait and verified LinkedIn/GitHub `sameAs` links.
- `WebSite`: the named personal website, English language and person publisher.
- `ProfilePage`: the homepage, its parent website and the person as main entity.

Our semantic judgment is that ProfilePage fits this homepage because its primary
focus is the owner’s professional profile. This is consistent with Google's
[single-person profile guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
The internal `#person`, `#website` and `#profile` graph IDs link those entities;
they are not personal identifiers or additional routes. Dates, employment
relationships, location, phone, ratings, awards and project claims are omitted.
Markup does not establish or promise a Google rich-result appearance.

`JSON.stringify(...).replace(/</g, "\\u003c")` prevents script-termination
injection. The native script is emitted by the Server Component, with no client
SEO library. This follows [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld).
The output verifier parses the JSON and checks entity links and allowed claims;
an external schema validator was not run against a deployed URL.

## 8. Open Graph and Twitter

Open Graph uses `website`, the production homepage URL, site name, English
locale, approved title/description and one absolute PNG URL with MIME type,
dimensions and meaningful alt text. Twitter uses `summary_large_image` with
the same title, description and artwork. No unverified Twitter account is added.
Only the Metadata API emits these tags; there are no duplicate manual meta tags.

## 9. Social image and icons

`public/images/og/ghazaleh-razi.png` is a static 1200×630 PNG, 41,965 bytes.
Its text reads Ghazaleh Razi, Frontend Engineer, Angular & TypeScript and the
production domain. It uses the existing dark neutrals and restrained mint accent,
with no portrait alteration, screenshots, fake terminal or stock imagery.

`scripts/generate-social-image.mjs` uses React and `next/og` already installed by
the lockfile. Next.js's bundled Geist TTF provides portable sans-serif typography;
the renderer does not support the site's WOFF2 fonts. System-font fallback was
detected during visual inspection and removed before final validation. Normal
builds use the checked-in PNG and do not run an image-generation pipeline.

The generator also creates `src/app/apple-icon.png` (180×180, 3,509 bytes).
The existing SVG favicon remains in place. Both use automatic Next.js icon
metadata; their exported asset paths resolve. Social artwork is referenced only
by metadata and does not add a homepage image request or layout shift.

## 10. Semantic and image findings

Exactly one H1, `Frontend Engineer`, remains. The visible name and specialization
are prominent. Existing sections use H2/H3, named sections, an Experience list,
articles and machine-readable date elements. Header/nav/main/footer and skip link
remain intact. No keyword blocks, hidden headings, keywords meta tag or
unsupported language alternates were added.

The portrait's actual dimensions match the existing 1145×1374 attributes. Its alt
is `Portrait of Ghazaleh Razi`; responsive height stays automatic and priority
loading avoids lazy-loading the hero. Its public PNG URL is crawlable. The
portrait bytes and appearance were not changed.

## 11. Link audit

All rendered fragment links resolve to existing IDs: top, main-content, work,
experience, about and contact. The résumé target is an exported PDF. Email is
visible/copyable and uses native `mailto:` links. Verified profile URLs match the
brief and are ordinary crawlable anchors; neither has `nofollow`. Existing
`target="_blank" rel="noreferrer"` is preserved. No fictional case-study links
are rendered or placed in the sitemap. External profile pages/email delivery
were not tested; no messages were sent.

## 12. Generated output and browser verification

Inspected `out/index.html`, `out/404.html`, `out/robots.txt`, `out/sitemap.xml`
and the exported assets. The verifier checks unique title/description/canonical,
robots, OG/Twitter values, image dimensions, JSON syntax and graph references,
static visible content, anchors, identity links, portrait behavior, icon paths,
all local script/stylesheet/image/font references, PDF signature, CNAME and
`.nojekyll`. No localhost/GitHub Pages production metadata was found.

All build routes were marked static: `/`, `/_not-found`, `/apple-icon.png`,
`/icon.svg`, `/robots.txt`, `/sitemap.xml`. Next.js's internal not-found artifact
is not included in the sitemap or linked as a content page.

Headless Chrome 154 tested the production export through a temporary local HTTP
server. Passed desktop 1440×1000 in both themes, mobile 390×844 light and 320×740
dark, image loading, metadata/schema, no horizontal overflow, mobile disclosure
closure and anchor focus. No application console errors or failed homepage asset
responses occurred. With JavaScript disabled, identity, specialization, work
state, experience, About and contact remained visible. An unknown route returned
HTTP 404 with the distinct title, `noindex`, no canonical and a home link.
All seven asset/crawling endpoints below returned HTTP 200 locally.

Screenshots were inspected; temporary QA artifacts are outside the repository at
`C:\Users\ARAMIS3\AppData\Local\Temp\portfolio-phase7-nKExk6`.
The temporary QA script is not a project dependency or shipped asset.

## 13. Exact production URLs verified in the export

These URLs are configured and backed by exported files; this does not claim live
production availability:

| Purpose | Production URL |
| --- | --- |
| Homepage/canonical/OG URL/sitemap entry | `https://ghazaleh-razi.com/` |
| Robots | `https://ghazaleh-razi.com/robots.txt` |
| Sitemap | `https://ghazaleh-razi.com/sitemap.xml` |
| Social artwork | `https://ghazaleh-razi.com/images/og/ghazaleh-razi.png` |
| Portrait | `https://ghazaleh-razi.com/images/ghazaleh-razi-portrait.png` |
| Résumé | `https://ghazaleh-razi.com/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf` |
| SVG favicon | `https://ghazaleh-razi.com/icon.svg` |
| Apple icon | `https://ghazaleh-razi.com/apple-icon.png` |

Next.js adds cache query strings to icon references; the underlying exported
paths were checked. Verified public identity links are
`https://www.linkedin.com/in/ghazaleh-razi`,
`https://github.com/ghazaleh-razi` and `mailto:ghazale.razi@gmail.com`.

## 14. Files added

- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/not-found.tsx`
- `src/app/apple-icon.png`
- `public/images/og/ghazaleh-razi.png`
- `scripts/generate-social-image.mjs`
- `scripts/verify-static-seo.mjs`
- `docs/phase-7-seo.md`

## 15. Files modified

- `src/content/site.ts`: fixed production identity/SEO values.
- `src/app/layout.tsx`: shared metadata only; removes inherited homepage canonical.
- `src/app/page.tsx`: homepage metadata, social tags and safe server-rendered graph.
- `src/components/sections/hero.tsx`: shares the existing portrait path with schema.
- `README.md`: current contact/assets, SEO architecture and maintenance commands.

## 16. Validation commands and results

| Command | Final result |
| --- | --- |
| `npm run lint` (Windows: `npm.cmd run lint`) | Exit 0; zero errors and warnings. |
| `npm run typecheck` | Exit 0; Next route type generation and `tsc --noEmit` passed. |
| `npm run build` | Exit 0; Next.js 16.3.8 production build and static export passed. |
| `node scripts/generate-social-image.mjs` | Exit 0; social PNG and Apple icon generated. |
| `node scripts/verify-static-seo.mjs` | Exit 0; all exported SEO/content/asset assertions passed. |
| `git diff --check` | Exit 0; no whitespace errors. |
| Temporary Chromium CDP QA script | Exit 0; desktop/mobile/themes/no-JS/404/HTTP checks passed. |

An initial lint error required using Next.js `Link` for the 404 home link and was
fixed. Temporary browser assertions needed a selector escape and CSS uppercase
text comparison corrected; no application defect or mobile-nav change resulted.
Browser loopback access required running the temporary QA outside the filesystem
sandbox. No project packages or system configuration were changed.

## 17. Remaining limits before deployment

Public DNS, HTTPS, hostname redirects, real hosting status codes/headers,
Googlebot access, search-engine-selected canonical and social-platform caches
cannot be verified from a local export. External Rich Results Test/Schema Markup
Validator and actual social unfurls remain post-deployment checks. No ranking,
indexing or rich-result guarantee is made. Chromium was checked; Firefox and
Safari/WebKit were not run in this phase.

The existing portrait is 1,697,435 bytes; further delivery/format optimization
belongs to the later performance pass. No client-side SEO code or social-image
page request was added. Field Core Web Vitals need live traffic/measurement.

## 18. Required post-deployment checks

Publish the reviewed export in the later deployment phase. Confirm HTTPS and
the chosen hostname, redirects from alternate hosts/schemes, homepage HTTP 200,
real unknown-path HTTP 404, expected metadata and no unexpected HTTP indexing
headers. Verify all production URLs in section 13, robots/sitemap MIME types,
PDF/image delivery and icon query paths. Check LinkedIn/other social previews
and refresh platform caches if necessary. Validate the live JSON-LD using
Google's Rich Results Test and Schema Markup Validator; assess any reported
feature requirements without fabricating extra properties.

## 19. Search Console after launch

1. Add a Domain property for `ghazaleh-razi.com` and verify with the actual DNS
   token Google provides. No token or verification file was invented here.
   See [property setup and verification](https://support.google.com/webmasters/answer/34592).
2. Submit `https://ghazaleh-razi.com/sitemap.xml` in Sitemaps and check processing
   status. Robots already advertises it. See [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
3. Inspect `https://ghazaleh-razi.com/`, run the live test, check crawl access,
   rendered content and declared canonical, then request indexing once. Monitor
   indexing and Google's selected canonical as data becomes available.
   See [Google's recrawl instructions](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
4. Monitor Page Indexing, applicable structured-data reports, Performance and
   Core Web Vitals when data is available. Requests/submissions are discovery
   signals and do not guarantee indexing or a search appearance.

## 20. Suggested Git grouping

One atomic commit can include the metadata/crawling/schema changes, related
artwork/404, exported-output verifier, generator and documentation:

```text
feat(seo): add production metadata, structured data and social sharing
```

No commit, push, merge, branch operation or PR was performed. All project changes
remain unstaged for the owner's review. Generated Next.js declarations remain
untracked/ignored; package versions, Node/npm requirements and `agentRules: false`
were preserved. No analytics, verification token, deployment, DNS or Phase 6
implementation was added.

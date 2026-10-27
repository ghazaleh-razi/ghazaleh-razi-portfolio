# Phase 12 — Production Acceptance QA

**Launch readiness: FAIL.** The public homepage returns GitHub Pages' generic
“Site not found” HTTP 404 instead of the portfolio. Chrome, Firefox, direct GETs,
and curl reproduce this. Valid TLS and a previously successful deployment do
not establish current production availability. Application interaction and
performance acceptance remain **NOT TESTED**, blocked by the missing site.

## 1. Environment, revision and scope

- Audit date: **October 27, 2026**, approximately **16:25–16:30 Asia/Tehran**
  (12:55–13:00 UTC). Evidence files contain precise UTC timestamps.
- Production target: <https://ghazaleh-razi.com/>; canonical policy is HTTPS,
  apex hostname, root path, trailing slash.
- Repository: `ghazaleh-razi/ghazaleh-razi-portfolio`;
  workspace: `D:\Dev\ghazaleh-razi-portfolio`.
- Local HEAD: `c744202bf3aa8942e3b3b3aeb1bc6cc3dbec812b`, merge of PR #8.
  Initial tracked/untracked working tree was clean. No applicable `AGENTS.md`
  was found in the repository.
- Latest workflow returned by the connected GitHub API:
  [run 37683538594, attempt 2](https://github.com/ghazaleh-razi/ghazaleh-razi-portfolio/actions/runs/37683538594),
  `main`, same SHA, completed successfully October 7, 2026 at 21:07 UTC.
  Both build and deploy jobs and all their steps report success. Deploy logs
  identify artifact `11510973300`, report deployment success for that SHA and
  give the then-current project URL below.
- **Actually served application revision: NOT VERIFIED.** The live document
  is the host's error page and has no application build identifier. The workflow
  SHA above identifies the recorded deployment, not a verified live portfolio.
- Windows; Node `25.9.0`, npm `10.8.2`, Next.js `16.3.8`; existing locked
  installation reused. Node 24 CI is distinct from this local Node environment.
- Actual browsers: Chrome `155.0.8059.85`, Firefox `158.0.1`, headless,
  installed executables, cached Puppeteer, isolated temporary profiles.
- No packages/browser engines were installed. No application source, content,
  DNS, Pages settings, workflows or system configuration was changed. No
  commit, push, merge, workflow dispatch or deployment was performed. Local
  checks regenerated ignored build/type output. This report is the sole
  intended repository change. Phase 6 remains deferred.

## 2. Checklist sources and methodology

Read `docs/phase-7-seo.md`, `docs/phase-8-qa.md`, `docs/deployment.md`, the complete
`scripts/verify-static-seo.mjs`, implementation, content, `next.config.ts`,
package scripts/lockfile and `.github/workflows/deploy-pages.yml` before testing.
No separate Phase 9/performance report or explicit numeric budget was found in
the tracked tree. The connected GitHub API supplied the actual
[Phase 9 PR #7](https://github.com/ghazaleh-razi/ghazaleh-razi-portfolio/pull/7)
description as the available performance baseline (section 8).

Acceptance requires the previously tested portfolio behavior on the **live
origin**: HTTP 200 homepage, genuine branded unknown-route 404, one correct
canonical, indexable homepage, noindex 404, complete assets, honest deferred
projects, responsive reflow, accessible keyboard/menu behavior and all theme
modes. Local build results are reported independently in section 7.

Methods actually used:

1. Read-only HTTP GETs with Node's `http`/`https`, strict certificate validation,
   identity transfer encoding, response bodies/headers, hashes, timings and
   redirect following capped at eight hops. Four origin variants, a unique
   missing path, cache-busting query and static endpoints were requested.
   curl/Schannel independently checked the homepage and project URL.
2. TLS handshakes for apex and www used SNI and `rejectUnauthorized: true`;
   certificate chain/hostname/date validation was never bypassed.
3. Read-only DNS queries; HTTPS requests using each returned A address with
   the original hostname/SNI. All reached the same reported FRA edge; this
   is not independent geographic coverage. No DNS/hosts-file edit was made.
4. Chrome navigation with response, console, `pageerror`, failed-request,
   DOM/metadata, image and PerformanceObserver collection; screenshots.
   Chrome matrix: 1440×900 Light/Dark OS preference, 320×568 Light/Dark,
   768×1024 Light, 896×900 Dark. These are six observations of the host error
   page, **not six passed portfolio layout/theme cases**. Unknown-path tested
   at 390×844. Firefox confirmed the homepage at 1440×900 and 320×568.
5. Desktop and narrow Chrome screenshots were visually inspected. Browser
   traffic went to production; no localhost server or response substitution
   was used. No mail was sent and no forms/account state were changed.

The initial sandboxed network request failed to connect, and the web-fetch
tool could not open production. Neither was treated as a site failure.
Authorized execution outside the network sandbox then produced actual HTTP
responses and real browser evidence. An initial temporary per-IP probe had a
Node lookup-callback error; its corrected run produced the results below.
This was a harness error, not an application defect.

**Status meanings:** PASS = observed criterion met; FAIL = observed mismatch;
NOT TESTED = no valid execution of that application criterion. A blocked
interaction is not a PASS merely because no JavaScript exception occurred.

## 3. Live transport, redirects and status evidence

| URL / criterion | Expected | Observed | Result |
| --- | --- | --- | --- |
| `http://ghazaleh-razi.com/` | Redirect to canonical HTTPS homepage | 404, no `Location`, no redirect | FAIL |
| `https://ghazaleh-razi.com/` | Portfolio HTTP 200 | Generic GitHub Pages HTTP 404 | FAIL |
| `http://www.ghazaleh-razi.com/` | Redirect to canonical HTTPS apex | 404, no `Location` | FAIL |
| `https://www.ghazaleh-razi.com/` | Redirect to HTTPS apex | 404, no `Location` | FAIL |
| `https://www.ghazaleh-razi.com/phase-12-unknown-20261027/?qa=12` | Canonical host redirect retaining path/query, then 404 | Immediate generic 404, no redirect | FAIL |
| `https://ghazaleh-razi.com/phase-12-unknown-20261027/` | Genuine HTTP 404 | HTTP 404 | PASS — status only |
| Same unknown path, branded UI | Portfolio “Page not found” and home link | Host “There isn't a GitHub Pages site here” page | FAIL |
| `/404.html` | Exported portfolio error document | Generic host 404 | FAIL |
| `/?phase12=20261027` | Same functioning homepage | Generic 404 | FAIL |
| Redirect loops, requested variants | No loop | Zero redirect hops; terminal 404 responses | PASS — loop absence only |
| HTTPS certificate, apex and www | Trusted, current, hostname covered | Both authorize successfully, TLS 1.3 | PASS |
| Actual Pages custom-domain/Enforce HTTPS setting | Read current setting | Connected fetch does not expose Pages administration; no settings access used | NOT TESTED |

The owner's prior DNS/SSL/Enforce HTTPS confirmation is acknowledged. The
observed public responses at the audit time do not exhibit HTTPS enforcement
or canonical-host redirects. Their cause is not established by this audit.

Certificate: subject `CN=ghazaleh-razi.com`; SANs `ghazaleh-razi.com` and
`www.ghazaleh-razi.com`; issuer Let's Encrypt `YR2`; valid October 27, 2026
11:04:43 UTC through January 25, 2027 11:04:42 UTC. SHA-256 fingerprint:
`4D:BF:FB:07:7E:DB:90:19:93:B9:DB:96:D7:D9:5F:26:ED:EC:99:61:C6:93:A4:CD:97:F2:C7:47:3B:3C:66:DA`.
Revocation/OCSP and a full external TLS security scan were **NOT TESTED**.

DNS observed: apex A records `185.199.108.153`, `185.199.109.153`,
`185.199.110.153`, `185.199.111.153`; www CNAME `ghazaleh-razi.github.io`.
All four explicit-address HTTPS probes also returned 404, without `Location`.
The historical deployment URL
<https://ghazaleh-razi.github.io/ghazaleh-razi-portfolio/> returned 404 too
(no redirect, remote IP `185.199.111.153`). This diagnostic does not change the
accepted root-origin architecture or justify adding a repository `basePath`.

Representative production GET at 12:57:14 UTC:

```text
HTTP/1.1 404 Not Found
Server: GitHub.com
Content-Type: text/html; charset=utf-8
Content-Length: 9115
ETag: "6abcf5c5-239b"
X-GitHub-Request-Id: B470:35DF24:DD8AEC:DF3058:6AE09F51
X-Served-By: cache-fra-eddf8230043-FRA
```

Title: `Site not found · GitHub Pages`. Body SHA-256:
`70d613e3acfba24fd2876fcbacaf639e1e111ef4d54baf70761c47673f37d6a3`.
No `X-Robots-Tag` was present. The response carries the host error-page CSP,
including `default-src 'none'`; it must not be mistaken for application policy.

## 4. Live static-file acceptance

All paths in this table were actually requested at `https://ghazaleh-razi.com`.
Every one returned **404**, `text/html; charset=utf-8`, **9,115 bytes** of host
error HTML rather than the requested asset. Each asset criterion is **FAIL**.

| Asset | Requested path |
| --- | --- |
| Portrait small WebP | `/images/ghazaleh-razi-portrait-768.webp` |
| Portrait large WebP | `/images/ghazaleh-razi-portrait-1145.webp` |
| Original/schema portrait | `/images/ghazaleh-razi-portrait.png` |
| Social preview | `/images/og/ghazaleh-razi.png` |
| SVG icon | `/icon.svg` |
| Apple icon | `/apple-icon.png` |
| Résumé | `/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf` |
| Inter | `/_next/static/media/inter_latin_wght_normal-s.p.0gsaq8ukbf34m.woff2` |
| Manrope | `/_next/static/media/manrope_latin_wght_normal-s.p.1p_a2k8qd5zhp.woff2` |
| CSS | `/_next/static/chunks/42_4u71jaxmoj.css` |
| JS | `/_next/static/chunks/310vm2bl3xxpt.js` |
| JS | `/_next/static/chunks/19mx3mg6lkumu.js` |
| JS | `/_next/static/chunks/1rj7ns8rte9vc.js` |
| JS | `/_next/static/chunks/0erpg4rnzkm4w.js` |
| JS runtime | `/_next/static/chunks/turbopack-1g4yvkg6ged8k.js` |
| JS | `/_next/static/chunks/3fntmmi971322.js` |
| JS | `/_next/static/chunks/22i43cg4l4-dq.js` |
| JS | `/_next/static/chunks/2wqg8d61js-la.js` |
| JS | `/_next/static/chunks/0cz1d0mv5g_q7.js` |

Fingerprint paths were extracted from the **fresh local export**, including CSS
font URLs. They are candidate paths tested on production, not paths discovered
in a functioning live document. The historical CI artifact's exact fingerprints
were not independently matched. Fixed public image/PDF paths are the accepted
production contract and fail regardless of fingerprint uncertainty.

Responsive source selection at actual device DPR, image decoding/appearance,
font rendering, icon cache-query requests and PDF viewer/download behavior are
**NOT TESTED** on the portfolio. Local existence/signature checks are separate.

## 5. Live browser, accessibility and content matrix

| Acceptance criterion | Evidence / limitation | Result |
| --- | --- | --- |
| Portfolio renders on desktop/mobile | Chrome and Firefox show the host's 404 at both sizes | FAIL |
| Portfolio 320px minimum and intermediate reflow | Application absent; cannot assess accepted layout | NOT TESTED |
| Light/Dark selection, persistence, first paint | No theme control or application markup in live DOM | NOT TESTED |
| System theme and live OS preference changes | OS Light/Dark emulated in Chrome; only host error page rendered | NOT TESTED |
| Mobile disclosure: Enter/Space, Escape, outside click, select/close, resize focus | No application mobile menu in live DOM | NOT TESTED |
| Section anchors, sticky offsets, destination focus, history/back-to-top | No portfolio sections/anchors | NOT TESTED |
| Skip link, keyboard order/focus, no traps, constrained-menu scrolling | No portfolio controls | NOT TESTED |
| 200% text/zoom reflow, reduced motion, touch | Application unavailable; prior local results are not rerun live | NOT TESTED |
| Semantic/axe accessibility and contrast | No valid portfolio document to audit | NOT TESTED |
| Clean production network/console | Each Chrome homepage navigation logs document 404 and “Failed to load resource” | FAIL |
| React hydration and application runtime | Zero scripts in returned DOM; no application JS executes | NOT TESTED |
| Mixed content in the portfolio | Error document has no external resource entries; portfolio dependencies never loaded | NOT TESTED |
| Honest deferred-project presentation in live content | Selected Work never renders | NOT TESTED |
| Honest deferred projects in source/export | `publishedProjects = []`; planned projects explicitly labelled; no `/work/` links; verifier passed | PASS — local only |
| GitHub profile target | Direct GET <https://github.com/ghazaleh-razi> returns 200 | PASS — target availability only |
| LinkedIn target | Direct GET <https://www.linkedin.com/in/ghazaleh-razi> returns 999, platform restriction | NOT TESTED — human/profile availability |
| Contact/mailto and actual résumé clicks from live UI | UI absent; no mail sent; PDF URL independently returns 404 | NOT TESTED — interaction; PDF availability FAIL |

Chrome measured the host error page's document width as 700px at a 320px
viewport, and 784px at 768px; Firefox also measured 700px at 320px. Visually
inspected screenshots confirm the generic GitHub page, which has no portfolio
identity, navigation or portrait. This overflow belongs to the host fallback;
it is not evidence that the accepted application CSS regressed.

There were no Chrome `pageerror` events or transport-level `requestfailed`
events in the six completed navigations. HTTP error responses still count as
failures. These empty event lists do not certify the unloaded application.
External profiles were checked independently of the absent homepage. LinkedIn
999 is not enough evidence to call the profile URL broken. Mail client launch,
email delivery and résumé contents were not re-certified.

## 6. Live technical SEO matrix

| Criterion | Observed production result | Result |
| --- | --- | --- |
| Approved unique title | Host title replaces `Ghazaleh Razi — Frontend Engineer \| Angular & TypeScript` | FAIL |
| Approved description | No description metadata | FAIL |
| HTTPS apex homepage canonical | No canonical tag | FAIL |
| Homepage indexability | Homepage is HTTP 404; accepted content unavailable to crawlers | FAIL |
| Homepage robots meta | No `index, follow, max-image-preview:large` | FAIL |
| `/robots.txt` | 404 HTML instead of 200 text with sitemap directive | FAIL |
| `/sitemap.xml` | 404 HTML instead of 200 XML containing only canonical homepage | FAIL |
| Person/WebSite/ProfilePage JSON-LD | No JSON-LD script | FAIL |
| OG/Twitter tags and image | No OG/Twitter tags; image URL 404 | FAIL |
| Unknown-path explicit `noindex` | No robots meta or `X-Robots-Tag` | FAIL — expected metadata absent |
| Unknown-path no homepage canonical/graph | Neither exists in returned document | PASS — narrowly scoped |
| Rich Results Test / Schema Markup Validator | No deployed portfolio graph to validate; external validators not run | NOT TESTED |
| Search Console, Google-selected canonical/indexing, social unfurl caches | No account/platform validation performed | NOT TESTED |

HTTP 404 is itself a non-indexable error status; absence of a `noindex` tag on
the host error document is not proof that Google will index it. The failed
criterion is delivery of the accepted branded 404 and its explicit metadata.
The fresh local export retains the intended SEO configuration (section 7).

## 7. Repository/configuration review and local validation

Configuration inspection agrees with prior decisions: static export,
`trailingSlash: true`, `agentRules: false`, no repository `basePath` or
`assetPrefix`, local Inter/Manrope, server-rendered homepage metadata/JSON-LD,
native enhanced mobile disclosure and Light/Dark/System control. Homepage
metadata is page-scoped; the custom 404 does not inherit homepage identity.
Portrait delivery remains authored WebP `srcSet`/`sizes`, eager/high priority,
with 1145×1374 intrinsic dimensions; original PNG remains the schema image.

The workflow validates before uploading only `out/`, uses Node from `.nvmrc`,
separate build/deploy jobs, job-scoped permissions, the `github-pages`
environment and serialized Pages concurrency. `.nojekyll` is retained; `CNAME`
absence is intentional for the accepted Actions deployment. No configuration
change is proposed from a generic host 404 without checking hosting state.

| Existing command executed in workspace | Result | Scope |
| --- | --- | --- |
| `npm.cmd run lint` | PASS, exit 0, zero warnings/errors | Local source |
| `npm.cmd run typecheck` | PASS, exit 0, Next typegen and TypeScript | Local source/types |
| `npm.cmd run build` | PASS, exit 0, Next 16.3.8 static export | Local build |
| `node scripts/verify-static-seo.mjs` | PASS, exit 0, all current assertions | Fresh local `out/` |
| `git -c safe.directory=D:/Dev/ghazaleh-razi-portfolio diff --check` | PASS, exit 0 | Local whitespace |

Commands ran in that order; no `npm ci` or install was needed. Git used a
command-local ownership override because sandbox and repository owners differ;
global Git configuration was not changed. These passes do **not** validate
live hosting, redirects or availability.

The verifier confirmed homepage metadata/social graph, crawlable content,
anchors/identity targets, 404 title/noindex/no canonical, robots/sitemap,
responsive portrait references, local assets, PDF signature, `.nojekyll` and
intentional `CNAME` absence. It is an artifact verifier, not a live HTTP test.
Local social PNG is 1200×630, 41,965 bytes; local PDF is 86,834 bytes.

## 8. Baseline comparison and performance

| Baseline | Previously accepted evidence | Phase 12 comparison |
| --- | --- | --- |
| Phase 7 | Local metadata, graph, crawling files, 404 and static assets passed | Fresh local verifier still passes; live delivery fails |
| Phase 8 | Chrome 154/Firefox 156; 60 viewport/theme cases, axe, keyboard, menu/reflow fixes | Current Chrome 155/Firefox 158 confirm host failure; application matrix NOT TESTED |
| Phase 9 PR #7 | Responsive WebP optimization; controlled local production-static lab | Source derivatives preserved; no valid live application performance sample |
| Phase 10 | Actions build/upload/deploy architecture | Historical recorded run successful; current public acceptance fails |

Available Phase 9 PR measurements:

| Metric | Before | Accepted optimized baseline | Live portfolio result |
| --- | --- | --- | --- |
| Mobile LCP | 11.86s | 2.31s | NOT TESTED |
| Desktop LCP | 2.16s | 0.43s | NOT TESTED |
| Initial transferred bytes | 2.31MB | 695KB | NOT TESTED |
| Mobile portrait transfer | 1.70MB | 94KB | NOT TESTED |
| CLS | 0 | 0 | NOT TESTED |
| Request count | Not numerically specified | Unchanged | NOT TESTED |

PR #7 calls these controlled local production-static lab results, not field
Core Web Vitals. Its description does not provide exact CPU/network throttling,
viewport/DPR, cold-cache procedure, run counts or a formal numeric budget.
No missing methodology or threshold is invented here. Local source assets
remain 94,040 bytes (768 WebP), 176,554 bytes (1145 WebP) and 1,697,435 bytes
(original PNG). This supports preservation of the optimization, not proof of
live transfer or source selection.

Lighthouse: **NOT TESTED**. No usable cached Lighthouse runner was identified
in the inspected tool cache; no package was installed. More fundamentally,
the application is unavailable, so scoring the host's 404 would not measure
this portfolio. Field CWV/CrUX and INP are **NOT TESTED**.

Browser instrumentation was available and captured the fallback only: first
Chrome 1440px Light sample had response start 314ms, DCL 329ms, load 330ms,
FCP/observed LCP candidate 380ms and navigation transfer 5,442 bytes. No layout
shift entry or subresource entry was captured. These are unthrottled host-error
diagnostics, not finalized application CWV or comparable Phase 9 results.
They are explicitly excluded from performance acceptance.

## 9. Defects and minimal proposed remediation

Severity policy: P0 = entire public portfolio unavailable; P1 = release-blocking
origin/transport behavior; P2 = material partial functionality/accessibility;
P3 = minor issue. Symptoms with the same likely hosting dependency are grouped
to avoid inventing separate application defects.

### PROD-01 — P0 — Public portfolio replaced by host 404

**Reproduce:** Open <https://ghazaleh-razi.com/> in Chrome or Firefox, or run
`curl.exe -I https://ghazaleh-razi.com/`. GET and cache-busting queries reproduce
the same result. Open `/robots.txt`, `/sitemap.xml` or the résumé URL as well.

**Expected:** Homepage HTTP 200 with the portfolio; public files HTTP 200 with
their real MIME/content; unknown paths use the branded application 404.

**Actual:** Homepage and fixed public files return generic Pages HTTP 404.
Identity, all portfolio interaction, SEO/schema/social metadata and résumé
delivery are unavailable. Screenshots and raw responses are retained below.

**Suggested minimum fix, after review/authorization:** Inspect the current
repository Pages publication/custom-domain association and the current
`github-pages` deployment/artifact state. Reconcile the missing publication
with the historically successful run; restore the accepted artifact/hostname
association through the smallest evidenced hosting correction. Check repository
visibility/Pages eligibility if publication state warrants it. No specific
setting, subscription or DNS fault has been established. Do not redesign the
application, add `basePath`, add a CNAME file or change the workflow speculatively.
Retest all fixed URLs and then the blocked browser/performance matrix.

### PROD-02 — P1 — Origin variants do not redirect

**Reproduce:** Request the three alternate scheme/hostname combinations in
section 3, including the www unknown path with query. Use direct HTTP GET/curl
rather than a browser that may upgrade HTTP from its own HTTPS policy.

**Expected:** Finite permanent redirect chain to `https://ghazaleh-razi.com/`,
retaining path/query; HTTPS enforcement observable publicly.

**Actual:** Each alternate responds 404 without `Location`. TLS itself succeeds.

**Suggested minimum fix, after authorization:** Once PROD-01 is resolved,
recheck the existing Pages canonical-domain and HTTPS enforcement state and
wait for any confirmed pending propagation. Correct only the demonstrated
hosting mismatch if it persists. This may share PROD-01's cause; do not assume
an independent code defect or add client-side redirects.

No separate P2/P3 source defect was established in this pass. Lack of usable
live application coverage is not evidence of their absence.

## 10. Evidence location, remaining checks and verdict

Temporary evidence/tools (outside repository):
`C:\Users\ARAMIS3\AppData\Local\Temp\portfolio-phase12-20261027-qa`.

- `http-audit.cjs`, `http-results.json`, base64url-named `.body` files: requested
  URLs, full headers, status/hops, body bytes/hash and request duration.
- `tls-results.json`; `edge-audit.cjs`, `edge-results.json`: strict TLS and
  address-specific observations.
- `browser-audit.cjs`, `browser-chrome.json`; `chrome-*.png` / `chrome-*.html`:
  six browser observations, DOM, console, performance and screenshots.
- `firefox-audit.cjs`, `browser-firefox.json`, `firefox-1440.png`,
  `firefox-320.png`: second-engine confirmation.
- `github-project.headers`, `github-project.html`: historical project URL.
- Connected read-only GitHub workflow evidence is linked in section 1; Phase 9
  baseline is linked in section 2. The connector rejected deployment-list
  endpoint access; current deployment association/settings are not certified.

These are temporary diagnostics, not maintained project tooling or durable CI
artifacts. Required reproduction details are recorded in this report in case
the temporary directory is later removed. Browser processes launched by the
audit were closed; no local server was started.

Remaining acceptance, after the host serves the portfolio:

1. Owner/release engineer: inspect current Pages domain/publication/HTTPS state
   and resolve PROD-01/02 under separate authorization. Rerun HTTP/TLS/redirect
   tests, homepage 200, real nested unknown-path 404, branding/noindex and all
   fixed/fingerprinted assets. Identify the actually served release.
2. Rerun the Phase 8 viewport matrix in both themes, especially 320px,
   767/768px and 895/896px transitions, landscape and 200% text/zoom. Verify
   Light/Dark/System, first paint/persistence, OS changes, storage fallback,
   cross-tab behavior and reduced motion on the actual production document.
3. Exercise keyboard skip/focus order, mobile open/Escape/outside/selection,
   focus restoration, desktop resize, sticky anchor offsets/history, final
   résumé link in constrained menus, touch, no-JS content and automated axe.
   Inspect console/hydration, failed assets, mixed content and font/image loads.
4. Manually test Safari/WebKit, physical mobile devices and a screen reader.
   These engines/devices/assistive technologies were **NOT TESTED** here.
5. Confirm résumé PDF opens/downloads and is current; mailto launches the
   intended client; human access to LinkedIn works. Verify live deferred Work
   copy and absence of fictional case-study routes. No email delivery test is
   authorized or implied by the link check.
6. Reinspect live SEO and validate JSON-LD with external schema tools; preview
   LinkedIn/social cards. Owner checks Search Console live inspection,
   canonical/indexing and sitemap processing; do not infer ranking from tags.
7. Measure the functioning portfolio using recovered Phase 9 throttling/cache
   methodology where available, multiple cold runs, actual portrait selection,
   request/transfer counts and lab CWV. Agree any absent formal budgets before
   claiming budget compliance. Field data requires real eligible traffic.

**Final release verdict: FAIL.** PROD-01 blocks launch acceptance; PROD-02 also
fails the canonical-origin requirement. Local source/build checks pass, but
cannot substitute for a functioning production deployment. No fix has been
implemented. Stop here for review and authorization before remediation.

## Final Production Acceptance — October 27, 2026

Root cause: Repository visibility was changed to Private,
which disabled GitHub Pages.

Resolution:
- Restored repository visibility to Public.
- Re-enabled GitHub Actions deployment.
- Confirmed custom domain and enforced HTTPS.
- Successfully completed deployment workflow #2.
- Verified production homepage returned HTTP 200.
- Website rendering confirmed by the owner.

Final status: ACCEPTED by owner.

The previously blocked full production browser/performance
matrix was not rerun. Earlier local QA results remain valid
as historical evidence, not new production test results.
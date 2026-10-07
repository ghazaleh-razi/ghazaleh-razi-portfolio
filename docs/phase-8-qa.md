# Phase 8 — production readiness QA

Completed October 7, 2026 on `test/portfolio-qa`. Four reproduced P2 defects
were fixed. No known P0/P1/P2 defect remains in the tested production export.
The implementation and approved visual direction were preserved; Phase 6
remains deferred. This report covers local QA, not a production deployment.

**Baseline and scope**

The starting working tree was clean. The current repository was treated as
authoritative; the supplied specification and Light/Dark reference were used
as context without replacing the existing design or publication state.
No Phase 4 specification was attached.

The architecture already used Next.js 16.3.8, React, strict TypeScript, static
export, trailing slashes, local Inter/Manrope fonts, and `agentRules: false`.
Only `MobileNav` and `ThemeControl` were Client Components. The native
`details`/`summary` menu was a non-modal disclosure. The native theme select
supported Light/Dark/System, pre-paint preference resolution and storage sync.
Sections, content, résumé/contact links, responsive styles, focus, motion,
images, 404 and Phase 7 SEO were inspected before editing. Baseline lint,
typecheck, production build and the existing static SEO verifier passed.

Selected Work correctly presented planned projects without fictional case-study
links. Homepage metadata and structured data were page-scoped; the branded
404 had distinct metadata and no homepage canonical/graph. No change was
needed to either implementation.

**Browsers and rendered viewports actually tested**

| Engine/environment | Actual coverage |
| --- | --- |
| Google Chrome 154.0.8037.98, Chromium, Windows, headless/CDP | Full viewport matrix, keyboard, themes and live OS-preference emulation, reduced motion, axe, no JavaScript, touch emulation, reflow, links/assets and 404. |
| Firefox 156.0.1, Gecko, Windows, headless/WebDriver BiDi | Full viewport matrix in explicit Light/Dark, keyboard, menu/focus, axe, reflow, storage sync, links/assets and 404. Reduced motion was tested with a browser startup preference. |
| WebKit/Safari | Not run. The cached Playwright package had no installed WebKit executable. No browser/package installation was performed. |

Both engines rendered every size below in Light and Dark: 60 cases in total.
Measurements covered overflow, image loading/aspect ratio, header bounds and
font loading. Representative mobile, tablet, desktop, menu, enlarged-text and
404 screenshots were visually inspected. Additional focused regression tests
ran after the final mobile-menu change.

| Group | CSS viewport sizes |
| --- | --- |
| Mobile | 320×568, 360×800, 375×812, 390×844, 430×932 |
| Tablet/intermediate | 768×1024, 820×1180 |
| Desktop | 1024×768, 1280×800, 1440×900, 1920×1080 |
| Landscape/breakpoint checks | 568×320, 767×900, 895×900, 896×900 |

Final measurements found no unintended horizontal overflow. Hero/portrait,
CTAs, deferred Work, Experience, About, Contact, footer and breakpoint behavior
remained usable. The portrait retained its intrinsic aspect ratio.

**Defects discovered and fixed**

| ID | Severity | Reproduction and correction |
| --- | --- | --- |
| QA-01 | P2 | At 200% text enlargement the non-wrapping header overflowed: Chrome measured 1173px of document width at a 768px viewport, and 1182px at 1024px. Firefox reproduced the failure. Header/navigation now wrap. A header ResizeObserver supplies the actual sticky-header height to anchor offsets and menu height; the no-JS fallback is conservative. This also prevents wrapped headers from covering anchor headings or their focus outline. |
| QA-02 | P2 | At 320px with 200% text, the portrait's 400px minimum and intrinsic grid sizing pushed content outside the page; the original document measured 444px wide. Long Work/Experience text and unbreakable dates also failed at narrow enlarged sizes. The hero uses a shrinkable grid track, portrait width is capped at its container, page text can wrap long words, and dates can wrap. Final widths were 320px in Chrome and 303px plus Firefox's scrollbar at a 320px viewport. |
| QA-03 | P2 | Closing the mobile menu through its résumé link discarded focus to `body` in both engines. Non-fragment menu selection now restores focus to `summary`; section links still focus their destination. The close/focus handler was tested with PDF navigation suppressed, and the actual PDF was independently fetched and parsed. |
| QA-04 | P2 | In Firefox at 568×320, keyboard focus reached the résumé link but native focus scrolling left its bottom at 324px, below the menu's 319px bottom. Scroll padding alone did not fix native focus behavior. A guarded next-frame native `scrollIntoView({ block: "nearest", inline: "nearest" })` plus scroll padding now keeps the link and outline visible. Its bottom is 310px in both engines. At 320×568 with 200% text it is 550px, within the 567px menu bottom. |

No P0/P1 defect was found. No subjective P3 polish changes were made. The
next-frame focus callback checks that the menu is still open and the same
element remains focused, so closing/selecting does not trigger stale scrolling.

**Accessibility, keyboard, mobile navigation and touch**

Keyboard walkthroughs covered the skip link, wordmark, desktop navigation,
theme select, résumé links, hero actions, Work-to-Experience link, contact and
profile links, footer and the 404 return link. Tab order was logical and visible
focus was retained. Skip activation focused `main`; there was no keyboard trap.
The menu supported Enter/Space, first-link access, Escape with focus return,
closing after selection, destination focus, tabbing out and desktop-resize
focus recovery. It remains non-modal and does not trap focus or lock scrolling.

The native trigger semantics, expanded state and `aria-controls` relationship
were checked. Chromium's accessibility tree also exposed the correct native
expanded state without JavaScript. Constrained landscape and enlarged-text
menus stayed within the viewport, scrolled and exposed the final résumé link.
Chromium touch emulation activated Menu and About successfully. Header controls
were at least 44px tall at normal text size, menu links at least 48px, and the
Experience action 40px; no essential interaction depended on hover.

Semantic inspection confirmed English document language, one meaningful H1,
H2/H3 hierarchy, header/nav/main/section/footer landmarks, section labels,
unique IDs, valid fragment targets, native links/select/disclosure, portrait alt
text, hidden decorative SVGs, lists and ISO `<time>` values. No redundant ARIA
was introduced.

Existing transitive `axe-core` was run without adding a dependency. Both engines
reported zero violations for mobile/desktop Light/Dark, the open menu, and 404.
The open-menu audit marked contrast of five covered hero text elements as
incomplete; those elements passed with the menu closed and their token contrast
was reviewed separately. Automation supplemented keyboard and visual checks;
no screen reader or physical assistive technology was tested.

**Theme, motion and contrast**

Chromium verified first visit, explicit Light/Dark, System, refresh/persistence,
OS changes while System was selected, and explicit preference overriding the OS.
A saved Dark preference was present at the first animation frame with a dark
background and `0s` body transition. No initial correction animation or hydration
error was observed. Both engines passed cross-tab Light/Dark synchronization,
storage-clear fallback to System, and current-tab selection with blocked storage.
Homepage sections and the 404 were checked in both themes. Firefox's live OS
preference changes were not emulated; explicit themes were genuinely rendered.

Reduced-motion checks produced `scroll-behavior: auto` and nonessential transition
durations of 0.00001s in both engines. Chromium tested changing the media
preference; Firefox used its startup preference. Content remained immediately
available and controls continued to work.

WCAG AA text/focus pairings passed. These are calculated sRGB contrast ratios
for the actual semantic tokens; ranges cover background, surface and subtle
surface where relevant.

| Pairing | Light | Dark |
| --- | --- | --- |
| Main text / page background | 17.36:1 | 17.44:1 |
| Secondary/muted text / surfaces | 4.98–5.64:1 | 7.51–8.40:1 |
| Accent text / surfaces | 4.64–5.26:1 | 9.44–10.57:1 |
| Primary button label / fill | 16.96:1 | 10.57:1 |
| Primary button label / hover fill | 11.18:1 | 12.22:1 |
| Offset focus outline / surrounding surfaces | 4.64–5.26:1 | 9.44–10.57:1 |

Decorative borders were not treated as essential control boundaries. No palette
change was needed, so there are no failing/corrected color ratios to report.

**200% zoom and text reflow**

Both engines were checked at equivalent 200% zoom viewports of 640×400 and
720×450 with device scale 2. This was viewport/scale emulation, not interaction
with a browser's zoom UI. Independent equivalent text enlargement set the root
font to 200%, including widths 320, 360, 390, 430, 640, 768, 820, 896, 1024,
1440 and 1920 at 900px height. After correction, content and controls reflowed
without horizontal scrolling. Anchor headings cleared the actual header with
space for focus. The 320px no-JS enlarged-text check also passed: header bottom
281px, Work heading about 320px, document width 320px.

**Links, assets, console/network and no JavaScript**

All rendered fragments resolved, IDs were unique, and no fictional project
route was linked. Native anchor back/forward history and Back to top passed.
Every résumé link used
`/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf`; the exported HTTP response
was 200 with a PDF signature, and an existing cached PDF parser successfully
read its two pages. The résumé was not modified. No phone number was introduced
into UI or structured data.

Contact hrefs matched the existing owner-verified values:
`mailto:ghazale.razi@gmail.com`,
`https://www.linkedin.com/in/ghazaleh-razi` and
`https://github.com/ghazaleh-razi`. The visible email remained copyable. Third-party
profile availability and an operating system's mail/PDF application were not
certified; no email delivery was attempted.

Portrait, OG image, SVG icon, Apple icon and local fonts loaded/backed valid
exported URLs. The portrait was 1145×1374 with no distortion or lazy loading.
The OG image was 1200×630 and 41,965 bytes. Inter and Manrope loaded locally;
no unexpected external asset dependency was found.

No application exception, React/hydration error, application warning, mixed
content or missing application asset was found. Chromium logged the intentional
missing-route HTTP 404s. Request cancellations during script-disabled/return-home
tests were distinguished from broken assets; normal asset responses and the
exported files passed verification.

With JavaScript disabled in Chromium at mobile Light and desktop Dark, identity,
positioning, Angular/TypeScript, hero copy, deferred Work, Experience, About,
Contact, résumé and profile links remained readable and functional. The native
mobile disclosure and anchor navigation worked. Theme selection/persistence,
automatic menu dismissal, Escape/focus recovery and measured-header/focus-scroll
enhancements depend on JavaScript; CSS System theme and static content do not.
Firefox no-JS testing was not completed: the BiDi scripting command was unsupported
and an isolated disabled-JavaScript profile stalled. That QA process was stopped.

**404, SEO and production output**

A genuinely nonexistent local URL returned HTTP 404 with the exported branded
page. Both themes, mobile/desktop, skip link and keyboard return-home behavior
passed. It had its own title, intentional `noindex`, no homepage canonical, no
homepage JSON-LD and no sitemap entry. The local server modeled static-host 404
delivery; actual GitHub Pages status codes remain a deployment check.

The existing Phase 7 verifier passed the generated output: title, description,
canonical, robots metadata/file, sitemap, Open Graph, Twitter, JSON-LD graph,
social image, icons, assets and crawlable primary content. SEO source files and
strategy were unchanged. Static export continued to produce deployable `out/`.

**Files, validation and environment limits**

Modified files: `src/app/globals.css` and
`src/components/layout/mobile-nav.tsx`. Added file: `docs/phase-8-qa.md`.
No dependency, package version, Node/npm setting, architecture, routing,
deployment setting, generated declaration policy, content or image was changed.
`next-env.d.ts` remains generated and ignored. Temporary QA scripts/screenshots
were moved out of the repository to
`C:\Users\ARAMIS3\AppData\Local\Temp\portfolio-phase8-27fe582d2f554511afa4d67abe76dff1`.
No local QA server remains running.

| Exact validation command | Final result |
| --- | --- |
| `npm.cmd run lint` | Pass; zero errors/warnings after temporary tooling was removed from the repository. |
| `npm.cmd run typecheck` | Pass; Next type generation and TypeScript passed. |
| `npm.cmd run build` | Pass; Next.js production build and static export passed. |
| `node scripts/verify-static-seo.mjs` | Pass; all existing export assertions. |
| `git -c safe.directory=D:/Dev/ghazaleh-razi-portfolio diff --check` | Pass; no whitespace errors. |
| `node .qa-phase8/audit.cjs` | Pass; 60 rendered viewport/theme cases and interaction/accessibility checks, zero application assertions failed. |
| `node .qa-phase8/audit.cjs all quick` | Pass; final interaction/keyboard/reflow/theme/404 regression after the constrained-menu fix. |
| `node .qa-phase8/targeted.cjs` | Pass; recorded reflow/anchor, focus, cross-tab, blocked-storage and touch results. |
| `node .qa-phase8/final-edge-cases.cjs` | Pass; both constrained menus, final résumé-link visibility, Chromium no-JS enlarged text and explicit Light 404. |

The temporary commands above ran before archival and are recorded exactly as
executed; their scripts are not shipped project tooling. Temporary server/API/
focus-restoration harness failures were isolated from application failures.
An intermediate lint run included temporary CJS QA files and failed; the final
lint run excludes them through their removal, without weakening ESLint.
Browser loopback access required execution outside the filesystem sandbox.
Git read commands used a command-local ownership override; Git configuration
was not changed. Runtime was Node 25.9.0 and npm 10.8.2, satisfying `node >=24`;
Node 24 LTS itself was not separately tested.

Safari/WebKit, Edge as a separate browser, physical mobile devices, screen readers
and other physical assistive technologies were not tested. Firefox's live OS
preference switching and no-JS mode remain environment coverage limitations.
Live DNS/HTTPS, hosting headers/status/redirects, social-platform caches and
third-party profile responses were not tested. These limits are not claims of
successful testing or known application defects.

The existing 1,697,435-byte portrait and full performance optimization remain
Phase 9 observations. Real projects remain Phase 6/post-launch work. No analytics,
deployment, new feature or design polish was introduced. No known P0/P1/P2
defect remains in the tested scope.

Recommended Git grouping: one atomic commit containing both fixes and this report:

```text
fix(a11y): harden portfolio reflow and mobile menu focus
```

No commit, push, merge, branch write or PR operation was performed. Final
`git status --short`:

```text
 M src/app/globals.css
 M src/components/layout/mobile-nav.tsx
?? docs/phase-8-qa.md
```

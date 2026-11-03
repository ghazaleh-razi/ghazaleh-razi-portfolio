# SEO-1.3 — Angular development services

Date: November 3, 2026. Local implementation only; part of the upcoming unified
SEO release. No Git write operations or deployment are authorized in this phase.

## Pre-implementation audit

- Clean working tree on `seo/phase-1-2-homepage`, HEAD `cc53c23`. No applicable
  AGENTS.md found. Preserve this branch and the existing SEO-1.2 commit.
- Next.js App Router, React Server Components, local fonts, Tailwind design
  tokens, static export and trailing-slash URLs. No services route existed.
- Homepage order: Hero, Selected Work, Experience, About, Contact, Footer.
  Metadata and Person/WebSite/ProfilePage graph belong to `src/app/page.tsx`;
  layout only supplies metadataBase and shared identity. No title template.
- SEO-1.2 title, description, H1, Hero copy and contact CTA are already present.
  The existing exported-artifact verifier passes before changes.
- Reusable UI: Header/MobileNav/ThemeControl, Footer, SectionHeading, Arrow,
  Experience; existing container, typography, buttons, section spacing, borders,
  responsive breakpoints, focus and reduced-motion behavior.
- Header links currently use local fragments, so the services route needs an
  explicit server-rendered option for homepage anchors. Footer #top remains
  valid because the shared layout puts that ID on every page's body.
- Homepage contact uses verified email/social configuration. Use /#contact from
  the nested Hero and the same mailto address in the closing CTA.
- Sitemap has only the homepage; robots allows crawling. Add only the new real
  route, preserving static generation and avoiding fabricated dates.
- Available checks: lint, typecheck, production build, static SEO verifier. The
  Pages workflow runs these checks. No separate unit-test script is defined.

## Evidence for content

Read `src/content/experience.ts`, homepage content, project status data and the
two-page checked-in resume PDF. PDF text was extracted using an already cached
unpdf package outside the repository; no dependencies were installed.

| Capability | Evidence and wording limit |
| --- | --- |
| Angular / TypeScript | Resume summary and both professional roles; existing homepage positioning |
| RxJS | Resume summary, frontend skills and RxJS Operators; describe asynchronous flows without seniority claims |
| Nx | Resume summary, tooling and reusable frontend modules/shared UI work; no independent consultancy or scale claims |
| Forms / workflows / validation | Resume validation strategies, state-aware interfaces, role-based actions and complex data binding; no unsupported multi-step form examples |
| Reusable UI / maintenance | Both roles describe shared components, resolving edge cases and maintainability |
| REST APIs | Both roles and resume integration skills |
| Angular Signals | Not evidenced in the inspected resume/source; omitted. SignalR is a different technology and is not treated as proof |

No years of experience, pricing, guarantees, client results, testimonials,
certifications, private system details or completed portfolio projects are
added. Relevant experience reuses existing verified role content and dates.
The five-step collaboration approach describes how I would work, without
claiming prior freelance engagements or a guaranteed formal process.

## Implementation

| File | Purpose |
| --- | --- |
| `src/app/services/angular-development/page.tsx` | New Server Component route; unique native Metadata API output, minimal WebPage JSON-LD, six requested content sections, existing components and working contact actions |
| `src/content/services.ts` | Page identity, introduction, five service descriptions, four practical technology explanations and five collaboration steps |
| `src/components/layout/header.tsx` | Optional `homeLinks` flag emits root-relative homepage links and a home wordmark on nested routes; default homepage output is preserved |
| `src/components/sections/experience.tsx` | Optional heading lets the new page reuse the original verified roles/dates verbatim as Relevant experience; default heading remains Experience |
| `src/components/sections/about.tsx` | One contextual homepage link: Explore Angular development services; existing paragraphs retained |
| `src/app/globals.css` | Only new services-prefixed rules, using existing design tokens, spacing, typefaces, buttons, borders and the 40rem breakpoint |
| `src/app/sitemap.ts` | Add exactly one trailing-slash services URL, retaining the homepage and static export |
| `scripts/verify-static-seo.mjs` | Retain homepage/404 checks; validate the new route's metadata, schema, headings, contact/navigation, assets and two-URL sitemap |
| `README.md` | Correct the previously one-URL sitemap description and document the new route/schema/content location |
| `docs/seo-1-3-angular-development.md` | Audit, content evidence, implementation, validation and release limits |

No dependency, package script, build configuration, social image, deployment
workflow, resume, experience data or planned-project content is changed. No new
client component is introduced. The page uses built-in Next.js Link for the
cross-route Hero CTAs, with prefetch disabled; the existing shared navigation
and theme controls retain their interactions.

## Final page content and SEO

- Route/canonical: `https://ghazaleh-razi.com/services/angular-development/`
- Title: `Freelance Angular Developer | Ghazaleh Razi`
- Description: `Work with an Angular and TypeScript frontend developer on business web applications, complex interfaces, reusable components, and API integrations.`
- One H1: `Freelance Angular Developer for Business Web Applications`
- Hero: introduces Ghazaleh in first person and describes business interfaces,
  reusable components, API integration, forms and workflow-driven features.
- Services: Angular feature development; complex forms & business workflows;
  reusable UI components; API integration; frontend maintenance & improvements.
- Technical expertise: Angular & TypeScript; RxJS & application state;
  Nx & shared frontend code; REST APIs. Each has a practical explanation.
- Approach: understand the application, clarify scope, build for maintainability,
  check behavior/interaction states, review and hand off.
- Relevant experience: reuse both existing verified roles without new facts.
- Closing invitation: Have an Angular Project in Mind? The copy invites a
  conversation about requirements and contribution without availability promises.
- Primary Hero CTA: Discuss Your Project → `/#contact`.
- Secondary Hero CTA: View My Experience → `/#experience`.
- Closing CTA: Get in Touch → the existing verified mailto address.
- Home route: header wordmark → `/`; all four desktop/mobile section links use
  `/#...` on the services page. Local skip/footer anchors still target this page.

Metadata is page-scoped and indexable, with exactly one effective title,
description and canonical. OG/Twitter use the same unique copy and existing
1200×630 PNG, alt text and HTTPS origin. No title template or metadata dependency
is added. No image asset needs regeneration.

One minimal WebPage object describes the services page and references the
homepage's existing `/#person` and `/#website` IDs. It adds no Person/ProfilePage
definitions, agency, ratings, reviews, pricing, offers or rich-result claims.
The homepage's JSON-LD output remains identical to the SEO-1.2 baseline.

The generated sitemap contains only the homepage and the implemented services
route, exactly once each. No dates, slash variants or future routes are added.
Robots remains unchanged and allows crawling. This is build output prepared
for the unified release, not evidence that the services page is live or indexed.

## Validation results

| Check | Result | Evidence |
| --- | --- | --- |
| `npm.cmd run lint` | PASS | ESLint, zero warnings after using Next.js Link for cross-route Hero CTAs |
| `npm.cmd run typecheck` | PASS | Route type generation and TypeScript |
| `npm.cmd run build` | PASS | Next.js 16.3.8; `/services/angular-development` included among statically generated routes |
| `node scripts/verify-static-seo.mjs` | PASS | Fresh homepage, nested services HTML, metadata, JSON-LD, assets, crawling files and separate 404 |
| `git diff --check` | PASS | No whitespace errors |
| Responsive Chrome | PASS | 320, 390, 639, 640, 767, 768, 895, 896, 1024, 1440 CSS pixels in both themes; no horizontal/text overflow |
| Homepage regression comparison | PASS | 320 and 1440 pixels in both themes against the saved pre-change SEO-1.2 export |
| Nested navigation | PASS | Homepage discovery link; Hero contact and experience transitions; home wordmark; mobile cross-page contact; sticky-header target clearance |
| Keyboard/focus | PASS | Skip link, keyboard Hero CTA, visible focus, mobile Escape and focus restoration |
| Themes / motion | PASS | Settled light/dark colors, System changes, reload persistence, reduced-motion and normal scrolling behavior |
| Sampled text contrast | PASS | Main headings, paragraphs, strong labels and links/buttons: minimum 4.90:1 light, 7.50:1 dark |
| Local layout stability | PASS | No pre-interaction layout-shift entries observed in the 20 service viewport/theme loads; not field CWV or a formal performance audit |
| Assets / resume | PASS | All referenced assets exported; resume PDF returns HTTP 200 and PDF content from the local server |
| No-JavaScript rendering | PASS | Service content, root contact CTA and mobile root experience link work with JavaScript disabled |
| Browser runtime | PASS | No console, hydration, request or HTTP errors in the completed suite |
| Production / Search Console / external Rich Results | NOT TESTED | No deployment or external account changes performed |
| Firefox / Safari / real mobile / screen reader / full accessibility audit | NOT TESTED | Focused local Chrome coverage only |
| Lighthouse / field Core Web Vitals / rankings | NOT TESTED | No production performance or search outcome claims |

Browser: Chrome 156.0.8078.80 using an already cached Puppeteer package and
temporary loopback static servers for the current export and saved baseline.
No package was installed. Full-page 320px/1440px services screenshots in both
themes were captured; mobile and desktop examples were visually reviewed.
The servers and browser were closed after the completed suite.

The QA harness was corrected to wait for settled theme rendering before color
sampling and to accept visible focus outlines at least 2px wide (Chrome exposed
3px). The final complete run passed; neither required an application change.
These are scoped checks, not a claim of full WCAG conformance or cross-browser
acceptance. The mailto destination was inspected; no mail client or email send
was invoked.

Temporary evidence:
`C:\Users\ARAMIS3\AppData\Local\Temp\portfolio-seo-1-3-20261103`
contains `browser-qa.cjs`, `browser-results.json`, services screenshots,
homepage screenshots and the pre-change `baseline-export/`. These are local
diagnostics rather than tracked dependencies or published artifacts.

## Regression and Git review

The browser comparison confirmed equal homepage title, description, canonical,
JSON-LD, section order, Hero/Work/Experience/Contact/header/footer markup,
original About paragraphs and sampled typography/colors. The intentional About
link is the only new homepage content. In particular, the SEO-1.2 H1 and
Discuss a Project CTA remain unchanged.

Read-only Git diff also confirms unchanged homepage page/layout/Hero/site
configuration, experience/project data, public assets including the resume,
Next.js configuration, package/lockfile and Pages workflow. New CSS selectors
are scoped to the services page. Planned projects remain explicitly planned.

Work remains on `seo/phase-1-2-homepage`, based on `cc53c23`. All ten changed/new
files are unstaged and uncommitted. No Git write operation, branch switch,
pull request, push, merge or deployment was performed. The owner controls the
unified release after the later SEO phases.

## Final status and next phase

**COMPLETED WITH LIMITATIONS** — local implementation and available checks
complete. Live delivery, indexing, external schema validation and other-browser
acceptance remain unverified. No claim that this page is already published,
indexed or producing search traffic is made.

Next: SEO-1.4 — Internal Linking & Sitemap Audit. Not implemented in this phase.

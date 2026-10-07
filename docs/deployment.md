# GitHub Pages deployment

## Architecture

`.github/workflows/deploy-pages.yml` is the production deployment pipeline. A
push to `main`, or an explicit manual dispatch, runs one build job followed by
one deploy job:

1. Check out the repository and install Node from `.nvmrc`.
2. Restore npm's download cache and install the lockfile with `npm ci`.
3. Run lint, type-checking, one production build, and the static SEO/artifact
   verifier.
4. Upload only the generated `out/` directory as the GitHub Pages artifact.
5. Deploy the successful artifact to the protected `github-pages` environment.

The workflow uses only GitHub-maintained actions. Its job-level permissions are
limited to repository/Pages reads while building and Pages write plus OIDC token
write while deploying. No personal access token or repository secret is required.

The `pages` concurrency group serializes production deployments. GitHub may
discard obsolete queued runs, but `cancel-in-progress: false` lets an active
deployment finish instead of interrupting publication.

## Repository setting required after merge

An administrator must open **Settings > Pages > Build and deployment** and set
**Source** to **GitHub Actions**. Then push or merge the workflow to `main`, or
run it manually from **Actions > Deploy portfolio to GitHub Pages**. A checked-in
workflow is not evidence of a successful deployment; confirm both jobs and the
`github-pages` environment deployment in the actual workflow run.

## Path and domain policy

The site is built for the root origin `https://ghazaleh-razi.com`. Do not add a
repository-name `basePath` or `assetPrefix`: either would become a permanent path
contract and would break root-relative production URLs after the custom domain
is attached. Before Phase 11, the project-site URL under
`https://ghazaleh-razi.github.io/ghazaleh-razi-portfolio/` may therefore fail to
load root-relative CSS, JavaScript, images, fonts, or links. That temporary URL
is not the production SEO target and should not be promoted or indexed.

`public/.nojekyll` is source-controlled and copied into `out/`; it prevents
GitHub Pages' Jekyll processing from excluding Next.js's `_next` assets.

There is intentionally no `CNAME` file. GitHub documents that custom Actions
workflows do not require it and ignore an existing one. In Phase 11, configure
`ghazaleh-razi.com` in **Settings > Pages > Custom domain**, then configure DNS,
wait for DNS validation, enable HTTPS, and verify canonical-domain redirects.

## Local validation

Use Node 24 and the locked dependencies:

```sh
npm ci
npm run lint
npm run typecheck
npm run build
node scripts/verify-static-seo.mjs
```

The verifier checks the exported homepage and 404, metadata and JSON-LD,
`robots.txt`, `sitemap.xml`, local styles/scripts/fonts/icons/images, responsive
portrait files, résumé PDF, `.nojekyll`, and the intentional absence of a
Phase 10 `CNAME`.

## First deployment verification

After the first successful GitHub-hosted run and, for full asset-path testing,
after the Phase 11 custom-domain cutover:

- Confirm the workflow's build and deploy jobs and `github-pages` environment
  deployment succeeded.
- Open the reported Pages URL and confirm the homepage returns successfully.
- In browser developer tools, confirm CSS, JavaScript, portrait variants, local
  fonts, icons, and the résumé load without 404s or console errors.
- Open `/robots.txt` and `/sitemap.xml` and confirm their production-domain URLs.
- Visit a nonexistent path and confirm the branded 404 renders.
- Test mobile navigation and Light, Dark, and System theme modes.
- Confirm there is no unexpected repository-subpath or `basePath` failure.

Phase 11 owns DNS records, the GitHub Pages custom-domain field, HTTPS
enforcement, live canonical/redirect checks, and Search Console work.

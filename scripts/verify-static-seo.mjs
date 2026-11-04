// Verify the actual deployment artifact after `npm run build`, without a server.
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const origin = "https://ghazaleh-razi.com";
const title =
  "Ghazaleh Razi | Angular Frontend Engineer & TypeScript Developer";
const description =
  "Angular & TypeScript Frontend Engineer building enterprise web applications, complex business workflows, and reusable UI components. Open to collaboration.";
const imageUrl = `${origin}/images/og/ghazaleh-razi.png`;
const servicesPath = "/services/angular-development/";
const servicesUrl = `${origin}${servicesPath}`;
const servicesTitle = "Freelance Angular Developer | Ghazaleh Razi";
const servicesDescription =
  "Work with an Angular and TypeScript frontend developer on business web applications, complex interfaces, reusable components, and API integrations.";
const decode = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key,
      decode(value),
    ]),
  );
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(([tag]) =>
    attributes(tag),
  );
const meta = (html, name) =>
  tags(html, "meta")
    .filter((tag) => (tag.name ?? tag.property) === name)
    .map((tag) => tag.content);
const singleMeta = (html, name, expected) =>
  assert.deepEqual(meta(html, name), [expected], name);

const html = await readFile("out/index.html", "utf8");
const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
assert.deepEqual(
  [...html.matchAll(/<title>([^<]*)<\/title>/g)].map(([, value]) =>
    decode(value),
  ),
  [title],
);
singleMeta(html, "description", description);
singleMeta(html, "robots", "index, follow, max-image-preview:large");
assert.deepEqual(
  tags(html, "link")
    .filter((tag) => tag.rel === "canonical")
    .map((tag) => tag.href),
  [`${origin}/`],
);
for (const prefix of ["og", "twitter"]) {
  singleMeta(html, `${prefix}:title`, title);
  singleMeta(html, `${prefix}:description`, description);
  singleMeta(html, `${prefix}:image`, imageUrl);
  singleMeta(
    html,
    `${prefix}:image:alt`,
    "Ghazaleh Razi — Frontend Engineer — Angular & TypeScript",
  );
  singleMeta(html, `${prefix}:image:width`, "1200");
  singleMeta(html, `${prefix}:image:height`, "630");
}
singleMeta(html, "og:url", `${origin}/`);
singleMeta(html, "og:type", "website");
singleMeta(html, "og:site_name", "Ghazaleh Razi");
singleMeta(html, "twitter:card", "summary_large_image");
assert.equal(meta(html, "keywords").length, 0);
assert.doesNotMatch(
  visible,
  /localhost|127\.0\.0\.1|github\.io|noindex|nofollow/,
);
assert.equal((visible.match(/<h1\b/g) ?? []).length, 1);
assert.match(visible, /<h1[^>]*>Angular Frontend Engineer<\/h1>/);
const hero = visible.match(
  /<section\b[^>]*aria-labelledby="hero-heading"[^>]*>([\s\S]*?)<\/section>/,
)?.[1];
assert.ok(hero, "Server-rendered Hero");
assert.match(hero, /TypeScript · Enterprise Web Applications/);
assert.ok(
  hero.includes(
    "I build maintainable Angular and TypeScript interfaces for complex business applications, focusing on reusable components, reliable API integrations, and intuitive user experiences.",
  ),
  "Crawlable Hero description",
);
const primaryCtas = [...hero.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].filter(
  ([, attrs]) => attributes(attrs).class === "button-primary",
);
assert.equal(primaryCtas.length, 1, "One primary Hero CTA");
assert.equal(attributes(primaryCtas[0][1]).href, "#contact");
assert.match(primaryCtas[0][2], /^Discuss a Project\s*<svg/);
for (const text of [
  "Ghazaleh Razi",
  "Angular",
  "TypeScript",
  "Selected work",
  "Engineering case studies",
  "Experience",
  "About",
  "ghazale.razi@gmail.com",
]) {
  assert.ok(visible.includes(text), `Crawlable text: ${text}`);
}
for (const landmark of ["header", "nav", "main", "footer"])
  assert.ok(tags(visible, landmark).length > 0);
for (const link of tags(visible, "a")) {
  if (link.href?.startsWith("#"))
    assert.ok(
      visible.includes(`id="${link.href.slice(1)}"`),
      `Anchor target: ${link.href}`,
    );
  assert.ok(!link.href?.startsWith("/work/"), "No fictional case-study links");
}
for (const href of [
  "mailto:ghazale.razi@gmail.com",
  "https://www.linkedin.com/in/ghazaleh-razi",
  "https://github.com/ghazaleh-razi",
]) {
  assert.ok(
    tags(visible, "a").some((link) => link.href === href),
    `Verified identity link: ${href}`,
  );
}
const portrait = tags(visible, "img").find(
  (tag) => tag.alt === "Portrait of Ghazaleh Razi",
);
assert.ok(portrait);
assert.equal(portrait.src, "/images/ghazaleh-razi-portrait-768.webp");
assert.equal(
  portrait.srcSet,
  "/images/ghazaleh-razi-portrait-768.webp 768w, /images/ghazaleh-razi-portrait-1145.webp 1145w",
);
assert.equal(
  portrait.sizes,
  "(min-width: 64rem) 34rem, (min-width: 56rem) 40vw, 15rem",
);
assert.equal(portrait.width, "1145");
assert.equal(portrait.height, "1374");
assert.notEqual(portrait.loading, "lazy");
assert.ok(
  !tags(visible, "img").some((tag) => tag.src?.includes("/images/og/")),
  "Social image is metadata only",
);

const jsonScripts = [
  ...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
];
assert.equal(jsonScripts.length, 1);
assert.doesNotMatch(jsonScripts[0][1], /</);
const data = JSON.parse(jsonScripts[0][1]);
assert.equal(data["@context"], "https://schema.org");
assert.deepEqual(
  data["@graph"].map((node) => node["@type"]),
  ["Person", "WebSite", "ProfilePage"],
);
const [person, website, profile] = data["@graph"];
assert.equal(person.name, "Ghazaleh Razi");
assert.equal(person.url, `${origin}/`);
assert.equal(person.jobTitle, "Frontend Engineer");
assert.equal(person.description, description);
assert.equal(person.image, `${origin}/images/ghazaleh-razi-portrait.png`);
assert.deepEqual(person.sameAs, [
  "https://www.linkedin.com/in/ghazaleh-razi",
  "https://github.com/ghazaleh-razi",
]);
assert.equal(website.publisher["@id"], person["@id"]);
assert.equal(profile.mainEntity["@id"], person["@id"]);
assert.equal(profile.isPartOf["@id"], website["@id"]);
assert.equal(profile.name, title);
assert.equal(profile.description, description);
assert.doesNotMatch(
  JSON.stringify(data),
  /"(?:telephone|address|award|review|aggregateRating|worksFor|alumniOf|dateModified|dateCreated)"/,
);

const robots = await readFile("out/robots.txt", "utf8");
assert.equal(
  robots.trim(),
  `User-Agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml`,
);
const sitemap = await readFile("out/sitemap.xml", "utf8");
assert.match(
  sitemap,
  /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/,
);
assert.deepEqual(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url),
  [`${origin}/`, servicesUrl],
);
assert.doesNotMatch(sitemap, /lastmod|changefreq|priority/);

const servicesHtml = await readFile(`out${servicesPath}index.html`, "utf8");
const servicesVisible = servicesHtml.replace(
  /<script\b[^>]*>[\s\S]*?<\/script>/g,
  "",
);
assert.deepEqual(
  [...servicesHtml.matchAll(/<title>([^<]*)<\/title>/g)].map(([, value]) =>
    decode(value),
  ),
  [servicesTitle],
  "Unique services title",
);
singleMeta(servicesHtml, "description", servicesDescription);
singleMeta(servicesHtml, "robots", "index, follow, max-image-preview:large");
assert.deepEqual(
  tags(servicesHtml, "link")
    .filter((tag) => tag.rel === "canonical")
    .map((tag) => tag.href),
  [servicesUrl],
);
for (const prefix of ["og", "twitter"]) {
  singleMeta(servicesHtml, `${prefix}:title`, servicesTitle);
  singleMeta(servicesHtml, `${prefix}:description`, servicesDescription);
  singleMeta(servicesHtml, `${prefix}:image`, imageUrl);
  singleMeta(
    servicesHtml,
    `${prefix}:image:alt`,
    "Ghazaleh Razi — Frontend Engineer — Angular & TypeScript",
  );
  singleMeta(servicesHtml, `${prefix}:image:width`, "1200");
  singleMeta(servicesHtml, `${prefix}:image:height`, "630");
}
singleMeta(servicesHtml, "og:url", servicesUrl);
singleMeta(servicesHtml, "og:type", "website");
singleMeta(servicesHtml, "og:site_name", "Ghazaleh Razi");
singleMeta(servicesHtml, "twitter:card", "summary_large_image");
assert.doesNotMatch(
  servicesVisible,
  /localhost|127\.0\.0\.1|github\.io|noindex|nofollow/,
);
const servicesHeading =
  "Freelance Angular Developer for Business Web Applications";
assert.deepEqual(
  [...servicesVisible.matchAll(/<h1\b[^>]*>([^<]*)<\/h1>/g)].map(([, value]) =>
    decode(value),
  ),
  [servicesHeading],
);
assert.deepEqual(
  [...servicesVisible.matchAll(/<h2\b[^>]*>([^<]*)<\/h2>/g)].map(([, value]) =>
    decode(value),
  ),
  [
    "What I can help with",
    "Technical expertise",
    "How I approach development",
    "Relevant experience",
    "Have an Angular Project in Mind?",
  ],
);
let headingLevel = 0;
for (const [, level] of servicesVisible.matchAll(/<h([1-6])\b/g)) {
  assert.ok(Number(level) <= headingLevel + 1, "No skipped heading levels");
  headingLevel = Number(level);
}
const servicesLinks = tags(servicesVisible, "a");
for (const [page, expectedHref] of [
  [visible, "#top"],
  [servicesVisible, "/"],
]) {
  const wordmark = tags(page, "a").find((link) => link.class === "wordmark");
  assert.ok(
    wordmark?.["aria-label"]?.startsWith("GR"),
    "Logo accessible name includes its visible GR label",
  );
  assert.equal(wordmark.href, expectedHref, "Logo destination");
}
assert.equal(
  tags(visible, "a").filter((link) => link.href === servicesPath).length,
  1,
  "One contextual homepage services link",
);
for (const href of [
  "/",
  "/#work",
  "/#experience",
  "/#about",
  "/#contact",
  "mailto:ghazale.razi@gmail.com",
  "/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf",
]) {
  assert.ok(
    servicesLinks.some((link) => link.href === href),
    `Services navigation/contact: ${href}`,
  );
}
assert.match(servicesVisible, /href="\/#contact">Discuss Your Project\s*<svg/);
assert.match(
  servicesVisible,
  /href="mailto:ghazale\.razi@gmail\.com">Get in Touch\s*<svg/,
);
for (const link of servicesLinks) {
  if (link.href?.startsWith("#")) {
    assert.ok(
      servicesVisible.includes(`id="${link.href.slice(1)}"`),
      `Services anchor target: ${link.href}`,
    );
  } else if (link.href?.startsWith("/#")) {
    assert.ok(
      visible.includes(`id="${link.href.slice(2)}"`),
      `Homepage anchor target: ${link.href}`,
    );
  }
}
const servicesJsonScripts = [
  ...servicesHtml.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
];
assert.equal(servicesJsonScripts.length, 1);
assert.doesNotMatch(servicesJsonScripts[0][1], /</);
assert.deepEqual(JSON.parse(servicesJsonScripts[0][1]), {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${servicesUrl}#webpage`,
  url: servicesUrl,
  name: servicesHeading,
  description: servicesDescription,
  inLanguage: "en",
  isPartOf: { "@id": website["@id"] },
  author: { "@id": person["@id"] },
});
for (const asset of [
  ...tags(servicesHtml, "link").map((tag) => tag.href),
  ...tags(servicesHtml, "script").map((tag) => tag.src),
  ...servicesLinks.map((tag) => tag.href),
].filter((url) => url?.startsWith("/"))) {
  const pathname = new URL(asset, origin).pathname;
  await access(`out${pathname}${pathname.endsWith("/") ? "index.html" : ""}`);
}

const notFound = await readFile("out/404.html", "utf8");
singleMeta(notFound, "robots", "noindex");
assert.match(notFound, /<title>Page not found \| Ghazaleh Razi<\/title>/);
assert.equal(
  tags(notFound, "link").filter((tag) => tag.rel === "canonical").length,
  0,
);
assert.equal(meta(notFound, "og:url").length, 0);
assert.doesNotMatch(notFound, /application\/ld\+json/);
assert.ok(tags(notFound, "a").some((tag) => tag.href === "/"));

for (const rel of ["icon", "apple-touch-icon"])
  assert.ok(tags(html, "link").some((tag) => tag.rel === rel));
// Every local stylesheet, script, image, font preload and icon must be exported.
const assets = [
  ...tags(html, "link").map((tag) => tag.href),
  ...tags(html, "script").map((tag) => tag.src),
  ...tags(html, "img").map((tag) => tag.src),
];
for (const url of assets.filter((value) => value?.startsWith("/"))) {
  await access(`out${new URL(url, origin).pathname}`);
}
for (const candidate of portrait.srcSet
  .split(", ")
  .map((entry) => entry.split(" ")[0])) {
  await access(`out${candidate}`);
}
const png = await readFile("out/images/og/ghazaleh-razi.png");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
assert.ok(png.length < 200_000, "Social PNG stays below 200 kB");
const resume = await readFile(
  "out/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf",
);
assert.equal(resume.subarray(0, 5).toString(), "%PDF-");
await access("out/.nojekyll");
await assert.rejects(access("out/CNAME"), { code: "ENOENT" });

console.log(
  "PASS: exported title, description, canonical, robots, OG/Twitter, JSON-LD graph, crawlable content, anchors, identity links, portrait, sitemap, 404, icons, local assets, résumé, .nojekyll and deferred CNAME.",
);
console.log(
  `Social preview: 1200×630 PNG, ${png.length.toLocaleString("en-US")} bytes.`,
);
console.log(
  "PASS: services route export, unique metadata/canonical/H1, OG/Twitter, minimal WebPage schema, heading hierarchy, homepage discovery link, nested navigation/contact anchors, assets and two-URL sitemap.",
);

// Verify the actual deployment artifact after `npm run build`, without a server.
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const origin = "https://ghazaleh-razi.com";
const title = "Ghazaleh Razi — Frontend Engineer | Angular & TypeScript";
const description =
  "Frontend Engineer specializing in Angular and TypeScript, building scalable, maintainable web applications with a focus on frontend architecture and user experience.";
const imageUrl = `${origin}/images/og/ghazaleh-razi.png`;
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
assert.match(visible, /<h1[^>]*>Frontend Engineer<\/h1>/);
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
assert.equal(person.image, `${origin}/images/ghazaleh-razi-portrait.png`);
assert.deepEqual(person.sameAs, [
  "https://www.linkedin.com/in/ghazaleh-razi",
  "https://github.com/ghazaleh-razi",
]);
assert.equal(website.publisher["@id"], person["@id"]);
assert.equal(profile.mainEntity["@id"], person["@id"]);
assert.equal(profile.isPartOf["@id"], website["@id"]);
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
  [`${origin}/`],
);
assert.doesNotMatch(sitemap, /lastmod|changefreq|priority/);

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

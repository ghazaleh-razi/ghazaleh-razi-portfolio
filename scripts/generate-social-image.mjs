// Optional asset maintenance, not part of the website runtime or build.
// Uses Next.js's bundled renderer/font: no system fonts or added dependency.
import { ImageResponse } from "next/og.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { createElement } from "react";

const root = new URL("../", import.meta.url);
const localPath = (path) => fileURLToPath(new URL(path, root));

const require = createRequire(import.meta.url);
// The site's WOFF2 fonts aren't supported by ImageResponse. Its bundled Geist
// TTF keeps this static graphic's typography portable and free of font fallback.
const font = await readFile(
  require.resolve("next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
);
const box = (style, ...children) =>
  createElement(
    "div",
    { style: { display: "flex", position: "absolute", ...style } },
    ...children,
  );
const text = (value, left, top, fontSize, color = "#f2f5f3", extra = {}) =>
  box({ left, top, fontSize, color, ...extra }, value);

async function render(element, width, height, path) {
  const response = new ImageResponse(element, {
    width,
    height,
    fonts: [{ name: "Geist", data: font, weight: 400, style: "normal" }],
  });
  await writeFile(localPath(path), Buffer.from(await response.arrayBuffer()));
}

await mkdir(localPath("public/images/og/"), { recursive: true });
await render(
  box(
    {
      width: "100%",
      height: "100%",
      background: "#0b1012",
      fontFamily: "Geist",
    },
    box({
      left: 40,
      top: 40,
      width: 1120,
      height: 550,
      borderRadius: 24,
      background: "#111719",
      border: "1px solid #263033",
    }),
    box({ left: 88, top: 158, width: 1024, height: 1, background: "#263033" }),
    box({
      left: 842,
      top: 220,
      width: 270,
      height: 270,
      borderRight: "1px solid #263033",
      borderBottom: "1px solid #263033",
    }),
    box({ left: 88, top: 500, width: 64, height: 4, background: "#48d7ac" }),
    text("GR", 88, 80, 34, "#f2f5f3", { letterSpacing: -2 }),
    box({
      left: 137,
      top: 110,
      width: 8,
      height: 8,
      borderRadius: 4,
      background: "#48d7ac",
    }),
    text("ghazaleh-razi.com", 920, 88, 21, "#a4aeaa"),
    text("Ghazaleh Razi", 88, 210, 84, "#f2f5f3", { letterSpacing: -4 }),
    text("Frontend Engineer", 88, 330, 44, "#f2f5f3", { letterSpacing: -1 }),
    text("Angular & TypeScript", 88, 416, 28, "#48d7ac"),
  ),
  1200,
  630,
  "public/images/og/ghazaleh-razi.png",
);

// Native Apple touch icon convention; the SVG favicon remains the primary icon.
await render(
  box(
    {
      width: "100%",
      height: "100%",
      background: "#111315",
      fontFamily: "Geist",
    },
    text("GR", 24, 36, 84, "#f2f5f3", { letterSpacing: -6 }),
    box({
      left: 144,
      top: 107,
      width: 14,
      height: 14,
      borderRadius: 7,
      background: "#48d7ac",
    }),
  ),
  180,
  180,
  "src/app/apple-icon.png",
);

console.log("Generated 1200×630 social image and 180×180 Apple touch icon.");

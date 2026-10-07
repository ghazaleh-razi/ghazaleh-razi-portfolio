import type { MetadataRoute } from "next";
import { site } from "../content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Add only real, published HTML pages. No build-time modification dates.
  return [{ url: `${site.origin}/` }];
}

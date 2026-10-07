import type { Metadata } from "next";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";
import { About } from "../components/sections/about";
import { Contact } from "../components/sections/contact";
import { Experience } from "../components/sections/experience";
import { Hero } from "../components/sections/hero";
import { Work } from "../components/sections/work";
import { contact, site } from "../content/site";

const homepageUrl = `${site.origin}/`;
const socialImage = {
  url: site.socialImage,
  width: 1200,
  height: 630,
  alt: site.socialImageAlt,
  type: "image/png",
};

// Page identity belongs here so error pages and future routes cannot inherit it.
export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: homepageUrl },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    url: homepageUrl,
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
};

// This homepage profiles one person; the three nodes describe the person,
// their website, and the profile page without inventing credentials or dates.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${homepageUrl}#person`,
      name: site.name,
      url: homepageUrl,
      jobTitle: "Frontend Engineer",
      description: site.description,
      image: `${site.origin}${site.portrait}`,
      sameAs: [contact.linkedin, contact.github],
    },
    {
      "@type": "WebSite",
      "@id": `${homepageUrl}#website`,
      url: homepageUrl,
      name: site.name,
      inLanguage: "en",
      publisher: { "@id": `${homepageUrl}#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${homepageUrl}#profile`,
      url: homepageUrl,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      isPartOf: { "@id": `${homepageUrl}#website` },
      mainEntity: { "@id": `${homepageUrl}#person` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="page-container">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

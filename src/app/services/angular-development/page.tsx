import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../../components/layout/footer";
import { Header } from "../../../components/layout/header";
import { Experience } from "../../../components/sections/experience";
import { Arrow } from "../../../components/ui/arrow";
import { SectionHeading } from "../../../components/ui/section-heading";
import { angularDevelopment } from "../../../content/services";
import { contact, site } from "../../../content/site";

const pageUrl = `${site.origin}${angularDevelopment.path}`;
const socialImage = {
  url: site.socialImage,
  width: 1200,
  height: 630,
  alt: site.socialImageAlt,
  type: "image/png",
};

export const metadata: Metadata = {
  title: angularDevelopment.title,
  description: angularDevelopment.description,
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: site.name,
    locale: "en_US",
    title: angularDevelopment.title,
    description: angularDevelopment.description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: angularDevelopment.title,
    description: angularDevelopment.description,
    images: [socialImage],
  },
};

// Reference the homepage identities without redefining its Person/ProfilePage graph.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: angularDevelopment.heading,
  description: angularDevelopment.description,
  inLanguage: "en",
  isPartOf: { "@id": `${site.origin}/#website` },
  author: { "@id": `${site.origin}/#person` },
};

export default function AngularDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header homeLinks />
      <main id="main-content" tabIndex={-1} className="page-container">
        <section className="services-hero" aria-labelledby="services-heading">
          <p className="work-status">{site.name} · Angular development services</p>
          <h1 id="services-heading">{angularDevelopment.heading}</h1>
          <p className="hero-description">{angularDevelopment.introduction}</p>
          <div className="hero-actions">
            <Link className="button-primary" href="/#contact" prefetch={false}>
              Discuss Your Project <Arrow />
            </Link>
            <Link className="text-link" href="/#experience" prefetch={false}>
              View My Experience <Arrow />
            </Link>
          </div>
        </section>

        <section className="homepage-section" aria-labelledby="services-help-heading">
          <SectionHeading id="services-help-heading">What I can help with</SectionHeading>
          <ul className="services-list">
            {angularDevelopment.services.map((service) => (
              <li key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="homepage-section" aria-labelledby="services-expertise-heading">
          <SectionHeading id="services-expertise-heading">Technical expertise</SectionHeading>
          <div className="about-copy">
            {angularDevelopment.expertise.map((technology) => (
              <p key={technology.title}>
                <strong className="services-inline-heading">{technology.title}.</strong>{" "}
                {technology.description}
              </p>
            ))}
          </div>
        </section>

        <section className="homepage-section" aria-labelledby="services-approach-heading">
          <SectionHeading id="services-approach-heading">How I approach development</SectionHeading>
          <ol className="services-steps">
            {angularDevelopment.approach.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <Experience heading="Relevant experience" />

        <section className="contact-section" aria-labelledby="services-contact-heading">
          <div className="contact-top">
            <div>
              <h2 id="services-contact-heading">Have an Angular Project in Mind?</h2>
              <p>
                If you&apos;re building or improving an Angular application, I&apos;d
                be happy to learn about the project, its requirements, and how I
                could contribute.
              </p>
            </div>
            <a className="button-primary" href={`mailto:${contact.email}`}>
              Get in Touch <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

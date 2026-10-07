import { resumeHref } from "../../content/site";
import { Arrow } from "../ui/arrow";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        <p className="availability">
          <span aria-hidden="true" />
          Available for opportunities
        </p>
        <p className="hero-name">Ghazaleh Razi</p>
        <h1 id="hero-heading">Frontend Engineer</h1>
        <p className="hero-specialization">Angular &amp; TypeScript</p>
        <p className="hero-description">
          I build scalable frontend systems for complex web applications, with a
          focus on architecture, maintainability, and thoughtful user
          experiences.
        </p>
        <div className="hero-actions">
          <a className="button-primary" href="#work">
            View selected work <Arrow />
          </a>
          <a
            className="text-link"
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
          >
            View résumé <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="hero-portrait">
        {/* Static export needs authored responsive derivatives; no image server is available. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ghazaleh-razi-portrait-768.webp"
          srcSet="/images/ghazaleh-razi-portrait-768.webp 768w, /images/ghazaleh-razi-portrait-1145.webp 1145w"
          sizes="(min-width: 64rem) 34rem, (min-width: 56rem) 40vw, 15rem"
          alt="Portrait of Ghazaleh Razi"
          width={1145}
          height={1374}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}

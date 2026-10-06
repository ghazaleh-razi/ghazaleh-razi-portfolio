import { resumeHref } from "../../content/site";
import { Arrow } from "../ui/arrow";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <p className="availability"><span aria-hidden="true" />Available for opportunities</p>
      <p className="hero-name">Ghazaleh Razi</p>
      <h1 id="hero-heading">Frontend Engineer</h1>
      <p className="hero-specialization">Angular &amp; TypeScript</p>
      <p className="hero-description">
        I build scalable frontend systems for complex web applications, with a focus on
        architecture, maintainability, and thoughtful user experiences.
      </p>
      <div className="hero-actions">
        <a className="button-primary" href="#work">View selected work <Arrow /></a>
        <a className="text-link" href={resumeHref}>View résumé <Arrow diagonal /></a>
      </div>
    </section>
  );
}

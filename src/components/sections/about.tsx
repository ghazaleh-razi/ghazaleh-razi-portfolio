import { SectionHeading } from "../ui/section-heading";

export function About() {
  return (
    <section id="about" tabIndex={-1} className="homepage-section" aria-labelledby="about-heading">
      <SectionHeading id="about-heading">About</SectionHeading>
      <div className="about-copy">
        <p className="about-intro">I&apos;m a Frontend Engineer who enjoys turning complex requirements into clear, reliable web experiences.</p>
        <p>My work is primarily centered around Angular and TypeScript, where I care as much about maintainable architecture and predictable application behavior as I do about the quality of the interface.</p>
        <p>I&apos;m particularly interested in frontend problems involving complex workflows, reusable systems, and products that need to evolve over time.</p>
      </div>
    </section>
  );
}

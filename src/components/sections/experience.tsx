import { experience } from "../../content/experience";
import { resumeHref } from "../../content/site";
import { Arrow } from "../ui/arrow";
import { SectionHeading } from "../ui/section-heading";

export function Experience() {
  return (
    <section id="experience" tabIndex={-1} className="homepage-section" aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading" action={
        <a className="text-link section-action" href={resumeHref}>View full résumé <Arrow /></a>
      }>Experience</SectionHeading>
      <ol className="experience-list">
        {experience.map((job) => (
          <li key={job.company}>
            <article className="experience-entry">
              <div className="experience-title">
                <h3>{job.role}</h3>
                <p className="experience-company">{job.company}</p>
              </div>
              <p className="experience-dates">
                <time dateTime={job.startDate}>{job.startLabel}</time>{" — "}
                {job.endDate ? <time dateTime={job.endDate}>{job.endLabel}</time> : job.endLabel}
              </p>
              <p className="experience-summary">{job.summary}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

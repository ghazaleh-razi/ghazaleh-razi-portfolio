import { plannedProjects, publishedProjects } from "../../content/projects";
import { Arrow } from "../ui/arrow";
import { SectionHeading } from "../ui/section-heading";

export function Work() {
  return (
    <section id="work" tabIndex={-1} className="homepage-section work-section" aria-labelledby="work-heading">
      <SectionHeading id="work-heading">Selected work</SectionHeading>
      {publishedProjects.length > 0 ? (
        <div className="project-list">
          {publishedProjects.map((project) => (
            <article key={project.slug} className={project.featured ? "project-card featured-project" : "project-card"}>
              <h3>{project.name}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p>{project.summary}</p>
              <a className="text-link" href={`/work/${project.slug}/`} aria-label={`View ${project.name} case study`}>
                View case study <Arrow />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="work-note">
          <div className="work-note-intro">
            <p className="work-status">Planned portfolio work</p>
            <h3>Engineering case studies, published when they&apos;re real.</h3>
          </div>
          <div className="work-note-details">
            <p>Three Angular and TypeScript projects are planned. Each will be published only after it has a real implementation and credible supporting material.</p>
            <ol className="planned-projects" aria-label="Planned case studies">
              {plannedProjects.map((project) => (
                <li key={project.name}>
                  <span>{project.name}</span>
                  <span>{project.direction}</span>
                </li>
              ))}
            </ol>
            <a className="text-link accent-link" href="#experience">Explore my experience <Arrow /></a>
          </div>
        </div>
      )}
    </section>
  );
}

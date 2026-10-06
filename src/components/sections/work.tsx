import { publishedProjects } from "../../content/projects";
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
          <h3>Case studies in preparation.</h3>
          <div>
            <p>The projects for this portfolio are planned. Completed work will be published here with real implementation details and supporting material.</p>
            <a className="text-link accent-link" href="#experience">Explore my experience <Arrow /></a>
          </div>
        </div>
      )}
    </section>
  );
}

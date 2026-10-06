import { contact } from "../../content/site";
import { Arrow } from "../ui/arrow";

export function Contact() {
  const hasContact = contact.email || contact.linkedin || contact.github;
  const primaryHref = contact.email ? `mailto:${contact.email}` : contact.linkedin || contact.github;
  return (
    <section id="contact" tabIndex={-1} className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-top">
        <div>
          <h2 id="contact-heading">Have an opportunity in mind?</h2>
          <p>I&apos;m open to frontend engineering opportunities and selected freelance collaborations.</p>
        </div>
        {primaryHref && <a className="button-primary" href={primaryHref}>Get in touch <Arrow /></a>}
      </div>
      {hasContact ? (
        <div className="contact-links">
          {contact.email && <a className="text-link contact-email" href={`mailto:${contact.email}`}>{contact.email} <Arrow diagonal /></a>}
          {contact.linkedin && <a className="text-link" href={contact.linkedin}>LinkedIn <Arrow diagonal /></a>}
          {contact.github && <a className="text-link" href={contact.github}>GitHub <Arrow diagonal /></a>}
        </div>
      ) : (
        <p className="contact-pending">Contact details will be published once verified.</p>
      )}
    </section>
  );
}

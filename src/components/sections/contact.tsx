import { contact } from "../../content/site";
import { Arrow } from "../ui/arrow";

export function Contact() {
  return (
    <section id="contact" tabIndex={-1} className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-top">
        <div>
          <h2 id="contact-heading">Have an opportunity in mind?</h2>
          <p>I&apos;m open to frontend engineering opportunities and selected freelance collaborations.</p>
        </div>
        <a className="button-primary" href={`mailto:${contact.email}`}>Get in touch <Arrow /></a>
      </div>
      <div className="contact-links">
        <a className="text-link contact-email" href={`mailto:${contact.email}`}>{contact.email} <Arrow diagonal /></a>
        <a className="text-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
        <a className="text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
      </div>
    </section>
  );
}

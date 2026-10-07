// Fixed public origin; never derive canonical URLs from a preview host or request.
export const site = {
  origin: "https://ghazaleh-razi.com",
  name: "Ghazaleh Razi",
  title: "Ghazaleh Razi — Frontend Engineer | Angular & TypeScript",
  description:
    "Frontend Engineer specializing in Angular and TypeScript, building scalable, maintainable web applications with a focus on frontend architecture and user experience.",
  portrait: "/images/ghazaleh-razi-portrait.png",
  socialImage: "/images/og/ghazaleh-razi.png",
  socialImageAlt: "Ghazaleh Razi — Frontend Engineer — Angular & TypeScript",
} as const;

export const resumeHref = "/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf";

export const navigation = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

// Publish only owner-verified contact values.
export const contact = {
  email: "ghazale.razi@gmail.com",
  linkedin: "https://www.linkedin.com/in/ghazaleh-razi",
  github: "https://github.com/ghazaleh-razi",
} as const;

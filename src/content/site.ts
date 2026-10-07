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

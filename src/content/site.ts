export const resumeHref = "/resume/Ghazaleh-Razi-Frontend-Engineer-Resume.pdf";

export const navigation = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

// Publish only owner-verified contact values. Missing values never become links.
export const contact: {
  email: string | null;
  linkedin: string | null;
  github: string | null;
} = {
  email: null,
  linkedin: null,
  github: null,
};

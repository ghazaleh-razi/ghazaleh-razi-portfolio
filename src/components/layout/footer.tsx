import { Arrow } from "../ui/arrow";

export function Footer() {
  return (
    <footer className="page-container site-footer">
      <p>© {new Date().getFullYear()} Ghazaleh Razi</p>
      <a className="text-link back-to-top" href="#top">Back to top <Arrow direction="up" /></a>
    </footer>
  );
}

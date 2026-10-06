import { Arrow } from "../ui/arrow";

export function Footer() {
  return (
    <footer className="page-container site-footer">
      <p>© {new Date().getFullYear()} Ghazaleh Razi</p>
      <a className="text-link" href="#top">Back to top <Arrow diagonal /></a>
    </footer>
  );
}

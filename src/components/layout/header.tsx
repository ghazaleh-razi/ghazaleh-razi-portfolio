import { navigation, resumeHref } from "../../content/site";
import { Arrow } from "../ui/arrow";
import { ThemeControl } from "../ui/theme-control";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <a className="wordmark" href="#top" aria-label="Ghazaleh Razi — back to top">
          GR<span className="wordmark-dot" aria-hidden="true">.</span>
        </a>
        <nav id="desktop-navigation" className="desktop-nav" aria-label="Primary">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="resume-link" href={resumeHref} target="_blank" rel="noreferrer">Résumé <Arrow diagonal /></a>
          <ThemeControl />
        </div>
        <MobileNav>
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a href={resumeHref} target="_blank" rel="noreferrer">View résumé <Arrow diagonal /></a>
        </MobileNav>
      </div>
    </header>
  );
}

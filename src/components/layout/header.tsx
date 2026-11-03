import { navigation, resumeHref } from "../../content/site";
import { Arrow } from "../ui/arrow";
import { ThemeControl } from "../ui/theme-control";
import { MobileNav } from "./mobile-nav";

export function Header({ homeLinks = false }: { homeLinks?: boolean }) {
  const links = homeLinks
    ? navigation.map((item) => ({ ...item, href: `/${item.href}` }))
    : navigation;

  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <a className="wordmark" href={homeLinks ? "/" : "#top"} aria-label={homeLinks ? "Ghazaleh Razi — home" : "Ghazaleh Razi — back to top"}>
          GR<span className="wordmark-dot" aria-hidden="true">.</span>
        </a>
        <nav id="desktop-navigation" className="desktop-nav" aria-label="Primary">
          {links.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="resume-link" href={resumeHref} target="_blank" rel="noreferrer">Résumé <Arrow diagonal /></a>
          <ThemeControl />
        </div>
        <MobileNav>
          {links.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a href={resumeHref} target="_blank" rel="noreferrer">View résumé <Arrow diagonal /></a>
        </MobileNav>
      </div>
    </header>
  );
}

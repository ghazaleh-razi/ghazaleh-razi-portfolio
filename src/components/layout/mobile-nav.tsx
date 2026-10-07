"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function MobileNav({ children }: { children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const hasFocusRef = useRef(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const header = detailsRef.current?.closest("header");
    const headerObserver = new ResizeObserver(() => {
      if (header) {
        document.documentElement.style.setProperty("--header-height", `${header.getBoundingClientRect().height}px`);
      }
    });
    if (header) headerObserver.observe(header);

    function dismiss(event: PointerEvent) {
      const details = detailsRef.current;
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    }
    const desktop = window.matchMedia("(min-width: 48rem)");
    function handleResize() {
      const details = detailsRef.current;
      if (desktop.matches && details) {
        // Hiding the disclosure can move focus to body before the media event.
        if (hasFocusRef.current || details.contains(document.activeElement)) {
          document.querySelector<HTMLAnchorElement>("#desktop-navigation a")?.focus();
        }
        hasFocusRef.current = false;
        details.open = false;
      }
    }
    document.addEventListener("pointerdown", dismiss);
    desktop.addEventListener("change", handleResize);
    return () => {
      headerObserver.disconnect();
      document.documentElement.style.removeProperty("--header-height");
      document.removeEventListener("pointerdown", dismiss);
      desktop.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <details className="mobile-nav" ref={detailsRef}
      onToggle={(event) => setExpanded(event.currentTarget.open)}
      onFocusCapture={() => { hasFocusRef.current = true; }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && event.currentTarget.open) {
          event.preventDefault();
          event.currentTarget.open = false;
          triggerRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
          hasFocusRef.current = false;
          event.currentTarget.open = false;
        }
      }}>
      <summary ref={triggerRef} aria-expanded={expanded} aria-controls="mobile-navigation">
        Menu
        <span className="menu-symbol" aria-hidden="true"><span /><span /></span>
      </summary>
      <nav id="mobile-navigation" aria-label="Mobile" onFocus={(event) => {
        const target = event.target;
        // Native focus scrolling can leave a link clipped in a short disclosure.
        requestAnimationFrame(() => {
          if (target instanceof HTMLElement && target === document.activeElement && detailsRef.current?.open) {
            target.scrollIntoView({ block: "nearest", inline: "nearest" });
          }
        });
      }} onClick={(event) => {
        const link = event.target instanceof Element ? event.target.closest("a") : null;
        if (!link) return;
        if (detailsRef.current) detailsRef.current.open = false;
        const href = link.getAttribute("href");
        if (href?.startsWith("#")) {
          document.getElementById(href.slice(1))?.focus({ preventScroll: true });
        } else {
          triggerRef.current?.focus({ preventScroll: true });
        }
      }}>{children}</nav>
    </details>
  );
}

"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";
const storageKey = "portfolio-theme";
const themeEvent = "portfolio-theme-change";

function applyTheme(theme: Theme) {
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
}

function getTheme(): Theme {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark" ? theme : "system";
}

function subscribe(onChange: () => void) {
  function syncStorage(event: StorageEvent) {
    if (event.key !== storageKey && event.key !== null) return;
    const value = event.newValue;
    applyTheme(value === "light" || value === "dark" ? value : "system");
    onChange();
  }
  window.addEventListener("storage", syncStorage);
  window.addEventListener(themeEvent, onChange);
  return () => {
    window.removeEventListener("storage", syncStorage);
    window.removeEventListener(themeEvent, onChange);
  };
}

export function ThemeControl() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "system" as const);
  return (
    <label className="theme-control">
      <span className="sr-only">Color theme</span>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v16" />
        <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
      </svg>
      <select value={theme} onChange={(event) => {
        const value = event.target.value;
        if (value !== "light" && value !== "dark" && value !== "system") return;
        applyTheme(value);
        try { localStorage.setItem(storageKey, value); } catch { /* Selection still works without storage. */ }
        window.dispatchEvent(new Event(themeEvent));
      }} aria-label="Color theme">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <svg className="theme-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="m3.5 5.5 3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}

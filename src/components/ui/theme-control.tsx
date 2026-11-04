"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";

type Theme = "light" | "dark" | "system";
const storageKey = "portfolio-theme";
const themeEvent = "portfolio-theme-change";
const themes = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

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
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>("system");
  const [pointerFocus, setPointerFocus] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !controlRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function openOptions() {
    setActiveTheme(theme);
    setOpen(true);
  }

  function choose(value: Theme) {
    applyTheme(value);
    try { localStorage.setItem(storageKey, value); } catch { /* Selection still works without storage. */ }
    window.dispatchEvent(new Event(themeEvent));
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    setPointerFocus(false);
    const index = themes.findIndex((option) => option.value === activeTheme);
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!open) openOptions();
        else setActiveTheme(themes[(index + (event.key === "ArrowDown" ? 1 : -1) + themes.length) % themes.length]?.value ?? theme);
        break;
      case "Home":
      case "End":
        event.preventDefault();
        setActiveTheme(event.key === "Home" ? "system" : "dark");
        setOpen(true);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(activeTheme);
        else openOptions();
        break;
      case "Escape":
        if (open) event.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default: {
        const match = themes.find((option) => option.label.charAt(0).toLowerCase() === event.key.toLowerCase());
        if (match && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          setActiveTheme(match.value);
          setOpen(true);
        }
      }
    }
  }

  return (
    <div className="theme-control" ref={controlRef} onPointerDownCapture={() => setPointerFocus(true)} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setOpen(false);
        setPointerFocus(false);
      }
    }}>
      <button className="theme-trigger" type="button" role="combobox"
        data-pointer-focus={pointerFocus}
        aria-label="Color theme" aria-haspopup="listbox" aria-expanded={open}
        aria-controls={listId} aria-activedescendant={open ? `${listId}-${activeTheme}` : undefined}
        onClick={() => { if (open) setOpen(false); else openOptions(); }}
        onKeyDown={handleKeyDown}>
        <svg className="theme-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4v16" />
          <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
        </svg>
        <span>{themes.find((option) => option.value === theme)?.label}</span>
        <svg className="theme-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
          <path d="m3.5 5.5 3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul className="theme-options" id={listId} role="listbox" aria-label="Color theme" hidden={!open}>
        {themes.map((option) => (
          <li key={option.value} id={`${listId}-${option.value}`} role="option"
            aria-selected={theme === option.value} data-active={activeTheme === option.value}
            onPointerMove={() => setActiveTheme(option.value)}
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => choose(option.value)}>
            {option.label}
            {theme === option.value && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="m5 12 4 4L19 6" />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

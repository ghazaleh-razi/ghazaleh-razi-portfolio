export function Arrow({ diagonal = false, direction = "right" }: { diagonal?: boolean; direction?: "right" | "up" }) {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : direction === "up" ? "M12 20V4m-6 6 6-6 6 6" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

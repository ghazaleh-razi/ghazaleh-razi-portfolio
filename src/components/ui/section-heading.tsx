import type { ReactNode } from "react";

export function SectionHeading({ id, children, action }: {
  id: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <h2 id={id}>{children}</h2>
      <span className="section-rule" aria-hidden="true" />
      {action}
    </div>
  );
}

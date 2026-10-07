import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "../components/ui/arrow";

// Next.js supplies noindex for not-found output. No homepage canonical or graph.
export const metadata: Metadata = {
  title: "Page not found | Ghazaleh Razi",
  description: "This page could not be found. Return to Ghazaleh Razi’s portfolio.",
};

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="page-container hero">
      <div className="hero-content">
        <p className="availability">Ghazaleh Razi · 404</p>
        <h1>Page not found</h1>
        <p className="hero-description">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="hero-actions">
          <Link className="button-primary" href="/">Return to portfolio <Arrow /></Link>
        </div>
      </div>
    </main>
  );
}

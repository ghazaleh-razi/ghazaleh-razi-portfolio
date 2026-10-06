import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const manrope = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ghazaleh-razi.com"),
  title: "Ghazaleh Razi — Frontend Engineer | Angular & TypeScript",
  description:
    "Frontend Engineer specializing in Angular and TypeScript, building scalable, maintainable web applications with a focus on frontend architecture and user experience.",
  alternates: { canonical: "/" },
};

// Runs before body paint. Missing/invalid/unavailable storage leaves CSS in System mode.
// Future controls can save "light", "dark", or "system" under this stable key.
const themeScript = `try{var t=localStorage.getItem("portfolio-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch{}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { Hero } from "../components/sections/hero";
import { Work } from "../components/sections/work";
import { Experience } from "../components/sections/experience";
import { About } from "../components/sections/about";
import { Contact } from "../components/sections/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="page-container">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

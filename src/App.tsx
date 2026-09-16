import { CustomCursor } from "./components/CustomCursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Capabilities } from "./components/Capabilities";
import { Process } from "./components/Process";
import { SelectedWork } from "./components/SelectedWork";
import { Philosophy } from "./components/Philosophy";
import { Future } from "./components/Future";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { useContent } from "./content/ContentContext";
import { useDocumentMeta } from "./lib/useDocumentMeta";

function App() {
  const { content } = useContent();
  useDocumentMeta(content.seo.title, content.seo.description);

  return (
    <>
      <div className="ch-grain" aria-hidden="true" />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Capabilities />
        <Process />
        <SelectedWork />
        <Philosophy />
        <Future />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

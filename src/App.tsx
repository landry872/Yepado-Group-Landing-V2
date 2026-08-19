import Header from "./components/Header";
import Hero from "./components/Hero";
import FilialesMarquee from "./components/FilialesMarquee";
import Chiffres from "./components/Chiffres";
import AboutScrolly from "./components/AboutScrolly";
import Partners from "./components/Partners";
import CeoQuote from "./components/CeoQuote";
import Filiales from "./components/Filiales";
import Solutions from "./components/Solutions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useReveal();

  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <FilialesMarquee />
        <Chiffres />
        <AboutScrolly />
        <Partners />
        <CeoQuote />
        <Filiales />
        <Solutions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

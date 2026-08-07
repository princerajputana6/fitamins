import ScrollProgress from "./components/ScrollProgress.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Intro from "./components/Intro.jsx";
import Capabilities from "./components/Capabilities.jsx";
import Manifest from "./components/Manifest.jsx";
import Process from "./components/Process.jsx";
import Why from "./components/Why.jsx";
import Mentorship from "./components/Mentorship.jsx";
import Promise from "./components/Promise.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="top">
        <Hero />
        <Marquee dark />
        <Intro />
        <Capabilities />
        <Manifest />
        <Process />
        <Why />
        <Mentorship />
        <Marquee reverse duration={30} />
        <Promise />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

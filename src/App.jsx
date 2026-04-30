import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx";
import Experience from "./sections/Experience.jsx";
import Resume from "./sections/Resume.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import CursorTrail from "./components/CursorTrail.jsx";
import SpaceBackground from "./components/SpaceBackground.jsx";
import Preloader from "./components/Preloader.jsx";

const App = () => {
  return (
    <ReactLenis root options={{ smooth: true, duration: 1.4 }}>
      <Preloader />
      <main className="max-w-7xl mx-auto relative">
        <SpaceBackground />
        <CursorTrail />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Clients />
        <Experience />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
  );
};

export default App;

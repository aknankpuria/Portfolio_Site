import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Skills from "./sections/Skills.jsx";
import Clients from "./sections/Clients.jsx";
import GitHubStats from "./sections/GitHubStats.jsx";
import Experience from "./sections/Experience.jsx";
import Resume from "./sections/Resume.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import CursorTrail from "./components/CursorTrail.jsx";
import SpaceBackground from "./components/SpaceBackground.jsx";
import Preloader from "./components/Preloader.jsx";
import AIChatbot from "./components/AIChatbot.jsx";
import InteractiveNodes from "./components/InteractiveNodes.jsx";

const App = () => {
  return (
    <>
      <Preloader />
      <SpaceBackground />
      <CursorTrail />
      <main className="max-w-7xl mx-auto relative">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <InteractiveNodes />
        <Clients />
        <GitHubStats />
        <Experience />
        <Resume />
        <Contact />
        <Footer />
      </main>
      <AIChatbot />
    </>
  );
};

export default App;

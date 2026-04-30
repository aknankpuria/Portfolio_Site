import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import useSoundManager from "../hooks/useSoundManager";
import { SoundToggleButton } from "../components/SoundToggle";

const NavItems = ({ activeSection, onNavClick }) => {
  return (
    <div>
      <ul className="nav-ul">
        {navLinks.map(({ id, name, href }) => (
          <li key={id} className="nav-li">
            <a
              href={href}
              onClick={onNavClick}
              className={`nav-li_a transition-all duration-300 ${
                activeSection === href.replace("#", "")
                  ? "!text-[#00E5CC]"
                  : ""
              }`}
            >
              {name}
              {activeSection === href.replace("#", "") && (
                <span className="block h-0.5 mt-0.5 rounded-full bg-[#00E5CC] transition-all duration-300" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { soundEnabled, toggleSound, playClick } = useSoundManager();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    playClick();
  };

  const handleNavClick = () => {
    playClick();
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      let current = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black-200/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="/"
            className="group flex items-center gap-2 text-neutral-400 font-bold text-xl hover:text-white transition-colors"
          >
            <span className="text-[#00E5CC] font-mono text-lg">&lt;</span>
            <span className="font-generalsans tracking-tight">AK</span>
            <span className="text-[#00E5CC] font-mono text-lg">/&gt;</span>
          </a>

          <div className="flex items-center gap-3">
            {/* Sound Toggle */}
            <SoundToggleButton
              soundEnabled={soundEnabled}
              onToggle={() => {
                toggleSound();
              }}
            />

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
              aria-label="toggle menu"
            >
              <img
                src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
                alt="toggle"
                className="w-6 h-6"
              />
            </button>

            {/* Desktop nav */}
            <nav className="sm:flex hidden" aria-label="main navigation">
              <NavItems activeSection={activeSection} onNavClick={handleNavClick} />
            </nav>
          </div>
        </div>
      </div>
      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems activeSection={activeSection} onNavClick={handleNavClick} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Floating code snippets — gives the "developer" vibe without 3D weight
const codeLines = [
  { text: "const build = () => ship();", x: "8%", y: "18%", delay: 0.2 },
  { text: "await deploy({ env: 'prod' })", x: "72%", y: "14%", delay: 0.5 },
  { text: "pragma solidity ^0.8.0;", x: "78%", y: "72%", delay: 0.3 },
  { text: "chain.invoke(rag_pipeline)", x: "5%", y: "75%", delay: 0.7 },
  { text: "git push origin main", x: "62%", y: "88%", delay: 0.4 },
  { text: "SELECT * FROM users", x: "10%", y: "88%", delay: 0.6 },
];

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const heroRef = useRef();
  const nameRef = useRef();

  // Scramble text effect
  useEffect(() => {
    const nameEl = nameRef.current;
    if (!nameEl) return;

    const originalText = nameEl.innerText;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&_";
    let progress = 0;

    const interval = setInterval(() => {
      nameEl.innerText = originalText
        .split("")
        .map((c, idx) =>
          idx < progress
            ? originalText[idx]
            : c === " "
              ? " "
              : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");
      progress += 1 / 3;
      if (progress >= originalText.length) {
        clearInterval(interval);
        nameEl.innerText = originalText;
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animations — synced to 1.1s preloader
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-intro-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-tag-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, delay: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 1.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-code-line",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 1.6,
          stagger: 0.12,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.8, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      id="home"
      ref={heroRef}
    >
      {/* ═══ Background: Gradient orbs (CSS only, zero GPU cost) ═══ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary teal orb */}
        <div
          className="hero-orb absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(0,229,204,0.08) 0%, transparent 70%)",
            animation: "orbFloat1 8s ease-in-out infinite",
          }}
        />
        {/* Purple orb left */}
        <div
          className="hero-orb absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            top: "30%",
            left: "-8%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
            animation: "orbFloat2 10s ease-in-out infinite",
          }}
        />
        {/* Orange orb right */}
        <div
          className="hero-orb absolute rounded-full"
          style={{
            width: "350px",
            height: "350px",
            top: "40%",
            right: "-5%",
            background:
              "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)",
            animation: "orbFloat3 12s ease-in-out infinite",
          }}
        />

        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,229,204,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,204,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
          }}
        />

        {/* Floating code lines — desktop only */}
        {!isMobile &&
          codeLines.map((line, i) => (
            <div
              key={i}
              className="hero-code-line absolute font-mono text-xs select-none pointer-events-none"
              style={{
                left: line.x,
                top: line.y,
                color: "rgba(0,229,204,0.18)",
                opacity: 0,
                whiteSpace: "nowrap",
                letterSpacing: "0.05em",
                textShadow: "0 0 12px rgba(0,229,204,0.3)",
              }}
            >
              {line.text}
            </div>
          ))}
      </div>

      {/* ═══ Hero text content ═══ */}
      <div className="w-full mx-auto flex flex-col sm:mt-44 mt-28 c-space gap-3 relative z-10">
        {/* Name with scramble effect */}
        <p
          className="hero-intro-text sm:text-3xl text-xl font-medium text-white text-center font-generalsans"
          style={{ opacity: 0 }}
        >
          Hi, I&apos;m{" "}
          <span
            ref={nameRef}
            className="gradient-text"
            style={{ WebkitTextFillColor: "unset" }}
          >
            Aslam Khan
          </span>{" "}
          <span className="waving-hand">👋</span>
        </p>

        {/* Main tagline */}
        <p
          className="hero-tag-text hero_tag text-gray_gradient text-center"
          style={{ opacity: 0 }}
        >
          I build scalable systems, Web3 infrastructure,{" "}
          <br className="hidden sm:block" />
          and AI-powered products.
        </p>

        {/* Subtitle */}
        <p
          className="hero-subtitle text-center text-white-600 text-sm sm:text-base tracking-widest uppercase font-mono mt-2"
          style={{ opacity: 0 }}
        >
          Full Stack Developer · Web3 Engineer · AI Integration Specialist
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-cta flex items-center justify-center gap-4 mt-8"
          style={{ opacity: 0 }}
        >
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-300 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #00E5CC 0%, #7C3AED 100%)",
              boxShadow: "0 4px 20px rgba(0, 229, 204, 0.3)",
            }}
          >
            <span className="relative z-10">View Work</span>
            <svg
              className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-300 border border-white/20 hover:border-[#00E5CC]/50 hover:bg-white/5"
          >
            <span>Contact</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>

        {/* Tech stack pill row */}
        <div
          className="hero-cta flex items-center justify-center gap-2 flex-wrap mt-6"
          style={{ opacity: 0 }}
        >
          {["React", "Node.js", "Solidity", "LangChain", "PostgreSQL", "Docker"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border border-white/8 text-white/30 hover:text-[#00E5CC]/60 hover:border-[#00E5CC]/20 transition-colors duration-300"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: 0 }}
      >
        <span className="text-white-500 text-xs uppercase tracking-widest font-mono">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#00E5CC] animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

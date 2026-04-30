import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, skillCategories } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef();
  const orbitRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".skills-subtitle",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-subtitle",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".skills-filters",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-filters",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".skills-orbit-container",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-orbit-container",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Orbit animation with mouse parallax
  const handleMouseMove = useCallback((e) => {
    if (!orbitRef.current) return;
    const rect = orbitRef.current.getBoundingClientRect();
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  // Calculate orbit positions for skills
  const getOrbitPosition = (index, total, time) => {
    const angle = (index / total) * Math.PI * 2 + time * 0.0003;
    const radiusX = 38 + Math.sin(time * 0.0005 + index) * 5;
    const radiusY = 32 + Math.cos(time * 0.0004 + index) * 4;
    const x =
      50 +
      radiusX * Math.cos(angle) +
      mousePos.current.x * 3;
    const y =
      50 +
      radiusY * Math.sin(angle) +
      mousePos.current.y * 3;
    return { x, y };
  };

  // Animation loop
  useEffect(() => {
    const orbitContainer = orbitRef.current;
    if (!orbitContainer) return;

    const nodes = orbitContainer.querySelectorAll(".skill-node");
    const connections = orbitContainer.querySelectorAll(".skill-connection");

    const animate = (time) => {
      nodes.forEach((node, i) => {
        const pos = getOrbitPosition(i, nodes.length, time);
        node.style.left = `${pos.x}%`;
        node.style.top = `${pos.y}%`;
      });

      // Update SVG connection lines
      connections.forEach((line, i) => {
        const pos1 = getOrbitPosition(i, nodes.length, time);
        const pos2 = getOrbitPosition((i + 1) % nodes.length, nodes.length, time);
        line.setAttribute("x1", `${pos1.x}%`);
        line.setAttribute("y1", `${pos1.y}%`);
        line.setAttribute("x2", `${pos2.x}%`);
        line.setAttribute("y2", `${pos2.y}%`);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [filteredSkills]);

  return (
    <section className="c-space my-20" id="skills" ref={sectionRef}>
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-label-alt skills-heading mb-3">What I Work With</p>
        <h3 className="head-text skills-heading">Tech Arsenal</h3>
        <p className="skills-subtitle text-white-600 mt-4 max-w-2xl mx-auto text-base">
          Bridging backend systems with intelligent automation — from React frontends to Solidity smart contracts and AI pipelines.
        </p>
      </div>

      {/* Category Filters */}
      <div className="skills-filters flex flex-wrap items-center justify-center gap-3 mb-12">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer ${
              activeCategory === cat.id
                ? "bg-[#00E5CC]/15 border-[#00E5CC]/50 text-[#00E5CC] shadow-[0_0_20px_rgba(0,229,204,0.15)]"
                : "border-white/10 text-white-500 hover:border-white/25 hover:text-white-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Orbit Visualization */}
      <div
        className="skills-orbit-container relative w-full max-w-3xl mx-auto aspect-square"
        ref={orbitRef}
        onMouseMove={handleMouseMove}
      >
        {/* Center node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,204,0.15) 0%, rgba(124,58,237,0.15) 100%)',
              border: '1px solid rgba(0,229,204,0.3)',
              boxShadow: '0 0 40px rgba(0,229,204,0.1), inset 0 0 30px rgba(0,229,204,0.05)',
            }}
          >
            <span className="text-2xl sm:text-3xl font-bold gradient-text" style={{ WebkitTextFillColor: 'unset' }}>AK</span>
          </div>
        </div>

        {/* Orbit rings (decorative) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="38" ry="32" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.2" />
          <ellipse cx="50" cy="50" rx="30" ry="25" fill="none" stroke="rgba(0,229,204,0.05)" strokeWidth="0.15" />
          <ellipse cx="50" cy="50" rx="22" ry="18" fill="none" stroke="rgba(124,58,237,0.05)" strokeWidth="0.15" />
          {/* Connection lines between nodes */}
          {filteredSkills.map((_, i) => (
            <line
              key={`conn-${i}`}
              className="skill-connection"
              stroke="rgba(0,229,204,0.08)"
              strokeWidth="0.1"
            />
          ))}
        </svg>

        {/* Skill Nodes */}
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="skill-node absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div
              className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
                hoveredSkill === skill.name ? "scale-125" : "scale-100"
              }`}
            >
              {/* Skill bubble */}
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: hoveredSkill === skill.name
                    ? `radial-gradient(circle, ${skill.color}30 0%, ${skill.color}10 70%)`
                    : `radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 70%)`,
                  border: `1px solid ${hoveredSkill === skill.name ? skill.color + '60' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: hoveredSkill === skill.name
                    ? `0 0 25px ${skill.color}25, inset 0 0 15px ${skill.color}10`
                    : 'none',
                }}
              >
                <span
                  className="text-xs sm:text-sm font-semibold transition-colors duration-300 text-center leading-tight px-1"
                  style={{
                    color: hoveredSkill === skill.name ? skill.color : 'var(--text-secondary)',
                  }}
                >
                  {skill.name}
                </span>
              </div>

              {/* Skill level bar (on hover) */}
              {hoveredSkill === skill.name && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: skill.color }}>
                      {skill.level}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skills Grid (fallback / additional detail) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16 max-w-4xl mx-auto">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 hover:bg-white/[0.02]"
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: `${skill.color}15`,
                border: `1px solid ${skill.color}25`,
              }}
            >
              <span className="text-xs font-bold" style={{ color: skill.color }}>
                {skill.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-white-600 group-hover:text-white-800 transition-colors text-center">
              {skill.name}
            </span>
            {/* Mini progress bar */}
            <div className="w-full h-0.5 rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-700 group-hover:opacity-100 opacity-50"
                style={{
                  width: `${skill.level}%`,
                  background: skill.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

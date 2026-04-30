import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Interactive Nodes — Mini Interactive Element
 * Portfolio.md spec: "Clickable nodes / particles. Each click reveals: Skill, Project, Fact"
 * Make it FUN but not childish.
 */

const nodeData = [
  { type: "skill", icon: "⚛️", label: "React", detail: "3+ years building SPAs & SSR apps" },
  { type: "skill", icon: "🔗", label: "Solidity", detail: "Smart contracts & ERC standards" },
  { type: "skill", icon: "🧠", label: "LangChain", detail: "RAG pipelines & AI agents" },
  { type: "project", icon: "🔬", label: "Virtual Try-On", detail: "AI image generation API" },
  { type: "project", icon: "🤖", label: "AURA", detail: "Web3 AI Agent with IPFS memory" },
  { type: "project", icon: "📊", label: "Dashboard API", detail: "50+ endpoints with RBAC" },
  { type: "fact", icon: "🚀", label: "35% Faster", detail: "API response optimization at AdsUp" },
  { type: "fact", icon: "🌍", label: "Remote", detail: "Working across all timezones" },
  { type: "fact", icon: "💡", label: "5+ Projects", detail: "Delivered as freelancer" },
  { type: "skill", icon: "🐳", label: "Docker", detail: "Containerized deployments" },
  { type: "fact", icon: "⛓️", label: "Web3 + AI", detail: "Rare hybrid skill combination" },
  { type: "skill", icon: "🗄️", label: "PostgreSQL", detail: "Advanced queries & indexing" },
];

const typeColors = {
  skill: "#00E5CC",
  project: "#7C3AED",
  fact: "#FF6B35",
};

const typeLabels = {
  skill: "SKILL",
  project: "PROJECT",
  fact: "FACT",
};

const InteractiveNodes = () => {
  const [revealedNodes, setRevealedNodes] = useState(new Set());
  const [activeNode, setActiveNode] = useState(null);
  const containerRef = useRef();
  const nodesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  // Generate fixed positions for nodes in a scattered pattern
  const [nodePositions] = useState(() => {
    const positions = [];
    const rows = 3;
    const cols = 4;
    for (let i = 0; i < nodeData.length; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const baseX = (col + 0.5) / cols * 100;
      const baseY = (row + 0.5) / rows * 100;
      // Add some randomness
      positions.push({
        x: baseX + (Math.random() - 0.5) * 15,
        y: baseY + (Math.random() - 0.5) * 20,
      });
    }
    return positions;
  });

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  // Subtle floating animation
  useEffect(() => {
    const nodes = nodesRef.current.filter(Boolean);
    nodes.forEach((node, i) => {
      gsap.to(node, {
        y: `${Math.sin(i * 0.7) * 6}`,
        x: `${Math.cos(i * 0.5) * 4}`,
        duration: 3 + i * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  // GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".interactive-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".interactive-heading", start: "top 85%" },
        }
      );

      nodesRef.current.filter(Boolean).forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0, scale: 0 },
          {
            opacity: 1, scale: 1, duration: 0.5, delay: i * 0.06,
            ease: "back.out(2)",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNodeClick = (index) => {
    setRevealedNodes((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    setActiveNode(index);

    // Animate the reveal
    const node = nodesRef.current[index];
    if (node) {
      gsap.fromTo(
        node,
        { scale: 0.8 },
        { scale: 1, duration: 0.4, ease: "elastic.out(1.2, 0.5)" }
      );
    }

    // Auto-close detail after 4s
    setTimeout(() => {
      setActiveNode((prev) => (prev === index ? null : prev));
    }, 4000);
  };

  const progress = Math.round((revealedNodes.size / nodeData.length) * 100);

  return (
    <section className="c-space my-20" ref={containerRef}>
      <div className="text-center mb-8">
        <p className="text-label-alt interactive-heading mb-3">Discover</p>
        <h3 className="head-text interactive-heading">Explore My World</h3>
        <p className="text-white-500 text-sm mt-3 font-mono">
          Click the nodes to discover skills, projects, and facts
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-xs mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-white-500 uppercase tracking-wider">
            Discovered
          </span>
          <span className="text-[10px] font-mono text-[#00E5CC]">
            {revealedNodes.size}/{nodeData.length}
          </span>
        </div>
        <div className="w-full h-1 rounded-full bg-white/5">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00E5CC, #7C3AED, #FF6B35)",
            }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mb-8">
        {Object.entries(typeLabels).map(([type, label]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: typeColors[type] }}
            />
            <span className="text-[10px] font-mono text-white-500 uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Nodes Container */}
      <div
        className="relative w-full max-w-4xl mx-auto aspect-[4/3] sm:aspect-[2/1]"
        onMouseMove={handleMouseMove}
      >
        {/* Connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodeData.map((_, i) => {
            const nextI = (i + 1) % nodeData.length;
            if (i >= nodeData.length - 1) return null;
            return (
              <line
                key={`line-${i}`}
                x1={`${nodePositions[i].x}%`}
                y1={`${nodePositions[i].y}%`}
                x2={`${nodePositions[nextI].x}%`}
                y2={`${nodePositions[nextI].y}%`}
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodeData.map((node, i) => {
          const isRevealed = revealedNodes.has(i);
          const isActive = activeNode === i;
          const color = typeColors[node.type];

          return (
            <div
              key={i}
              ref={(el) => (nodesRef.current[i] = el)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{
                left: `${nodePositions[i].x}%`,
                top: `${nodePositions[i].y}%`,
              }}
              onClick={() => handleNodeClick(i)}
            >
              {/* Node circle */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isRevealed ? "w-14 h-14 sm:w-16 sm:h-16" : "w-10 h-10 sm:w-12 sm:h-12"
                }`}
              >
                {/* Outer ring */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-500"
                  style={{
                    border: `1.5px solid ${isRevealed ? color + "40" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isRevealed ? `0 0 20px ${color}15` : "none",
                    background: isRevealed
                      ? `radial-gradient(circle, ${color}10 0%, transparent 70%)`
                      : "rgba(255,255,255,0.02)",
                  }}
                />

                {/* Icon / Question mark */}
                <span
                  className={`relative z-10 transition-all duration-300 ${
                    isRevealed ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                  }`}
                  style={{
                    filter: isRevealed ? "none" : "grayscale(1) brightness(0.5)",
                  }}
                >
                  {isRevealed ? node.icon : "?"}
                </span>

                {/* Pulse ring when not revealed */}
                {!isRevealed && (
                  <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
                )}
              </div>

              {/* Detail popup */}
              {isActive && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 p-3 rounded-xl border text-center z-20"
                  style={{
                    background: "rgba(13,13,26,0.95)",
                    backdropFilter: "blur(12px)",
                    borderColor: color + "25",
                    boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 20px ${color}10`,
                  }}
                >
                  <span
                    className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{
                      color: color,
                      background: color + "10",
                      border: `1px solid ${color}20`,
                    }}
                  >
                    {typeLabels[node.type]}
                  </span>
                  <p className="text-sm font-semibold text-white mt-1">{node.label}</p>
                  <p className="text-[11px] text-white-500 mt-1 leading-relaxed">
                    {node.detail}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* All revealed message */}
      {revealedNodes.size === nodeData.length && (
        <div className="text-center mt-8">
          <p className="text-sm font-mono gradient-text inline-block" style={{ WebkitTextFillColor: "unset" }}>
            🎉 You discovered everything! Now let&apos;s build something together.
          </p>
          <div className="mt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00E5CC 0%, #7C3AED 100%)",
                boxShadow: "0 4px 15px rgba(0,229,204,0.3)",
              }}
            >
              Get In Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveNodes;

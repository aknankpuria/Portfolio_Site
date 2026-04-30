import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import Globe from "react-globe.gl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";
import CanvasLoader from "../components/CanvasLoader";

gsap.registerPlugin(ScrollTrigger);

const Desk = (props) => {
  const { scene } = useGLTF("/models/desk.glb");
  return <primitive object={scene} {...props} />;
};

/* ═══════════════════════════════════════════
   Floating stat cards — the "NOT BORING" way
   ═══════════════════════════════════════════ */
const statCards = [
  { value: "2+", label: "Years Experience", icon: "⚡" },
  { value: "React + Node", label: "Full-Stack Core", icon: "🔧" },
  { value: "Solidity", label: "Smart Contracts", icon: "🔗" },
  { value: "LangChain", label: "AI & RAG Agents", icon: "🧠" },
];

const FloatingStatCard = ({ stat, index }) => {
  const cardRef = useRef();

  useEffect(() => {
    if (!cardRef.current) return;

    // Subtle floating animation per card
    gsap.to(cardRef.current, {
      y: `${(index % 2 === 0 ? -1 : 1) * 8}px`,
      duration: 2.5 + index * 0.3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="about-float-card group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 cursor-default overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,229,204,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <span className="text-2xl mb-3 block">{stat.icon}</span>
        <p className="text-2xl font-bold text-white font-generalsans mb-1">
          {stat.value}
        </p>
        <p className="text-xs text-white-500 uppercase tracking-wider font-mono">
          {stat.label}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(225deg, rgba(0,229,204,0.15) 0%, transparent 60%)",
          }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const sectionRef = useRef();

  const handleCopy = () => {
    navigator.clipboard.writeText("aknankpuria@gmail.com");
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  // GSAP scroll-triggered reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headings
      gsap.fromTo(
        ".about-section-label",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-section-label", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-highlight",
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-highlight", start: "top 85%" },
        }
      );

      // Floating stat cards
      gsap.utils.toArray(".about-float-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Grid items
      gsap.utils.toArray(".about-grid-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="c-space my-20" id="about" ref={sectionRef}>
      {/* ═══════ Section Header ═══════ */}
      <div className="text-center mb-12">
        <p className="text-label-alt about-section-label mb-3">Who I Am</p>
        <h2 className="head-text about-section-label">About Me</h2>
      </div>

      {/* ═══════ Highlight Statement ═══════ */}
      <div className="about-highlight max-w-3xl mx-auto text-center mb-16">
        <p className="text-xl sm:text-2xl text-white/90 font-generalsans leading-relaxed">
          &ldquo;Bridging{" "}
          <span className="text-[#00E5CC] font-semibold">backend systems</span>{" "}
          with{" "}
          <span className="text-[#7C3AED] font-semibold">
            intelligent automation
          </span>
          .&rdquo;
        </p>
        <div className="w-16 h-0.5 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#00E5CC] via-[#7C3AED] to-[#FF6B35]" />
      </div>

      {/* ═══════ Floating Stat Cards (NOT BORING) ═══════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
        {statCards.map((stat, i) => (
          <FloatingStatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* ═══════ Bento Grid ═══════ */}
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Grid 1 - Introduction */}
        <div className="col-span-1 xl:row-span-3 about-grid-item">
          <div className="grid-container">
            <img
              src="/assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Hi, I&apos;m Aslam Khan</p>
              <p className="grid-subtext">
                Results-driven Full Stack Developer with 2+ years building
                scalable web applications. Not just a UI dev —{" "}
                <span className="text-[#00E5CC]">a systems thinker</span> who
                ships real products from concept to production.
              </p>
            </div>
          </div>
        </div>

        {/* Grid 2 - Tech Stack */}
        <div className="col-span-1 xl:row-span-3 about-grid-item">
          <div className="grid-container">
            <img
              src="/assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                React, Next.js, Node.js, TypeScript on the web.
                Solidity, Web3.js, Hardhat for blockchain.
                LangChain, RAG pipelines for AI.
                PostgreSQL, MongoDB, Docker for infrastructure.
              </p>
              {/* Mini tech pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {["React", "Node.js", "Solidity", "LangChain", "PostgreSQL"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] rounded-full border border-white/10 text-white-500 font-mono uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid 3 - Globe */}
        <div className="col-span-1 xl:row-span-4 about-grid-item">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 30.7333,
                    lng: 76.7794,
                    text: "Chandigarh, India",
                    color: "#00E5CC",
                    size: 20,
                  },
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">
                I work remotely across most timezones.
              </p>
              <p className="grid-subtext">
                I&apos;m based in Chandigarh, India, with remote work available
                across most timezones.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        {/* Grid 4 - Passion (3D Desk Model) */}
        <div className="xl:col-span-2 xl:row-span-3 about-grid-item">
          <div className="grid-container">
            {!isMobile ? (
              <div className="w-full sm:h-[266px] h-[200px] rounded-xl overflow-hidden">
                <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                  <ambientLight intensity={5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <spotLight
                    position={[-5, 5, 5]}
                    angle={0.3}
                    penumbra={1}
                    intensity={0.5}
                  />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={3}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 3}
                  />
                  <Suspense fallback={<CanvasLoader />}>
                    <Desk
                      scale={0.08}
                      position={[0, -1.5, 0]}
                      rotation={[0, -Math.PI / 4, 0]}
                    />
                  </Suspense>
                </Canvas>
              </div>
            ) : (
              <img
                src="/assets/grid3.png"
                alt="grid-3"
                className="w-full sm:h-[266px] h-fit object-contain"
              />
            )}
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Coding
                isn&apos;t just my profession—it is my passion. I enjoy
                exploring new technologies and frameworks.
              </p>
            </div>
          </div>
        </div>

        {/* Grid 5 - Contact */}
        <div className="xl:col-span-1 xl:row-span-2 about-grid-item">
          <div className="grid-container">
            <img
              src="/assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  aknankpuria@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

useGLTF.preload("/models/desk.glb");

export default About;

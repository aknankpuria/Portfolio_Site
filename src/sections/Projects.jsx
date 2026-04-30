import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { myProjects } from "../constants";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasLoader from "../components/CanvasLoader";
import DemoComputer from "../components/DemoComputer";

gsap.registerPlugin(ScrollTrigger);

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentProject = myProjects[selectedProjectIndex];
  const sectionRef = useRef();
  const contentRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const animateTransition = useCallback(
    (newIndex) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Fade out current content
      tl.to(".project-info-animated", {
        opacity: 0,
        y: -20,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.in",
      });

      // Switch project data
      tl.call(() => setSelectedProjectIndex(newIndex));

      // Fade in new content
      tl.fromTo(
        ".project-info-animated",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    },
    [isAnimating]
  );

  const handleNavigation = (direction) => {
    let newIndex;
    if (direction === "previous") {
      newIndex =
        selectedProjectIndex === 0
          ? projectCount - 1
          : selectedProjectIndex - 1;
    } else {
      newIndex =
        selectedProjectIndex === projectCount - 1
          ? 0
          : selectedProjectIndex + 1;
    }
    animateTransition(newIndex);
  };

  // GSAP scroll-triggered reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".projects-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-content",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".projects-3d",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-3d",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="c-space my-20" id="work" ref={sectionRef}>
      <p className="text-label-alt projects-heading mb-3">Featured Work</p>
      <p className="head-text projects-heading">My Projects</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* Project Info */}
        <div
          className={`projects-content flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 ${isMobile ? "col-span-1" : ""}`}
          ref={contentRef}
        >
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Logo */}
          <div
            className="project-info-animated p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <img
              src={currentProject.logo}
              alt="logo"
              className="w-10 h-10 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            {/* Title */}
            <p className="project-info-animated text-white text-2xl font-semibold">
              {currentProject.title}
            </p>

            {/* Description */}
            <p className="project-info-animated">{currentProject.desc}</p>

            {/* Sub-description */}
            <p className="project-info-animated text-sm leading-relaxed">
              {currentProject.subdesc}
            </p>

            {/* Impact line */}
            {currentProject.impact && (
              <div className="project-info-animated flex items-center gap-2 mt-1 px-3 py-2 rounded-lg bg-[#00E5CC]/[0.05] border border-[#00E5CC]/10 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] animate-pulse" />
                <p className="text-[#00E5CC] text-sm font-mono">
                  {currentProject.impact}
                </p>
              </div>
            )}
          </div>

          {/* Tech tags + link */}
          <div className="project-info-animated flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo group relative" title={tag.name}>
                  <img src={tag.path} alt={tag.name} />
                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono text-white bg-black-300 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600 hover:text-[#00E5CC] transition-colors duration-300 group"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>View on GitHub</p>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>
          </div>

          {/* Navigation + Project Counter */}
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn hover:scale-110 transition-transform"
              onClick={() => handleNavigation("previous")}
              disabled={isAnimating}
            >
              <img
                src="/assets/left-arrow.png"
                alt="left arrow"
                className="w-4 h-4"
              />
            </button>

            {/* Project counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white-500 font-mono">
                {String(selectedProjectIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5">
                {myProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i !== selectedProjectIndex) animateTransition(i);
                    }}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === selectedProjectIndex
                        ? "w-6 h-2 bg-[#00E5CC]"
                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-white-500 font-mono">
                {String(projectCount).padStart(2, "0")}
              </span>
            </div>

            <button
              className="arrow-btn hover:scale-110 transition-transform"
              onClick={() => handleNavigation("next")}
              disabled={isAnimating}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* 3D Computer Display - Hidden on mobile for performance */}
        {!isMobile && (
          <div className="projects-3d border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
            <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={2}
                    position={[0, -3, 0]}
                    rotation={[0, -0.1, 0]}
                  >
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls
                maxPolarAngle={Math.PI / 2}
                enableZoom={false}
                enablePan={false}
              />
            </Canvas>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

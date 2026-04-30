import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCamera from "../components/HeroCamera";
import HackerRoom from "../components/HackerRoom";
import CanvasLoader from "../components/CanvasLoader";
import Target from "../components/Target";
import ReactLogo from "../components/ReactLogo";
import Cube from "../components/Cube";
import Rings from "../components/Rings";
import { calculateSizes } from "../constants/index.ts";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const heroRef = useRef();
  const nameRef = useRef();
  const taglineRef = useRef();

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Scramble text effect from plan.md
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

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-intro-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 2.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-tag-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 2.5, ease: "power3.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col relative" ref={heroRef}>
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="hero-intro-text sm:text-3xl text-xl font-medium text-white text-center font-generalsans" style={{ opacity: 0 }}>
          Hi, I&apos;m{" "}
          <span ref={nameRef}>Aslam Khan</span>{" "}
          <span className="waving-hand">👋</span>
        </p>
        <p className="hero-tag-text hero_tag text-gray_gradient text-center" ref={taglineRef} style={{ opacity: 0 }}>
          Full Stack Developer | Web3 Enthusiast
        </p>
      </div>
      <div className="w-full h-full absolute inset-0">
        <Canvas
          className="w-full h-full"
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                position={sizes.deskPosition}
                rotation={[0, -Math.PI, 0]}
                scale={sizes.deskScale}
              />
            </HeroCamera>
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <group>
              <Target position={sizes.targetPosition} />
            </group>
            <ReactLogo position={sizes.reactLogoPosition} />
            <Cube position={sizes.cubePosition} />
            <Rings position={sizes.ringPosition} />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;

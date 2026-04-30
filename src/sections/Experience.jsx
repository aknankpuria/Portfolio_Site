import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperiences } from "../constants";
import Developer from "../components/Developer";
import CanvasLoader from "../components/CanvasLoader";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [animationName, setAnimationName] = useState("idle");
  const sectionRef = useRef();

  // GSAP scroll-triggered timeline animations from plan.md
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section heading
      gsap.fromTo(
        ".exp-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-heading",
            start: "top 85%",
          },
        }
      );

      // Animate each work experience item
      gsap.utils.toArray(".work-content_container").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="c-space my-20" ref={sectionRef}>
      <div className="w-full text-white-600">
        <h3 className="head-text exp-heading">My Work Experience</h3>

        <div className="work-container">
          {/* Canvas for 3D Developer */}
          <div className="work-canvas">
            <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
              <ambientLight intensity={7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                enablePan={false}
              />

              <Suspense fallback={<CanvasLoader />}>
                <Developer
                  position-y={-3}
                  scale={3}
                  animationName={animationName}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Experience Content */}
          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map(
                ({ id, name, pos, duration, title, icon, animation }) => (
                  <div
                    key={id}
                    className="work-content_container group"
                    onClick={() => setAnimationName(animation.toLowerCase())}
                    onPointerOver={() =>
                      setAnimationName(animation.toLowerCase())
                    }
                    onPointerOut={() => setAnimationName("idle")}
                  >
                    <div className="flex flex-col h-full justify-start items-center py-2">
                      <div className="work-content_logo">
                        <img src={icon} alt={name} className="w-full h-full" />
                      </div>
                      <div className="work-content_bar" />
                    </div>

                    <div className="sm:p-5 px-2.5 py-5">
                      <p className="font-bold text-white-800">{name}</p>
                      <p className="text-sm mb-5">
                        {pos} -- {duration}
                      </p>
                      <p className="group-hover:text-white transition ease-in-out duration-500">
                        {title}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

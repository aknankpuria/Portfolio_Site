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
                Results-driven Full Stack Developer with expertise in building
                scalable web applications using React, Next.js, Node.js, and
                TypeScript. Experienced in backend optimization, responsive UI
                design, and Web3 development.
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
                I specialize in React, Next.js, Node.js, and TypeScript.
                Experienced with Web3 technologies including Solidity, Web3.js,
                and Hardhat. Also proficient in PostgreSQL, MongoDB, and Docker.
              </p>
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
                    lat: 40,
                    lng: -100,
                    text: "I am here!",
                    color: "white",
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
                  <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={3}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 3}
                  />
                  <Suspense fallback={<CanvasLoader />}>
                    <Desk scale={0.08} position={[0, -1.5, 0]} rotation={[0, -Math.PI / 4, 0]} />
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

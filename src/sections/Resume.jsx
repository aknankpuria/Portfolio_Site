import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
  const sectionRef = useRef();

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".resume-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".resume-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".resume-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".resume-card",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="c-space my-20" id="resume" ref={sectionRef}>
      <div className="w-full flex flex-col items-center justify-center">
        <h3 className="head-text mb-4 resume-heading">My Resume</h3>
        <p className="text-lg text-white-600 text-center max-w-2xl mt-3 mb-12">
          Interested in my background and qualifications? Download my resume to
          learn more about my skills, experience, and education.
        </p>

        <div className="resume-card">
          {/* Decorative document icon */}
          <div className="resume-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>

          <p className="text-white-800 font-semibold text-xl mb-1 font-generalsans">
            Aslam Khan
          </p>
          <p className="text-white-600 text-sm mb-8 font-generalsans">
            Full Stack Developer &bull; Web3 Enthusiast
          </p>

          {/* Download button */}
          <a
            href="/assets/AslamKhan_fullstack.pdf"
            download="Aslam_Khan_Resume.pdf"
            className="resume-btn group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;

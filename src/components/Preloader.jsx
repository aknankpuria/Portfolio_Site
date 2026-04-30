import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const preloaderRef = useRef();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false),
    });

    tl.fromTo(
      ".preloader-initials",
      { opacity: 0, scale: 0.85, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
    )
      .to(".preloader-initials", {
        scale: 1.1,
        opacity: 0,
        duration: 0.3,
        delay: 0.2,
        ease: "power2.in",
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
  }, []);

  if (!isVisible) return null;

  return (
    <div id="preloader" ref={preloaderRef}>
      <div className="preloader-initials">AK</div>
    </div>
  );
};

export default Preloader;

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
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .to(".preloader-initials", {
        scale: 1.2,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: "power2.in",
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
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

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clientReviews } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentReview = clientReviews[currentIndex];
  const sectionRef = useRef();

  const animateTransition = useCallback(
    (newIndex) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      tl.to(".review-animated", {
        opacity: 0,
        y: -15,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
      });

      tl.call(() => setCurrentIndex(newIndex));

      tl.fromTo(
        ".review-animated",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
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
        currentIndex === 0 ? clientReviews.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === clientReviews.length - 1 ? 0 : currentIndex + 1;
    }
    animateTransition(newIndex);
  };

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".clients-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".clients-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".client-review-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".client-review-card",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="c-space my-20" ref={sectionRef}>
      <p className="text-label-alt clients-heading mb-3">Testimonials</p>
      <h3 className="head-text clients-heading">Hear from My Clients</h3>

      <div className="client-container">
        <div className="client-review client-review-card">
          <div>
            {/* Quote icon */}
            <div className="review-animated mb-4">
              <svg className="w-8 h-8 text-[#00E5CC]/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <p className="review-animated text-white font-light text-lg leading-relaxed">
              {currentReview.review}
            </p>

            <div className="client-content">
              <div className="review-animated flex gap-3 items-center">
                <img
                  src={currentReview.img}
                  alt={currentReview.name}
                  className="w-12 h-12 rounded-full border border-white/10"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-white-800">
                    {currentReview.name}
                  </p>
                  <p className="text-white-500 md:text-base text-sm">
                    {currentReview.position}
                  </p>
                </div>
              </div>

              <div className="review-animated flex self-end items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows + Dots */}
        <div className="flex flex-col items-center gap-4 mt-7">
          <div className="flex items-center gap-4">
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

            {/* Review dots */}
            <div className="flex items-center gap-2">
              {clientReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i !== currentIndex) animateTransition(i);
                  }}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "w-6 h-2 bg-[#00E5CC]"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
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
      </div>
    </section>
  );
};

export default Clients;

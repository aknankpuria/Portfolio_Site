import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clientReviews } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentReview = clientReviews[currentIndex];
  const sectionRef = useRef();

  const handleNavigation = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? clientReviews.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === clientReviews.length - 1 ? 0 : prevIndex + 1;
      }
    });
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
      <h3 className="head-text clients-heading">Hear from My Clients</h3>

      <div className="client-container">
        <div className="client-review client-review-card">
          <div>
            <p className="text-white font-light">{currentReview.review}</p>

            <div className="client-content">
              <div className="flex gap-3">
                <img
                  src={currentReview.img}
                  alt={currentReview.name}
                  className="w-12 h-12 rounded-full"
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

              <div className="flex self-end items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img
                    key={index}
                    src="/assets/star.png"
                    alt="star"
                    className="w-5 h-5"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mt-7">
          <button
            className="arrow-btn"
            onClick={() => handleNavigation("previous")}
          >
            <img
              src="/assets/left-arrow.png"
              alt="left arrow"
              className="w-4 h-4"
            />
          </button>

          <button
            className="arrow-btn"
            onClick={() => handleNavigation("next")}
          >
            <img
              src="/assets/right-arrow.png"
              alt="right arrow"
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Clients;

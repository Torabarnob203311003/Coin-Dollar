import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import VectorIcon from '../assets/Vector.svg';

function LineSection({ bgColor, textColor, borderColor,  }) {
  const marqueeRef = useRef(null);

  // Define the common marquee content block as a reusable component/fragment
  const MarqueeContent = () => (
    <>
      <span className='
        text-[11px]    // Slightly smaller base font size for smallest screens (e.g., 11px)
        sm:text-xs    // Small breakpoint font size (e.g., 12px)
        md:text-sm    // Medium breakpoint font size (e.g., 14px)
        lg:text-base  // Large breakpoint font size (e.g., 16px)
        xl:text-lg    // Extra large breakpoint font size (e.g., 18px)
        2xl:text-4xl  // Even larger for very big screens (reduced from 5xl)
        font-thin
      '>
        USDR launches on July 30th !
      </span>
      <span>
        <img
          src={VectorIcon}
          alt="vector icon"
          className="
            w-4 h-4   // Base icon size for smallest screens
            sm:w-5 sm:h-5 // Small breakpoint icon size
            md:w-6 md:h-6 // Medium breakpoint icon size
            lg:w-7 lg:h-7 // Large breakpoint icon size
            xl:w-8 xl:h-8 // Extra large breakpoint icon size
          "
        />
      </span>
        <span className='
        text-[11px]    // Slightly smaller base font size for smallest screens (e.g., 11px)
        sm:text-xs    // Small breakpoint font size (e.g., 12px)
        md:text-sm    // Medium breakpoint font size (e.g., 14px)
        lg:text-base  // Large breakpoint font size (e.g., 16px)
        xl:text-lg    // Extra large breakpoint font size (e.g., 18px)
        2xl:text-4xl  // Even larger for very big screens (reduced from 5xl)
        font-thin
      '>
        USDR launches on July 30th !
      </span>
      <span>
        <img
          src={VectorIcon}
          alt="vector icon"
          className="
            w-4 h-4   // Base icon size for smallest screens
            sm:w-5 sm:h-5 // Small breakpoint icon size
            md:w-6 md:h-6 // Medium breakpoint icon size
            lg:w-7 lg:h-7 // Large breakpoint icon size
            xl:w-8 xl:h-8 // Extra large breakpoint icon size
          "
        />
      </span>
      <span className='
        text-[11px]
        sm:text-xs
        md:text-sm
        lg:text-base
        xl:text-lg
        2xl:text-4xl
        font-thin
      '>
       USDR launches on July 30th !
      </span>
      <span>
        <img
          src={VectorIcon}
          alt="vector icon"
          className="
            w-4 h-4
            sm:w-5 sm:h-5
            md:w-6 md:h-6
            lg:w-7 lg:h-7
            xl:w-8 xl:h-8
          "
        />
      </span>
      <h2 className="
        text-[11px]
        sm:text-xs
        md:text-sm
        lg:text-base
        xl:text-lg
        2xl:text-4xl
        font-thin
      ">
        USDR launches on July 30th !
        <span className="inline-block align-middle ml-1" style={{ position: "relative", top: "-1px" }}>
          <img
            src={VectorIcon}
            alt="logo"
            className="
              w-4 h-4
              sm:w-5 sm:h-5
              md:w-6 md:h-6
              lg:w-7 lg:h-7
              xl:w-8 xl:h-8
            "
          />
        </span>
      </h2>
      
    </>
  );

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (marqueeElement) {
      const contentWidth = marqueeElement.scrollWidth / 2;

      const speed = 150; // pixels per second (2x faster as per last request)
      const duration = contentWidth / speed; // duration in seconds

      gsap.to(marqueeElement, {
        x: -contentWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(marqueeElement, { x: 0 });
        }
      });
    }

    return () => {
      if (marqueeElement) {
        gsap.killTweensOf(marqueeElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        background: bgColor,
        color: textColor,
        borderColor: borderColor,
        // ...other dynamic styles as needed
      }}
      className='
        bg-[#0b291a] overflow-hidden
      '
    >
      <div
        className="
          relative
          py-1
          sm:py-2
          md:py-3
          lg:py-4
          xl:py-2
          flex items-center justify-center
          transform -rotate-[1.2deg]
          text-white
          font-[Funnel Sans] font-light
          whitespace-nowrap overflow-hidden
          h-10
          lg:h-[85px]
        "
        style={{
          background: "rgba(6, 78, 46, 1)",
          opacity: "0.9",
          flexShrink: 0
        }}
      >
        <div
          ref={marqueeRef}
          className="
            absolute top-1 left-1 h-full w-max flex items-center
            space-x-2
            sm:space-x-4
            md:space-x-6
            lg:space-x-8
            xl:space-x-4
          "
          style={{
            willChange: "transform",
            transform:"rotate(0.5deg)"
          }}
        >
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>
    </div>
  );
}

export default LineSection;
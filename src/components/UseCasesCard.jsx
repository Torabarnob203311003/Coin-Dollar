import React, { useState, useRef, useEffect } from 'react';
import BG3 from '/Bg-3.jpg'; // Ensure this path is correct
import usecaseImg from '../assets/usecase1.jpg';
import VectorUsecase from '../assets/vectorusecase.svg';
import RightArrow from '../assets/rightarrow.png';
import Dot from '../assets/dot.svg';
import ShareIcon from '../assets/share.svg';


function UseCasesCard({ bgColor, textColor, borderColor, accent }) {
  // Responsive: show mobile or desktop layout
  const [isMobile, setIsMobile] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const stepsRef = useRef([]);
  const intervalRef = useRef(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 640);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const sections = ['Trade', 'Hold', 'Buy/Sell', 'Transact'];

  // Animation: cycle through sections every 5s unless user interacts
  useEffect(() => {
    // Always start with 'Hold' in focus
    if (activeSection === null) setActiveSection('Hold');
    if (userInteractedRef.current) return;

    import('gsap').then(gsap => {
      intervalRef.current = setInterval(() => {
        setActiveSection(prev => {
          const idx = sections.indexOf(prev);
          return sections[(idx + 1) % sections.length];
        });
      }, 5000);
    });

    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [activeSection]);

  // Pause animation on user click
  const handleSectionClick = (section) => {
    userInteractedRef.current = true;
    clearInterval(intervalRef.current);
    setActiveSection(section);
  };

  // Don't render until isMobile is determined

  // Desktop background lazy-load hooks must be outside of any conditionals!
  const [bgLoaded, setBgLoaded] = useState(false);
  useEffect(() => {
    const img = new window.Image();
    img.src = BG3;
    img.onload = () => setBgLoaded(true);
  }, []);

  if (isMobile === null) return null;

  // --- MOBILE LAYOUT ---
  if (isMobile) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex flex-col items-center justify-center font-inter overflow-hidden"
      >
        {/* Card Section */}
        <div
          className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 rounded-2xl p-6 text-white relative overflow-hidden flex flex-col w-full max-w-md mb-8"
          style={{
            borderRadius: "24px",
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.62) 100%), url(${usecaseImg}) lightgray 50% / cover no-repeat`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "320px",
          }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-700 rounded-full opacity-20 -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-600 rounded-full opacity-20 translate-y-8 -translate-x-8"></div>
          {/* Header with arrow */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold leading-tight">Our Use</h2>
              <span className="inline-flex items-center mt-1 text-3xl font-bold leading-tight">
                <img src={VectorUsecase} alt="" style={{ marginRight: "8px" }} />
                Cases
              </span>
            </div>
            <img src={RightArrow} alt="right arrow" width={28} height={28} />
          </div>
          {/* Description */}
          <div className="mb-6 ">
            <p
              className="text-base"
              style={{
                color: "#D2D4D7",
                fontFamily: "Funnel Sans",
                fontWeight: 300,
                lineHeight: "120%"
              }}
            >
              All <span
                style={{
                  color: "#D2D4D7",
                  fontFamily: "Funnel Sans",
                  fontWeight: 600,
                  lineHeight: "140%"
                }}
              ></span>transactions are fast and secure on multiple blockchains.
            </p>
            {/* <p
              className="text-xs opacity-80 mt-2"
              style={{
                color: "#D2D4D7",
                fontFamily: "Funnel Sans",
                fontWeight: 300,
                lineHeight: "140%"
              }}
            >
              Experience seamless transactions with our advanced blockchain technology.
            </p> */}
          </div>
          {/* Dots and tags */}
          <div className="flex items-center justify-between mt-auto">
            <img
              src={Dot}
              alt="dot"
              style={{
                width: "60px",
                height: "10px",
                flexShrink: 0
              }}
            />
            <div className="flex space-x-4 ml-4 items-center">
              <span className="text-xs font-semibold text-zinc-300 border border-gray-300 rounded-full px-3 py-0.5">Exchange</span>
              <span className="text-xs text-zinc-300 border border-gray-300 rounded-full px-3 py-0.5">Stable</span>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  flexShrink: 0,
                  borderRadius: "100px",
                  border: "1px solid #FFF",
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(24px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={ShareIcon}
                  alt="share"
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "100px"
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        {/* Steps/Sections below the card, with gap */}
        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Hold Section */}
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div
                className="w-4 h-4 rounded-full bg-green-400 shadow-lg"
                style={{ cursor: "pointer" }}
              ></div>
            </div>
            <div>
              <h3
                className="text-3xl font-medium mb-2 text-white"
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  lineHeight: "120%",
                }}
              >
                Hold *
              </h3>
              {/* <p
                style={{
                  color: "#FFF",
                  fontFamily: "Funnel Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 200,
                  lineHeight: "140%"
                }}
                className="leading-relaxed"
              >
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of
              </p> */}
            </div>
          </div>
        </div>
        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-3 h-3 bg-white rounded-full opacity-70"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
        <style>
          {`
            .min-h-screen::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>
    );
  }

  // --- DESKTOP LAYOUT ---
  // Lazy load BG3 image for desktop background
  // Fix: If bgLoaded is false, still render the content (just no background image)
  // const [bgLoaded, setBgLoaded] = useStateReact(false);
  // useEffect(() => {
  //   const img = new window.Image();
  //   img.src = BG3;
  //   img.onload = () => setBgLoaded(true);
  // }, []);
  return (
    <div
      className="relative min-h-screen flex flex-row items-center justify-center"
      style={{
        backgroundImage: bgLoaded ? `url(${BG3})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+,
        filter: "brightness(1.45) contrast(1.15)",
        //width: "100vw",
        height: "100vh",
        padding: "112px", // Add padding around the main div
        boxSizing: "border-box",
        gap: "180px" // Add gap between the two main divs
      }}
    >
    
      {/* Card Section */}
      <div
        className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 rounded-2xl ms-40  p-10 text-white relative overflow-hidden flex flex-col"
        style={{
          flex: 1,
          minHeight: "100%",
          minWidth: "700px",
        
          flexShrink: 0,
          borderRadius: "40px",
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.62) 100%), url(${usecaseImg}) lightgray 50% / cover no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginBottom: "24px" // Add margin to bottom of card section
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-700 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-600 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>

        {/* Header with arrow */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Our Use
            </h2>
            <span className="inline-flex items-center mt-2 text-4xl font-bold leading-tight">
              <img src={VectorUsecase} alt="" style={{ marginRight: "8px" }} />
              Cases
            </span>
          </div>
          <img src={RightArrow} alt="right arrow" width={32} height={32} />
        </div>

        {/* Description */}
        <div className="mb-28 space-y-4 mt-96">
          <p
            className="leading-relaxed text-sm"
            style={{
              color: "#D2D4D7",
              fontFamily: "Funnel Sans",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "140%"
            }}
          >
            All <span
              style={{
                color: "#D2D4D7",
                fontFamily: "Funnel Sans",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "140%"
              }}
            >DollarCoin</span>   fast and secure on multiple blockchains.
          </p>
          {/* <p
            className="text-xs opacity-80"
            style={{
              color: "#D2D4D7",
              fontFamily: "Funnel Sans",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "140%"
            }}
          >
            Experience seamless transactions with our advanced blockchain technology.
          </p> */}
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-8 left-8 right-8">
          {/* Dots indicator and tab navigation in a row */}
          <div className="flex items-center justify-between mb-6">
            <img
              src={Dot}
              alt="dot"
              style={{
                width: "86px",
                height: "14px",
                flexShrink: 0
              }}
            />
            <div className="flex space-x-8 ml-6 items-center">
              <span className="text-sm font-semibold text-zinc-300 border border-gray-300 rounded-full px-4 py-1">Exchange</span>
              <span className="text-sm text-zinc-300 border border-gray-300 rounded-full px-4 py-1">Stable</span>
              <span
                style={{
                  width: "57px",
                  height: "57px",
                  flexShrink: 0,
                  borderRadius: "100px",
                  border: "1px solid #FFF",
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(42.75px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src={ShareIcon}
                  alt="share"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "100px"
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps/Sections beside the card */}
      <div
        className="relative flex flex-col justify-center space-y-8  text-left"
        style={{
          flex: 1,
          minHeight: "100%",
          minWidth: 0
        }}
      >
        {/* Steps */}
        <div
          className="flex items-start space-x-4"
          ref={el => stepsRef.current[0] = el}
          data-section="Trade"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${activeSection === 'Trade' ? 'bg-green-400 shadow-lg' : 'bg-gray-600'}`}
              onClick={() => handleSectionClick('Trade')}
              style={{ cursor: "pointer" }}
            ></div>
            <div className="w-px h-12 bg-gray-600 mt-2"></div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleSectionClick('Trade')}
            style={
              activeSection === 'Hold'
                ? { opacity: 0.4, color: '#9ca3af' } // gray-400
                : {}
            }
          >
            <h3
              className={`text-xl font-medium ${activeSection === 'Trade' ? 'text-white' : 'text-gray-500'}`}
              style={
                activeSection === 'Trade'
                  ? {
                      color: "#FFF",
                      fontFamily: "Funnel Sans",
                      fontSize: "70px",
                      fontStyle: "normal",
                      fontWeight: 300,
                      lineHeight: "120%",
                    }
                  : {}
              }
            >
              Trade{activeSection === 'Trade' && ' *'}
            </h3>
            {/* {activeSection === 'Trade' && (
              <p
                style={{
                  color: "#FFF",
                  fontFamily: "Funnel Sans",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "140%"
                }}
                className="leading-relaxed max-w-xs"
              >
                Trade DollarCoin seamlessly on our platform with real-time pricing, deep liquidity, and secure order execution. Enjoy low fees and instant settlement for all your trading needs.
              </p>
            )} */}
          </div>
        </div>
        <div
          className="flex items-start space-x-4"
          ref={el => stepsRef.current[1] = el}
          data-section="Hold"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${activeSection === 'Hold' ? 'bg-green-400 shadow-lg' : 'bg-gray-600'}`}
              onClick={() => handleSectionClick('Hold')}
              style={{ cursor: "pointer" }}
            ></div>
            <div className="w-px h-12 bg-gray-600 mt-2"></div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleSectionClick('Hold')}
            // No opacity change for Hold when focused
          >
            <h3
              className={`text-xl font-medium mb-2 ${activeSection === 'Hold' ? 'text-white' : 'text-gray-400'}`}
              style={
                activeSection === 'Hold'
                  ? {
                      color: "#FFF",
                      fontFamily: "Funnel Sans",
                      fontSize: "70px",
                      fontStyle: "normal",
                      fontWeight: 300,
                      lineHeight: "120%",
                    }
                  : {}
              }
            >
              Hold{activeSection === 'Hold' && ' *'}
            </h3>
            {/* {activeSection === 'Hold' && (
              <p
                style={{
                  color: "#FFF",
                  fontFamily: "Funnel Sans",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 200,
                  lineHeight: "140%"
                }}
                className="leading-relaxed max-w-xs "
              >
                But I must explain to you how all this mistaken idea of 
                denouncing pleasure and praising pain was born and I 
                will give you a complete account of the system, and 
                expound the actual teachings of the great explorer of 
                the truth, the master-builder of
              </p>
            )} */}
          </div>
        </div>
        <div
          className="flex items-start space-x-4"
          ref={el => stepsRef.current[2] = el}
          data-section="Buy/Sell"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${activeSection === 'Buy/Sell' ? 'bg-green-400 shadow-lg' : 'bg-gray-600'}`}
              onClick={() => handleSectionClick('Buy/Sell')}
              style={{ cursor: "pointer" }}
            ></div>
            <div className="w-px h-12 bg-gray-600 mt-2"></div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleSectionClick('Buy/Sell')}
            style={
              activeSection === 'Hold'
                ? { opacity: 0.4, color: '#9ca3af' }
                : {}
            }
          >
            <h3
              className={`text-xl font-medium mb-2 ${activeSection === 'Buy/Sell' ? 'text-white' : 'text-gray-400'}`}
              style={
                activeSection === 'Buy/Sell'
                  ? {
                      color: "#FFF",
                      fontFamily: "Funnel Sans",
                      fontSize: "70px",
                      fontStyle: "normal",
                      fontWeight: 300,
                      lineHeight: "120%",
                    }
                  : {}
              }
            >
              Buy/Sell{activeSection === 'Buy/Sell' && ' *'}
            </h3>
            {/* {activeSection === 'Buy/Sell' && (
              <p
                style={{
                  color: "#FFF",
                  fontFamily: "Funnel Sans",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "140%"
                }}
                className="leading-relaxed max-w-xs"
              >
                Execute fast and secure buy or sell orders with competitive rates 
                and instant settlement for all your DollarCoin transactions.
              </p>
            )} */}
          </div>
        </div>
        <div
          className="flex items-start space-x-4"
          ref={el => stepsRef.current[3] = el}
          data-section="Transact"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${activeSection === 'Transact' ? 'bg-green-400 shadow-lg' : 'bg-gray-600'}`}
              onClick={() => handleSectionClick('Transact')}
              style={{ cursor: "pointer" }}
            ></div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleSectionClick('Transact')}
            style={
              activeSection === 'Hold'
                ? { opacity: 0.4, color: '#9ca3af' }
                : {}
            }
          >
            <h3
              className={`text-xl font-medium mb-2 ${activeSection === 'Transact' ? 'text-white' : 'text-gray-400'}`}
              style={
                activeSection === 'Transact'
                  ? {
                      color: "#FFF",
                      fontFamily: "Funnel Sans",
                      fontSize: "70px",
                      fontStyle: "normal",
                      fontWeight: 300,
                      lineHeight: "120%",
                    }
                  : {}
              }
            >
              Send/Receive{activeSection === 'Transact' && ' *'}
            </h3>
            {/* {activeSection === 'Transact' && (
              <p
                style={{
                  color: "#FFF",
                  fontFamily: "Funnel Sans",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "140%"
                }}
                className="leading-relaxed max-w-xs"
              >
                Send and receive DollarCoin instantly with minimal fees 
                across our secure blockchain network worldwide.
              </p>
            )} */}
          </div>
        </div>
      </div>
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .min-h-screen::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default UseCasesCard;


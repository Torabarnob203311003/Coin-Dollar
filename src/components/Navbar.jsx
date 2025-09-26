import logo from "../../public/Footer.svg";
import Moon from "../assets/Moon.svg";
import { useState, useEffect } from "react";
//import Loginfrom from "./Loginfrom";

function WorldIcon(props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
    </svg>
  );
}

function ThemeToggle() {
  return (
    <div
      className="relative flex items-center justify-center gap-2 px-2 py-1"
      style={{
        width: "95px",
        height: "47px",
        flexShrink: 0,
        borderRadius: "100.528px",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(76.45px)",
        overflow: "visible",
      }}
    >
      <div
        // style={{
        //   position: "absolute",
        //   left: "-40%",
        //   top: "-90%",
        //   transform: "translate(-50%, -50%)",
        //   width: 400,
        //   height: 400,
        //   borderRadius: "617px",
        //   opacity: 10.7,
        //   background:
        //     "linear-gradient(180deg, rgba(0, 120, 67, 0.85) 0%, rgba(0, 120, 67, 0.00) 100%)",
        //   filter: "blur(32px)",
        //   zIndex: 0,
        //   pointerEvents: "none",
        // }}
      />
      {/* <div className="relative flex items-center gap-2 z-10">
        <button
          onClick={() => setTheme("light")}
          className={`p-2 border-none outline-none flex items-center justify-center transition-all duration-300 ${
            theme === "light" ? "theme-btn-active" : "theme-btn-inactive"
          }`}
          aria-label="Light mode"
          style={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: "50%",
            background:
              theme === "light"
                ? "linear-gradient(135deg, rgba(27, 174, 108, 0.53) 4.72%, rgba(7, 88, 52, 0.53) 79.2%)"
                : "transparent",
          }}
        >
          <img
            src={Sun}
            alt="Light mode"
            width={24}
            height={24}
            style={{
              flexShrink: 0,
              transition: "transform 0.3s, opacity 0.3s",
              transform: theme === "light" ? "rotate(0deg)" : "rotate(-90deg)",
              opacity: theme === "light" ? 1 : 0.5,
            }}
          />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 border-none outline-none flex items-center justify-center transition-all duration-300 ${
            theme === "dark" ? "theme-btn-active" : "theme-btn-inactive"
          }`}
          aria-label="Dark mode"
          style={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: "50%",
            background:
              theme === "dark"
                ? "linear-gradient(135deg, rgba(27, 174, 108, 0.53) 4.72%, rgba(7, 88, 52, 0.53) 79.2%)"
                : "transparent",
          }}
        >
          <img
            src={Moon}
            alt="Dark mode"
            width={24}
            height={24}
            style={{
              flexShrink: 0,
              transition: "transform 0.3s, opacity 0.3s",
              transform: theme === "dark" ? "rotate(0deg)" : "rotate(90deg)",
              opacity: theme === "dark" ? 1 : 0.5,
            }}
          />
        </button>
      </div> */}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  // const [showLogin, setShowLogin] = useState(false); // Log In functionality commented out

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <nav
        className={`w-full flex flex-wrap items-center justify-between px-4 md:px-10 font-[300] text-[18px] mt-3 md:mt-5 mb-6 md:mb-0 text-white min-h-[65px] transition-all duration-700 ${
          show ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-90 blur-md"
        }`}
        style={{
          fontFamily: "Funnel Sans",
          fontStyle: "normal",
          lineHeight: "normal",
        }}
      >
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={logo}
            alt="DollarCoin Logo"
            className="h-8 md:h-12 w-auto max-w-[48px] md:max-w-[60px] object-contain"
          />
          <span className="text-lg md:text-2xl font-light truncate">
            DollarCoin
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-center flex-wrap">
          <a
            href="#about"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 hover:bg-green-600/10 transition-all duration-200 text-sm md:text-base"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
            What is DollarCoin?
          </a>
          <a
            href="#usecases"
            className="flex items-center justify-center px-4 py-2 rounded-full border border-white/10 hover:bg-green-600/10 transition-all duration-200 text-sm md:text-base"
          >
            Use Cases
          </a>
          <a
            href="https://blockfinex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 rounded-full border border-white/10 hover:bg-green-600/10 transition-all duration-200 text-sm md:text-base"
          >
            Buy DollarCoin
          </a>
          {/* 
          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
            }}
            className="flex items-center justify-center px-7 py-2 rounded-full border border-green-800 text-white hover:bg-green-700/20 transition-all duration-200 text-sm md:text-base min-w-[120px] text-center"
          >
            Log In
          </a>
          */}
        </div>

        {/* Desktop Right: Theme, Language, Contact Us */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-2 px-2 py-1">
            <WorldIcon className="text-white" />
            <select className="bg-transparent text-white font-[300] focus:outline-none">
              <option value="en">En</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <a
            href="#contact"
            className="flex items-center justify-center px-7 py-2 rounded-full border border-green-800 text-white hover:bg-green-700/20 transition-all duration-200 text-sm md:text-base min-w-[120px] text-center"
          >
            <span className="flex items-center gap-2">
              Contact Us
              <span
                className="inline-flex items-center justify-center rounded-full p-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(27, 174, 108, 0.53) 4.72%, rgba(7, 88, 52, 0.53) 79.2%)",
                  backdropFilter: "blur(8.25px)",
                }}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-4-4 4 4-4 4"
                  />
                </svg>
              </span>
            </span>
          </a>
        </div>

        {/* Mobile: Hamburger + Theme */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 flex flex-col justify-center items-center w-10 h-10"
            aria-label="Open menu"
          >
            <span className="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-white rounded"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-start bg-black/80 lg:hidden transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-90 invisible pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-green-500 text-3xl"
          aria-label="Close menu"
        >
          &times;
        </button>
        <div className="flex flex-col gap-4 bg-[#0A0A0A] p-8 mt-16 rounded-t-3xl shadow-lg w-full max-w-xs mx-auto">
          <a
            href="#about"
            className="text-white text-base py-3 rounded-full border border-green-500 flex items-center justify-center hover:bg-green-600/10 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            What is DollarCoin?
          </a>
          <a
            href="#usecases"
            className="text-white text-base py-3 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-600/10 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Use Cases
          </a>
          <a
            href="https://blockfinex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-base py-3 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-600/10 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Buy DollarCoin
          </a>
          {/* 
          <a
            href="#login"
            className="text-white text-base py-3 rounded-full border border-green-800 flex items-center justify-center hover:bg-green-700/20 transition-all"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => setShowLogin(true), 300); // Wait for menu to close
            }}
          >
            Log In
          </a>
          */}
          <a
            href="#contact"
            className="text-white text-base py-3 rounded-full border border-green-800 flex items-center justify-center hover:bg-green-700/20 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              Contact Us
              <span
                className="inline-flex items-center justify-center rounded-full p-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(27, 174, 108, 0.53) 4.72%, rgba(7, 88, 52, 0.53) 79.2%)",
                  backdropFilter: "blur(8.25px)",
                }}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-4-4 4 4-4 4"
                  />
                </svg>
              </span>
            </span>
          </a>
          <div className="flex items-center gap-2 px-2 py-1 mt-4">
            <WorldIcon className="text-white" />
            <select className="bg-transparent text-white font-[300] focus:outline-none">
              <option value="en">En</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {/*
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-lg mx-auto">
            <button
              className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-green-600 z-10"
              onClick={() => setShowLogin(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <Loginfrom onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
      */}
    </>
  );
}

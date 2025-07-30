import logo from "../../public/Footer.svg";
import Moon from "../assets/Moon.svg";
//wimport { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

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
//  const { theme, setTheme } = useTheme();
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

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <nav
        className={`w-full flex items-center justify-between px-4 md:px-10 font-[300] text-[18px] lg:mt-5 lg:mb-0 mb-20 text-white min-h-[65px] transition-all duration-700 ${
          show ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-90 blur-md"
        }`}
        style={{
          fontFamily: "Funnel Sans",
          fontStyle: "normal",
          lineHeight: "normal",
        }}
      >
        <div className="flex items-center gap-4  ">
          <img
            src={logo}
            alt="DollarCoin Logo"
            className="h-10 md:h-54  "
          />
          <span className="text-2xl md:text-4xl font-light">DollarCoin</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="#about"
            className="flex items-center gap-2 px-4 py-3"
            style={{
              fontFamily: "Funnel Sans",
              borderRadius: "100.528px",
              border: "1px solid #1BAE6C",
              backdropFilter: "blur(76.45px)",
              width: "230px",
              height: "47px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse"
              style={{ marginRight: "8px" }}
            ></span>
            What is DollarCoin?
          </a>
          <a
            href="#usecases"
            className="flex items-center justify-center h-[47px] min-w-[148px] px-0 py-0 hover:underline"
            style={{
              borderRadius: "100.528px",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(76.45px)",
              flexShrink: 0,
              whiteSpace: "nowrap",
              textAlign: "center",
              transition: "text-decoration-color 0.3s",
              textDecorationColor: "#1BAE6C",
              textUnderlineOffset: "6px",
            }}
          >
            Use Cases
          </a>
          <a
            href="https://blockfinex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-[47px] min-w-[148px] px-6 py-0 hover:underline"
            style={{
              borderRadius: "100.528px",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(76.45px)",
              flexShrink: 0,
              whiteSpace: "nowrap",
              textAlign: "center",
              letterSpacing: "0.04em",
              transition: "text-decoration-color 0.3s",
              textDecorationColor: "#1BAE6C",
              textUnderlineOffset: "6px",
            }}
          >
            Buy DollarCoin
          </a>
        </div>

        {/* Desktop Right: Theme, Language, Contact */}
        <div className="hidden md:flex items-center gap-8">
          <ThemeToggle />
          <div className="flex items-center gap-2 px-6 py-3">
            <WorldIcon className="text-white" />
            <select className="bg-transparent text-white font-[300] focus:outline-none">
              <option value="en">En</option>
              <option value="fr">FR</option>
            </select>
          </div>
          <a
            href="#contact"
            className="flex items-center gap-2 hover:underline rounded-full px-7 py-3 whitespace-nowrap"
            style={{
              color: "#F2F2F3",
              borderRadius: "100.528px",
              border: "1px solid #036E47",
              backdropFilter: "blur(76.45px)",
              width: "173px",
              height: "47px",
              flexShrink: 0,
            }}
          >
            <span className="flex items-center w-full justify-between">
              <span style={{ marginRight: "18px" }}>Contact Us</span>
              <span
                className="inline-flex items-center justify-center rounded-full p-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(27, 174, 108, 0.53) 4.72%, rgba(7, 88, 52, 0.53) 79.2%)",
                  backdropFilter: "blur(8.25px)",
                }}
              >
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
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

        {/* Mobile: Toggle + Theme */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 flex flex-col justify-center items-center w-10 h-10"
          >
            <span className="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-white mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-white rounded"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu (Animated) */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-start  bg-black/70 md:hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-90 invisible"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-green-500 text-3xl"
        >
          &times;
        </button>
        <div className="flex flex-col gap-6 bg-[#0A0A0A]  p-10">
          <a
            href="#about"
            className="text-white text-xl"
            onClick={() => setMenuOpen(false)}
          >
            What is DollarCoin?
          </a>
          <a
            href="#usecases"
            className="text-white text-xl hover:underline"
            style={{
              textDecorationColor: "#1BAE6C",
              textUnderlineOffset: "6px",
              transition: "text-decoration-color 0.3s",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Use Cases
          </a>
          <a
            href="https://blockfinex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl hover:underline"
            style={{
              textDecorationColor: "#1BAE6C",
              textUnderlineOffset: "6px",
              transition: "text-decoration-color 0.3s",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Buy DollarCoin
          </a>
          <a
            href="#contact"
            className="text-white text-xl"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
}

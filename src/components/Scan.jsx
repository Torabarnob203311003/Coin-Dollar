import React from "react";
import FooterLogo from "../assets/footer2.svg";
import AppleSvg from "../assets/apple.svg";
import GoogleSvg from "../assets/goggle.svg";
import QrCodeSvg from "../assets/qr.svg";

// Placeholder icons (replace with your own assets if available)
const CoinsAppIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="18" fill="#1de9b6" />
    <path d="M12 18h12M12 22h12M12 14h12" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

// const avatars = [
//   "https://randomuser.me/api/portraits/men/32.jpg",
//   "https://randomuser.me/api/portraits/women/44.jpg",
//   "https://randomuser.me/api/portraits/men/45.jpg",
//   "https://randomuser.me/api/portraits/women/46.jpg"
// ];

function Scan({ bgColor, textColor, borderColor,  }) {
  return (
    <div
      style={{
        background: bgColor,
        color: textColor,
        borderColor: borderColor,
        // ...other dynamic styles as needed
      }}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0c1813] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12"
    >
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center pt-7 pb-32 md:pb-16 lg:pb-0">
        <h1
          className="text-white text-center font-[Funnel Sans] font-light mb-6
                     text-4xl leading-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight lg:text-[100px] lg:leading-[100px]"
          style={{
            fontFamily: "Funnel Sans",
            fontWeight: 300,
            color: "#fff",
            maxWidth: "100%",
            overflowWrap: "break-word",
          }}
        >
          Gets <span className="inline-flex items-center gap-1 sm:gap-2">
            DollarCoin
            <img
              src={FooterLogo}
              alt="Footer Logo"
              className="w-16 h-16 mt-2 sm:w-20 sm:h-20 sm:mt-3 md:w-24 md:h-24 lg:w-32 lg:h-32 lg:mt-5 ml-1 sm:ml-2 inline-block align-middle"
              style={{ filter: "drop-shadow(0 0 10px #000) contrast(1.2) brightness(1.2)" }}
            />
          </span>
          <br />
          <span className="inline-flex items-center gap-2 sm:gap-4 mt-4">
            {/* <span
              className="flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full"
              style={{
                width: "auto",
                height: "auto",
                flexShrink: 0,
                borderRadius: "100px",
                background: "linear-gradient(267deg, rgba(96, 96, 96, 0.32) 15.44%, rgba(198, 198, 198, 0.10) 97.33%)",
              }}
            >
              <img
                src={AppleSvg}
                alt="Apple"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <img
                src={GoogleSvg}
                alt="Google"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </span> */}
            <span className="ml-0 text-xl sm:text-2xl md:text-3xl lg:text-[100px]">on Blockfinex</span>
          </span>
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Avatar group (currently empty in original code) */}
        </div>
        <div className="mt-4 sm:mt-16 md:mt-7 w-full">
          {/* <p
            className="text-center mb-8 font-light text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed opacity-50"
            style={{
              width: "100%",
              maxWidth: "750px",
              color: "#FFF",
              fontFamily: "Funnel Sans",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "140%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising <br className="hidden sm:inline" /> pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of...
          </p> */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center items-center w-full px-4">
            <button
              className="text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow transition flex items-center justify-center text-sm sm:text-base"
              style={{
                width: "auto",
                minWidth: "180px",
                height: "auto",
                flexShrink: 0,
                borderRadius: "100.528px",
                border: "1px solid #1BAE6C",
                backdropFilter: "blur(76.45132446289062px)",
              }}
            >
              <span className="flex items-center w-full justify-between whitespace-nowrap">
                <span className="mr-2 sm:mr-4">Get DollarCoin</span>
                <span
                  className="inline-flex items-center justify-center rounded-full p-1"
                  style={{
                    background: "linear-gradient(135deg, rgba(27, 174, 108, 0.53) 4.72%, rgba(7, 88, 52, 0.53) 79.2%)",
                    backdropFilter: "blur(8.25px)"
                  }}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-4-4 4 4-4 4"/>
                  </svg>
                </span>
              </span>
            </button>
            
            {/* <button
              className="text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow transition flex items-center justify-center text-sm sm:text-base"
              style={{
                width: "auto",
                minWidth: "180px",
                height: "auto",
                flexShrink: 0,
                borderRadius: "100.528px",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(76.45132446289062px)",
                background: "transparent"
              }}
            >
              Download Whitepaper
            </button> */}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-2">
        <span className="text-gray-400 text-2xl font-medium">CeFi Compatible</span>
      </div>
      
      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-12">
        Compatible with traditional payments
      </h1>
      
      {/* Payment Methods */}
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl">
        {/* ACH */}
        <div className="flex-1">
          <div className="bg-gray-900 rounded-full px-6 py-3 inline-flex items-center mb-4">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-white font-semibold text-lg">ACH</span>
          </div>
          <p className="text-gray-400 text-base leading-relaxed">
            Mint and Redeem with ACH directly at DollarCoin.
          </p>
        </div>
        
        {/* Wire */}
        <div className="flex-1">
          <div className="bg-gray-900 rounded-full px-6 py-3 inline-flex items-center mb-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full mr-3"></div>
            <span className="text-white font-semibold text-lg">Wire</span>
          </div>
          <p className="text-gray-400 text-base leading-relaxed">
            Support large transactions through wire transfer.
          </p>
        </div>
        
        {/* On-chain */}
        <div className="flex-1">
          <div className="bg-gray-900 rounded-full px-6 py-3 inline-flex items-center mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <span className="text-white font-semibold text-lg">On-chain</span>
          </div>
          <p className="text-gray-400 text-base leading-relaxed">
            Convert into and out of your stablecoin with USDR TO USD.
          </p>
        </div>
      </div>

    
      {/* Bottom Left QR Card */}
      {/* <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 w-11/12 sm:w-auto">
        <div className="bg-[#181f1c] bg-opacity-80 rounded-2xl p-3 sm:p-5 flex flex-row items-center shadow-lg min-w-full sm:min-w-[220px]">
          <div className="flex items-center justify-center flex-shrink-0">
            <img src={QrCodeSvg} alt="QR Code" className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <div className="flex flex-col justify-center ml-3 sm:ml-5 flex-grow">
            <div className="text-white text-base sm:text-lg font-semibold whitespace-nowrap">Scan our QR code</div>
            <div className="text-[#b6eada] text-xs sm:text-sm mt-1">Download on App Store or Google Play.</div>
          </div>
        </div>
      </div> */}
      {/* Bottom Right Social Proof Card - HIDDEN ON MOBILE */}
      {/* <div className="hidden md:block absolute right-4 bottom-4 sm:right-6 sm:bottom-6 bg-[#181f1c] bg-opacity-80 rounded-2xl p-3 sm:p-5 flex flex-col items-start shadow-lg w-11/12 sm:w-auto">
        <div className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">+25k</div>
        <div className="text-[#b6eada] text-xs sm:text-sm mb-1 sm:mb-2">People recommend</div>
        <div className="flex items-center mb-1">
          {avatars.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="avatar"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#232b27] -ml-1 sm:-ml-2 first:ml-0"
              style={{ zIndex: 10 - i }}
            />
          ))}
        </div>
        <div className="text-[#b6eada] text-xs sm:text-sm">They trust, use and enjoy it</div>
      </div> */}
      {/* Optional: background swirl/gradient effect */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse at center, #1de9b622 0%, transparent 70%)"
      }} />
      <br />
    </div>
  );
}

export default Scan;
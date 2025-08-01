import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

function GridSection({ bgColor, textColor, borderColor,  }) {
  const iconRef = useRef(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const triggered = useRef(false);

  useEffect(() => {
    function animate() {
      // Animate mobile cards if visible, otherwise desktop cards
      const grid = document.querySelector('.mobile-grid') || document.querySelector('.desktop-grid');
      if (!grid || triggered.current) return;
      const rect = grid.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        triggered.current = true;
        cardRefs.forEach((ref, i) => {
          if (ref.current) {
            gsap.fromTo(
              ref.current,
              { opacity: 0, scale: 0.85, y: 40 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                delay: 0.15 * i,
                ease: 'power3.out'
              }
            );
          }
        });
        window.removeEventListener("scroll", animate);
      }
    }
    window.addEventListener("scroll", animate, { passive: true });
    animate();
    return () => window.removeEventListener("scroll", animate);
  }, []);

  // Desktop and mobile content
  return (
    <div
      style={{
        background: bgColor,
        color: textColor,
        borderColor: borderColor,
        // ...other dynamic styles as needed
      }}
    >
      {/* Desktop grid (visible on sm and up) */}
      <div className="desktop-grid hidden sm:grid grid-cols-6 grid-rows-6 gap-3">
        
        <div className='w-full h-full col-span-2 row-span-6 col-start-1 row-start-1 relative' ref={cardRefs[0]}>
          <div className="w-full h-[440px] rounded-2xl border border-gray-600 p-6 flex flex-col justify-between relative items-start text-left"
            style={{
              backgroundImage: "url('/fast.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div
              style={{
                width: 27,
                height: 14,
                fontFamily: "Funnel Sans",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "120%",
                letterSpacing: "0%",
                background: "transparent"
              }}
              className="mb-4 text-gray-300"
            >
              
              01.
            </div>
            <div className="flex-1 flex flex-col justify-center items-start mt-52 text-left">
              <h2
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  fontSize: "40px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#fff",
                  background: "transparent",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%",
                }}
                className="mb-4 text-left"
              >
                Fast
              </h2>
              <p
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  fontSize: "20px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  background: "transparent",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%",
                }}
                className="text-left text-gray-300"
              >
                All DirhamCoin transactions are fast and cheap, no matter where you are sending, or spending, your money.
              </p>
            </div>
          </div>
        </div>
 
        <div ref={cardRefs[1]} className="col-span-2 row-span-6 col-start-5 row-start-1">
          <div className="w-full h-full rounded-2xl border border-gray-600 p-6 flex flex-col relative overflow-hidden items-start justify-start text-left">
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full blur-xl transform rotate-45 scale-150"></div>
            </div>
            <img
              ref={iconRef}
              src="/icon.png"
              alt="icon"
              className="absolute z-20"
              style={{
                top: '1rem',
                right: '1rem',
                width: '590px',
                height: '590px',
                transform: 'translate(250px, -240px)',
                transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), top 0.3s, right 0.3s',
                filter: 'brightness(1.1) contrast(2.1)'
              }}
            />
            <div
              style={{
                width: 27,
                height: 14,
                fontFamily: "Funnel Sans",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "120%",
                letterSpacing: "0%",
                background: "transparent"
              }}
              className="relative z-10 mb-4 text-gray-300"
            >
              03.
            </div>
            <div className="flex-1 flex flex-col justify-end relative z-10 items-start text-left">
              <h2
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  fontSize: "40px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#fff",
                  background: "transparent",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%", // Let it fill the card and wrap
                  // Remove fixed width
                }}
                className="mb-4 text-left"
              >
                Secure
              </h2>
              <p
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  fontSize: "20px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  background: "transparent",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%", // Let it fill the card and wrap
                  // Remove any fixed width/height
                }}
                className="text-left text-gray-300"
              >
                 Dollar Coin is a currency, built on 8 public blockchains namely Solana,SUI,Tron,Ethereum,Hype,Polygon,Arbitrum,Binance Smart Chain.
              </p>
            </div>
          </div>
        </div>
        <div ref={cardRefs[2]} className="col-span-2 row-span-2 col-start-1 row-start-5 flex items-start justify-center text-left  rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #03160D 0%, #1BAE6C 100%)"
          }}
        >
          <div className="flex justify-center items-center gap-8 mt-8 pt-11 w-full">
            <div className="items-center justify-center">
              <img
                src="/Footer.svg"
                alt=""
                className="w-[46px] h-[66px] object-contain"
              />
            </div>
            <h1 className="text-[53px] font-normal  text-white">
              DollarCoin
            </h1>
          </div>
        </div>
        <div ref={cardRefs[3]} className="col-span-2 row-span-3 col-start-3 row-start-1">
          <div className="w-full h-full rounded-2xl border border-gray-600 p-6 flex flex-col justify-between relative items-start text-left">
            <div
              style={{
                width: 27,
                height: 14,
                fontFamily: "Funnel Sans",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "120%",
                letterSpacing: "0%",
                background: "transparent"
              }}
              className="mb-4 text-gray-300"
            >
              02.
            </div>
            <div className="flex-1 flex flex-col justify-center items-start mt-36 text-left">
              <h2
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  fontSize: "40px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#fff",
                  background: "transparent",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%", // Let it fill the card and wrap
                  // Remove: width: 180,
                }}
                className="mb-4 text-left"
              >
                Scalable
              </h2>
              <p
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  fontSize: "20px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  background: "transparent",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%", // Let it fill the card and wrap
                  // Remove any fixed width/height
                }}
                className="text-left text-gray-300"
              >
                Dollar Coin will foster an ecosystem of products and services made to help people use digital currency in their everyday lives.
              </p>
            </div>
          </div>
        </div>
        <div className=" col-span-2 row-span-3 col-start-3 row-start-4 flex items-start justify-start text-left">
          <div className="w-full h-full bg-gray-900 rounded-2xl border border-gray-600 p-6 flex flex-col justify-between relative items-start text-left">
            <div
              style={{
                width: 27,
                height: 14,
                fontFamily: "Funnel Sans",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "120%",
                letterSpacing: "0%",
                background: "transparent"
              }}
              className="mb-4  text-gray-300"
            >
              04.
            </div>
            <div className="flex-1 flex flex-col justify-center items-start mt-20 text-left">
              <h2
                style={{
                  width: 120,
                  fontFamily: "Funnel Sans",
                  fontWeight: 300,
                  fontSize: "40px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#fff",
                  background: "transparent",
                  wordBreak: "break-word", // Added
                  overflowWrap: "break-word", // Added
                }}
                className="mb-4 text-left"
              >
                Stable
              </h2>
              <p
                style={{
                  fontFamily: "Funnel Sans",
                  fontWeight: 350,
                  fontSize: "20px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  background: "transparent",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  width: "100%", // Match Scalable section
                  // Remove: width: 414, height: 84,
                }}
                className="text-left text-gray-300"
              >
                Dollar Coin is pegged 1:1 to the US Dollar, which means 1 USDR will always be redeemable for 1 USD. It’s the best of fiat on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile grid (vertical stack, visible below sm) */}
      <div className="mobile-grid flex flex-col gap-8 sm:hidden p-12  w-full max-w-md mx-auto">
        {/* Card 1 */}
        <div
          ref={cardRefs[0]}
          className="rounded-[20px] border border-white border-opacity-50 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-xl p-6"
          style={{
            opacity: 0.5,
          }}
        >
          <p
            style={{
              color: "#D2D4D7",
              fontFamily: "Funnel Sans",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "140%",
            }}
            className="mb-2"
          >
            01.
          </p>
          <h2
            className="text-4xl font-light text-white mb-3"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
            Fast
          </h2>
          <p
            className="text-xl font-semibold text-gray-300 leading-relaxed"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
            All DollarCoin transactions are fast and cheap, no matter where you are sending, or spending, your money.
          </p>
        </div>
        {/* Card 2 */}
        <div
          ref={cardRefs[1]}
          className="rounded-[20px] border border-white border-opacity-50 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-xl p-6"
          style={{
            opacity: 0.5,
          }}
        >
          <p
            style={{
              color: "#D2D4D7",
              fontFamily: "Funnel Sans",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "140%",
            }}
            className="mb-2"
          >
            02.
          </p>
          <h2
            className="text-4xl font-light text-white mb-3"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
            Scalable
          </h2>
          <p
            className="text-xl font-semibold text-gray-300 leading-relaxed"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
            Dollar Coin will foster an ecosystem of products and services made to help people use digital currency in their everyday lives.
          </p>
        </div>
        {/* Card 3 */}
        <div
          ref={cardRefs[2]}
          className="rounded-[20px] border border-white border-opacity-50 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-xl p-6"
          style={{
            opacity: 0.5,
          }}
        >
          <p
            style={{
              color: "#D2D4D7",
              fontFamily: "Funnel Sans",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "140%",
            }}
            className="mb-2"
          >
            03.
          </p>
          <h2
            className="text-4xl font-light text-white mb-3"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
            Secure
          </h2>
          <p
            className="text-xl font-normal text-gray-300 leading-relaxed"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
              Dollar Coin is a currency, built on 8 public blockchains namely Solana,SUI,Tron,Ethereum,Hype, <br /> Polygon, Arbitrum,Binance Smart Chain.
          </p>
        </div>
        {/* Card 4 */}
        <div
          ref={cardRefs[3]}
          className="rounded-[20px] border border-white border-opacity-50 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-xl p-6"
          style={{
            opacity: 0.5,
          }}
        >
          <p
            style={{
              color: "#D2D4D7",
              fontFamily: "Funnel Sans",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "140%",
            }}
            className="mb-2"
          >
            04.
          </p>
          <h2
            className="text-4xl font-light text-white mb-3"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
            Stable
          </h2>
          <p
            className="text-xl font-semibold text-gray-300 leading-relaxed"
            style={{
              wordBreak: "break-word", // Added
              overflowWrap: "break-word", // Added
            }}
          >
            Dollar Coin is pegged 1:1 to the US Dollar, which means 1 USDR will always be redeemable for 1 USD. It’s the best of fiat on the blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GridSection
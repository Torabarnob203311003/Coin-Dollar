import React from 'react';

function Global() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ background: '#000403' }}>
      <div className="w-full max-w-6xl">
        {/* Main heading */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-4">
            The world's largest regulated
            <sup className="text-green-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl">1</sup>
            <br />
            stablecoin powering global finance
          </h1>
        </div>

        {/* Flags container */}
        <div className="backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12 shadow-lg">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {/* USA Flag */}
            <div className="w-16 h-12 sm:w-20 sm:h-15 md:w-24 md:h-18 lg:w-72 lg:h-52 flex-shrink-0">
              <svg viewBox="0 0 120 80" className="w-full h-full rounded shadow-md">
                <rect width="120" height="80" fill="#B22234" />
                <path d="M0,9 h120 M0,18 h120 M0,28 h120 M0,37 h120 M0,46 h120 M0,55 h120 M0,65 h120" stroke="white" strokeWidth="6" />
                <rect width="48" height="43" fill="#3C3B6E" />
                <g fill="white">
                  {[...Array(50)].map((_, i) => {
                    const row = Math.floor(i / 6);
                    const col = i % 6;
                    const offset = row % 2 === 0 ? 0 : 4;
                    return (
                      <circle key={i} cx={6 + col * 8 + offset} cy={5 + row * 5} r="1.5" />
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* United States section */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-bold text-white text-center mb-4 sm:mb-6">
            United States
          </h2>
          <p className="text-sm sm:text-base md:text-2xl text-white text-center leading-relaxed max-w-4xl mx-auto px-4">
            Money transmitter licenses (MTL) in 46 states, the District of Columbia, and Puerto Rico.
           . Registered
            as a "Money Services Business" with Financial Crimes Enforcement Network (FinCEN)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Global;

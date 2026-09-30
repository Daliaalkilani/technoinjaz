import React from 'react';

/**
 * TeLoader - Pre-rendered Rocket Loader DOM structure.
 * Placed at the top of <body> in RootLayout so that on the first visit to '/',
 * the loader background (#030508) and rocket artwork cover the screen immediately
 * on the first paint, completely eliminating any flash of the homepage.
 */
export const TeLoader: React.FC = () => {
  return (
    <div id="te-loader" data-phase="idle" suppressHydrationWarning>
      <canvas id="space" aria-hidden="true" />
      <div className="ambient" aria-hidden="true" />
      <main className="loader-container">
        <div className="stage" id="stage">
          <div className="orbit-system" aria-hidden="true">
            <svg className="orbit-static" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#25ddc2" stopOpacity=".4" />
                  <stop offset=".52" stopColor="#25ddc2" stopOpacity=".02" />
                  <stop offset="1" stopColor="#7561ed" stopOpacity=".3" />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="184" fill="none" stroke="url(#orbit-grad)" strokeWidth=".8" />
              <circle cx="200" cy="200" r="153" fill="none" stroke="#729096" strokeOpacity=".14" strokeWidth=".7" strokeDasharray="2 10" />
              <path d="M200 4v9m0 374v9M4 200h9m374 0h9" stroke="#6b9c9d" strokeWidth="1" strokeOpacity=".45" />
            </svg>
            <svg className="orbit-rotating" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="184" stroke="none" fill="none" />
              <path d="M53 89A184 184 0 0 1 144 25" stroke="#21d9bf" strokeOpacity=".6" fill="none" strokeWidth="1.3" />
              <circle cx="144" cy="25" r="3" fill="#52ebd3" />
              <path d="M335 325A184 184 0 0 1 252 376" stroke="#7262d5" strokeOpacity=".7" fill="none" strokeWidth="1" />
              <circle cx="252" cy="376" r="2" fill="#8c7af0" />
            </svg>
          </div>
          <div className="launch-floor" aria-hidden="true"><div /><span /></div>
          <div className="cruise-halo" aria-hidden="true" />

          <div className="rocket-anchor" id="rocket-anchor">
            <div className="rocket" id="rocket">
              <div className="rocket-backlight" aria-hidden="true" />
              <div className="engine engine-center" id="engine-center" aria-hidden="true">
                <div className="engine-aura" />
                <div className="engine-plume" />
                <div className="engine-core" />
              </div>
              <div className="engine engine-left" aria-hidden="true">
                <div className="engine-plume" />
                <div className="engine-core" />
              </div>
              <div className="engine engine-right" aria-hidden="true">
                <div className="engine-plume" />
                <div className="engine-core" />
              </div>
              <img
                className="rocket-body"
                src="/loader/assets/rocket-body.webp"
                width={1915}
                height={2048}
                alt="شعار تكنو إنجاز"
                draggable={false}
              />
              <div className="logo-core" id="launch-button" aria-hidden="true">
                <img className="button-art" src="/loader/assets/launch-button.webp" alt="" draggable={false} />
                <svg className="charge-gauge" viewBox="0 0 100 100" aria-hidden="true">
                  <circle className="gauge-track" cx="50" cy="50" r="46" fill="none" />
                  <circle className="gauge-fill" id="gauge-fill" cx="50" cy="50" r="46" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="sr-only" id="announcer" aria-live="polite" aria-atomic="true" />
      </main>
    </div>
  );
};

export default TeLoader;

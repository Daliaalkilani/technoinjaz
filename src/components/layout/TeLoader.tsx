import React from 'react';

/**
 * TeLoader - Pre-rendered Rocket Loader DOM structure.
 * Placed at the top of <body> in RootLayout so that on the first visit to '/',
 * the loader background (#030508) and rocket artwork cover the screen immediately
 * on the first paint, completely eliminating any flash of the homepage.
 * Rendered with dangerouslySetInnerHTML so that imperative mutations from /loader/loader.js
 * (such as canvas size, rocket transforms, and gauge offsets) do not trigger React hydration mismatches.
 */
const LOADER_HTML = `
  <canvas id="space" aria-hidden="true"></canvas>
  <div class="ambient" aria-hidden="true"></div>
  <main class="loader-container">
    <div class="stage" id="stage">
      <div class="orbit-system" aria-hidden="true">
        <svg class="orbit-static" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#25ddc2" stop-opacity=".4"></stop>
              <stop offset=".52" stop-color="#25ddc2" stop-opacity=".02"></stop>
              <stop offset="1" stop-color="#7561ed" stop-opacity=".3"></stop>
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="184" fill="none" stroke="url(#orbit-grad)" stroke-width=".8"></circle>
          <circle cx="200" cy="200" r="153" fill="none" stroke="#729096" stroke-opacity=".14" stroke-width=".7" stroke-dasharray="2 10"></circle>
          <path d="M200 4v9m0 374v9M4 200h9m374 0h9" stroke="#6b9c9d" stroke-width="1" stroke-opacity=".45"></path>
        </svg>
        <svg class="orbit-rotating" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="184" stroke="none" fill="none"></circle>
          <path d="M53 89A184 184 0 0 1 144 25" stroke="#21d9bf" stroke-opacity=".6" fill="none" stroke-width="1.3"></path>
          <circle cx="144" cy="25" r="3" fill="#52ebd3"></circle>
          <path d="M335 325A184 184 0 0 1 252 376" stroke="#7262d5" stroke-opacity=".7" fill="none" stroke-width="1"></path>
          <circle cx="252" cy="376" r="2" fill="#8c7af0"></circle>
        </svg>
      </div>
      <div class="launch-floor" aria-hidden="true"><div></div><span></span></div>
      <div class="cruise-halo" aria-hidden="true"></div>

      <div class="rocket-anchor" id="rocket-anchor">
        <div class="rocket" id="rocket">
          <div class="rocket-backlight" aria-hidden="true"></div>
          <div class="engine engine-center" id="engine-center" aria-hidden="true">
            <div class="engine-aura"></div>
            <div class="engine-plume"></div>
            <div class="engine-core"></div>
          </div>
          <div class="engine engine-left" aria-hidden="true">
            <div class="engine-plume"></div>
            <div class="engine-core"></div>
          </div>
          <div class="engine engine-right" aria-hidden="true">
            <div class="engine-plume"></div>
            <div class="engine-core"></div>
          </div>
          <img
            class="rocket-body"
            src="/loader/assets/rocket-body.webp"
            width="1915"
            height="2048"
            alt="شعار تكنو إنجاز"
            draggable="false"
          />
          <div class="logo-core" id="launch-button" aria-hidden="true">
            <img class="button-art" src="/loader/assets/launch-button.webp" alt="" draggable="false" />
            <svg class="charge-gauge" viewBox="0 0 100 100" aria-hidden="true">
              <circle class="gauge-track" cx="50" cy="50" r="46" fill="none"></circle>
              <circle class="gauge-fill" id="gauge-fill" cx="50" cy="50" r="46" fill="none"></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="sr-only" id="announcer" aria-live="polite" aria-atomic="true"></div>
  </main>
`;

export const TeLoader: React.FC = () => {
  return (
    <div
      id="te-loader"
      data-phase="idle"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: LOADER_HTML }}
    />
  );
};

export default TeLoader;

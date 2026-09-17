import React from 'react';
import './SocialButtons.css';

/**
 * مكون أيقونات التواصل الاجتماعي (LinkedIn, GitHub, Email)
 * مستوحى ومطابق لتأثير التصميم المطلوب مع حركة ظهور التدرج اللوني عند التمرير
 */
export default function SocialButtons({ socials = {}, size = 'medium' }) {
  const { linkedin, github, email } = socials;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`social-buttons-wrapper ${size}`} onClick={handleClick}>
      {/* أيقونة LinkedIn */}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn linkedin"
          title="LinkedIn"
          aria-label="LinkedIn"
          onClick={handleClick}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.65.74-1.65 1.65s.74 1.65 1.65 1.65 1.65-.74 1.65-1.65-.74-1.65-1.65-1.65Z" />
          </svg>
        </a>
      )}

      {/* أيقونة GitHub */}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn github"
          title="GitHub"
          aria-label="GitHub"
          onClick={handleClick}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
            />
          </svg>
        </a>
      )}

      {/* أيقونة Email */}
      {email && (
        <a
          href={email.startsWith('mailto:') ? email : `mailto:${email}`}
          className="social-btn email"
          title={`Email: ${email}`}
          aria-label="Email"
          onClick={handleClick}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>
      )}
    </div>
  );
}

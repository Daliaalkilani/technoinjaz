/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          mint: '#0AEEC3',
          'turq-light': '#14DEC2',
          turq: '#1FCDC1',
          teal: '#26BFBE',
          'teal-deep': '#2FB0BE',
          'teal-blue': '#399FBE',
          steel: '#428EC0',
          slate: '#4E7FBD',
          indigo: '#5A6CBC',
          violet: '#5D54F2',
          aqua: '#14BCA3',
          'ring-right': '#5361E8',
          'ring-left': '#15BAA5'
        }
      },
      fontFamily: {
        display: ['Outfit', 'Cairo', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'IBM Plex Sans Arabic', 'Readex Pro', 'sans-serif']
      }
    }
  }
};

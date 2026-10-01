/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Cosmic Navy palette ──────────────────────
        cosmic: {
          950: '#050714',
          900: '#090d1f',
          800: '#0e1530',
          700: '#141d42',
          600: '#1c2654',
        },
        // ── Gold accents ─────────────────────────────
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // ── Celestial purple ─────────────────────────
        celestial: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        // ── Stardust (muted light) ───────────────────
        stardust: {
          100: '#f0f0ff',
          200: '#dcdcf5',
          300: '#b8b8d8',
          400: '#8888aa',
          500: '#555577',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #050714 0%, #090d1f 50%, #141d42 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
        'celestial-gradient': 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'star-field': "radial-gradient(ellipse at top, #1c2654 0%, #050714 70%)",
      },
      boxShadow: {
        'gold-sm': '0 0 10px rgba(251,191,36,0.2)',
        'gold-md': '0 0 20px rgba(251,191,36,0.3)',
        'gold-lg': '0 0 40px rgba(251,191,36,0.4)',
        'cosmic': '0 8px 32px rgba(5,7,20,0.8)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(251,191,36,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(251,191,36,0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

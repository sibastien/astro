/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep obsidian / charcoal cinematic palette
        space: {
          950: '#060709',
          900: '#0b0c11',
          850: '#101218',
          800: '#151720',
          700: '#1e212d',
          600: '#2b2f40',
        },
        // Restrained luxury accent: Electric Indigo & Violet
        accent: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#818cf8',
          600: '#6366f1',
          700: '#4f46e5',
        },
        // Cool electric blue for precision metrics
        cyanic: {
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        // Crisp editorial typography shades
        paper: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
        },
        // Backward compatibility mappings so existing components don't crash
        cosmic: {
          950: '#060709',
          900: '#0b0c11',
          800: '#151720',
          700: '#1e212d',
          600: '#2b2f40',
        },
        stardust: {
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
        gold: {
          300: '#c4b5fd',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        celestial: {
          400: '#a78bfa',
          500: '#818cf8',
          600: '#6366f1',
          700: '#4f46e5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'subtle-radial': 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.08) 0%, rgba(6, 7, 9, 0) 70%)',
        'subtle-glow': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'glow-accent': '0 0 24px -4px rgba(99, 102, 241, 0.25)',
        'elevated': '0 12px 36px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        neon: {
          blue: '#00d4ff',
          cyan: '#00ffff',
          purple: '#b400ff',
          pink: '#ff00ff',
          green: '#00ff88',
          yellow: '#ffff00',
          orange: '#ff8800',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      extend: {
        perspective: {
          '1000': '1000px',
          '2000': '2000px',
        },
        transformStyle: {
          '3d': 'preserve-3d',
        },
        backfaceVisibility: {
          hidden: 'hidden',
        },
        animation: {
          'glow': 'glow 2s ease-in-out infinite alternate',
          'float': 'float 6s ease-in-out infinite',
          'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          glow: {
            '0%': { 'text-shadow': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
            '100%': { 'text-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          'pulse-neon': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
          },
        },
      },
    },
  },
  plugins: [],
}
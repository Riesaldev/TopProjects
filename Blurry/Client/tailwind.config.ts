import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    colors: {
      primary: {
        50: '#ffe4ef',
        100: '#ffd6f7',
        200: '#fcc2f7',
        300: '#faa2f6',
        400: '#f783f7',
        500: '#f065e4',
        600: '#e649e6',
        700: '#d633d6',
        800: '#9b1ea6',
        900: '#7a1883',
      },
      secondary: {
        50: '#f3e8ff',
        100: '#ede9fe',
        200: '#e3b4fe',
        300: '#d684fc',
        400: '#d18bfa',
        500: '#b85cf6',
        600: '#a53aed',
        700: '#9828d9',
        800: '#7f21b6',
        900: '#6f1d95',
      },
      accent: {
        100: '#F5F5F5', // Gris claro puro
        400: '#BDBDBD', // Gris claro puro
        500: '#9E9E9E', // Gris medio puro
        800: '#424242', // Gris oscuro puro
      },
      success: {
        50: '#ecfdf5',
        500: '#10b981',
        600: '#059669',
      },
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
      },
    },
    extend: {
      boxShadow: {
        neumorphic: '20px 20px 60px #d1d5db, -20px -20px 60px #ffffff',
        soft: '0 10px 25px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        medium: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        large: '0 25px 50px -12px rgba(0,0,0,0.25)',
        colored: '0 20px 25px -5px rgba(240,101,149,0.15), 0 10px 10px -5px rgba(139,92,246,0.08)',
      },
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0,-30px,0)' },
          '70%': { transform: 'translate3d(0,-15px,0)' },
          '90%': { transform: 'translate3d(0,-4px,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        skeletonLoading: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        bounce: 'bounce 1s infinite',
        shimmer: 'shimmer 1.5s infinite',
        'skeleton-loading': 'skeletonLoading 1.5s infinite',
      },
      maxWidth: {
        'container-modern': '1280px',
      },
      spacing: {
        'container-padding': '1rem',
        'container-padding-md': '2rem',
      },
      gridTemplateColumns: {
        'responsive-1': '1fr',
        'responsive-2': 'repeat(2, 1fr)',
        'responsive-3': 'repeat(3, 1fr)',
        'responsive-4': 'repeat(4, 1fr)',
      },
    },
  },
  plugins: [],
};

export default config;

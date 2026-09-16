/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBFAF7',
        offwhite: '#F2F0E9',
        cream: '#EFEADF',
        line: '#E7E3D8',
        ink: '#0A0F0D',
        muted: '#6B7370',
        emerald: {
          DEFAULT: '#0B3D2E',
          deep: '#062A1F',
          light: '#174E3E',
          mid: '#0E4D3A',
        },
        forest: '#123E32',
        sage: '#A8C0A6',
        sagelight: '#DDE8DC',
        sagedark: '#7A9A87',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Fraunces', 'serif'],
        italiana: ['var(--font-italiana)', 'Italiana', 'serif'],
        sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        mega: '0.35em',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(.16,1,.3,1)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        floatA: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: { to: { backgroundPosition: '-200% 0' } },
        toastIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        toastOut: { to: { transform: 'translateX(110%)', opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'float-a': 'floatA 6s ease-in-out infinite',
        'float-b': 'floatA 7.5s ease-in-out infinite reverse',
        shimmer: 'shimmer 1.4s infinite',
      },
    },
  },
  plugins: [],
};

import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wobble: 'wobble 1s ease-in-out'
      },
      keyframes: {
        wobble: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '15%': { transform: 'translate3d(-25%,0,0) rotate3d(0,0,1, -5deg)' },
          '30%': { transform: 'translate3d(20%,0,0) rotate3d(0,0,1, 3deg)' },
          '45%': { transform: 'translate3d(-15%,0,0) rotate3d(0,0,1, -3deg)' },
          '60%': { transform: 'translate3d(10%,0,0) rotate3d(0,0,1, 2deg)' },
          '75%': { transform: 'translate3d(-5%,0,0) rotate3d(0,0,1, -1deg)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        }
      }
    },
  },
  plugins: [],
}
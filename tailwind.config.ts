import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";


// Rotate X utilities
const customPlugin = plugin(function({ addUtilities, addComponents, e, config }) {
  addUtilities({
    '.perspective-900': {
      perspective: '900px',
    },
    '.preserve-3d': {
      'transformStyle': 'preserve-3d',
    },
    '.-rotate-y-30': {
      transform: 'rotateY(-30deg)',
    },
    ".transition-transform-075s": {
      transition: "transform 0.75s ease",
    },
    '.rotate-y-20': {
      transform: 'rotateY(20deg)',
    },
    '.rotate-y-40': {
      transform: 'rotateY(40deg)',
    },
    '.rotate-y-60': {
      transform: 'rotateY(60deg)',
    },
    '.rotate-y-80': {
      transform: 'rotateY(80deg)',
    },
  })
})

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      boxShadow: {
        'custom-shadow': '0 0 100px rgba(0, 0, 0, .3)',
        "image-shadow": "5px 5px 20px #2e2e2e",
        "back-cover-shadow": "-10px 0 50px 10px #2e2e2e",
      },
      fontFamily: {
        poppins: "Poppins",
        roboto: "Roboto",
        inter: "Inter",
        montserrat: "Montserrat"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

      },
      colors: {
        "light-main-orange": "#fdfcf7",
        "main-orange": "#f0eee2"
      }
    },
  },
  plugins: [require("@tailwindcss/forms"), customPlugin],
};
export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        stars: "url('/bg.png')",
      },
      colors: {
        'antique-white': '#faebd7',
      },
      keyframes: {
        dropInSteps: {
          "0%": { transform: "translate(-50%, -300px)", opacity: "0" },
          "100%": { transform: "translate(-50%, 0)", opacity: "1" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "retro-drop-in":
          "dropInSteps 2s steps(10, end) forwards, blink 1s steps(2, end) 2s infinite",
      },
      
    },
  },
  plugins: [],
};

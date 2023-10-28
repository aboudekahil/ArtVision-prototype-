/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ArtBlack: "#0E0E10",
        Porple: "#4444ee",
        ArtBlack2: "#18181b",
        ArtBlack3: "#1f1f23",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

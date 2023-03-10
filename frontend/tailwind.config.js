/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00BFFF",
        secondary: "#dddddd",
        button_secondary: "#FFC107",
        accent_color: "#8B0000",
        background_color: "#282C34",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btnbg: "#a50050",
        inputbg: "#19202E",
        inputborder: "#243048",
        formbg: "#0e2049",
        btnbg2: "#122b61",
        btnbg3: "#6cda39",
      },
      boxShadow: {
        inputboxshadow: "0 0 0 2px #0293e2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

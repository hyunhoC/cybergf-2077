/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "katalk-bg": "rgba(210,224,237,255)",
        "katalk-mychat": "rgba(255,235,51,255)",
      },
    },
  },
  plugins: [],
};

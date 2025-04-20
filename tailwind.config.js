module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // 👈 thêm dòng này
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        secondary: "#3a3a3a",
        accent: "#f0f0f0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // 👈 thêm plugin
  ],
};

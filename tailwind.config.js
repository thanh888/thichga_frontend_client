module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // 👈 thêm dòng này
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // 👈 thêm plugin
  ],
};

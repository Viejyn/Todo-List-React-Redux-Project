module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Tailwind'in dosyalarınızı taraması için
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};



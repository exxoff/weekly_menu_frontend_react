module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      body: ["Montserrat"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
        ".markdown > ol, ul": { paddingLeft: "revert" },
        ".markdown ol > li": { listStyle: "decimal" },
        ".markdown ul > li": { listStyle: "disc" },
      });
    }),
  ],
};

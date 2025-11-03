const config = {
  plugins: {
    // Turbopack / Next expects Tailwind's PostCSS plugin to be the
    // separate package `@tailwindcss/postcss` instead of the main
    // `tailwindcss` export.
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;

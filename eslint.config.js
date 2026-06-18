module.exports = [
  {
    files: ["src/js/**/*.js"],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        fetch: "readonly",
        Intl: "readonly",
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "prefer-const": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
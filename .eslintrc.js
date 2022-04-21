module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb-typescript", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-filename-extension": "off",
    "react/react-in-jsx-scope": "off",
  },
};

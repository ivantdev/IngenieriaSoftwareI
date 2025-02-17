import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import a11y from "eslint-plugin-jsx-a11y";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        alias: {
          map: [
            ["@", "./src"],
            ["@public/", "/"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
      "jsx-a11y": a11y,
    },
    rules: {
      // JavaScript Best Practices
      ...js.configs.recommended.rules,

      // React Best Practices
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/prop-types": "error",
      "react/no-unstable-nested-components": "warn",
      "react/jsx-no-target-blank": "off",

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // JSX Accessibility
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",

      // Prettier (code formatting)
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
          trailingComma: "all",
          printWidth: 80,
          endOfLine: "lf",
        },
      ],

      // Forbidden relative paths and absolute paths
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./*", "//"],
          paths: [
            {
              name: "@public",
              message:
                "Use the `@public/` alias to access resources in `public`.",
            },
            {
              name: "@",
              message: "Use the `@` alias to access files in `src`.",
            },
          ],
        },
      ],
    },
  },
];

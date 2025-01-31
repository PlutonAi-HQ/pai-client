import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      prettier: pluginPrettier,
      "@typescript-eslint": pluginTs,
      "unused-imports": pluginUnusedImports,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "prettier/prettier": "error",
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;

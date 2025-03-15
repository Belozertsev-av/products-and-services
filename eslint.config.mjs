import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

import { createConfigForNuxt } from "@nuxt/eslint-config/flat"

export default createConfigForNuxt().prepend([
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  prettierConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "error",
        // prettier config
        {
          semi: false,
          singleAttributePerLine: true,
          trailingComma: "all",
          bracketSpacing: true,
          endOfLine: "auto",
        },
        {
          usePrettierrc: true,
        },
      ],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "any", // Allow self-closing for void elements (e.g., <img/>)
            normal: "always", // Require self-closing for normal elements
            component: "always", // Require self-closing for components
          },
        },
      ],
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      curly: ["warn", "all"],
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION", // is, v-is
            "LIST_RENDERING", // v-for item in items
            "CONDITIONALS", // v-if, v-else-if, v-else, v-show, v-cloak
            "RENDER_MODIFIERS", // v-pre, v-once
            "GLOBAL", // id
            "UNIQUE", // ref, key, slot
            "TWO_WAY_BINDING", // v-model
            "OTHER_DIRECTIVES", // v-custom-directive
            "OTHER_ATTR", // class, style
            "EVENTS", // @click="functionCall"
            "CONTENT", // v-text, v-html
          ],
          alphabetical: false,
        },
      ],
    },
  },
])

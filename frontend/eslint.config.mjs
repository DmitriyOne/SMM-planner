import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      "node_modules/",
      ".next/",
      ".cache/",
      "out/",
      "logs/",
      "*.log",
      "coverage/",
      "*.tsbuildinfo",
      "*.tmp",
      "*.temp",
      ".eslintignore",
      ".eslintcache",
    ],
  },
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "react/no-array-index-key": "error",
      "react/jsx-closing-tag-location": [1, { location: "tag-aligned" }],
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".jsx", ".tsx"] },
      ],
      "react/jsx-max-props-per-line": ["warn", { maximum: 1 }],
      "react/jsx-first-prop-new-line": ["error", "multiline"],
      "react/jsx-tag-spacing": [
        "warn",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "never",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "space-before-blocks": ["warn", "always"],
      "@typescript-eslint/no-unused-vars": "warn",
      "comma-dangle": ["warn", "always-multiline"],
      "object-curly-spacing": ["warn", "always"],
      "key-spacing": ["warn", { afterColon: true }],
      quotes: [
        "warn",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      "comma-spacing": ["warn", { before: false, after: true }],
      "eol-last": ["warn", "always"],
      "no-console": "warn",
      "no-duplicate-imports": "warn",
      "padding-line-between-statements": "off",
    },
  }),
]

export default eslintConfig

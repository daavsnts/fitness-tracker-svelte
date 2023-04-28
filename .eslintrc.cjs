module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.svelte"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
      },
      rules: {
        "@typescript-eslint/await-thenable": "off",
        "comma-dangle": "off",
        "comma-spacing": "off",
        "brace-style": "off",
        "no-extra-semi": "off",
        "require-await": "off",
        "object-curly-spacing": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/comma-spacing": ["error", { before: false, after: true }],
        "@typescript-eslint/brace-style": ["error", "1tbs"],
        "@typescript-eslint/no-extra-semi": ["error"],
        "@typescript-eslint/require-await": ["error"],
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "@typescript-eslint/type-annotation-spacing": [
          "error",
          { before: false, after: true },
        ],
      },
    },
    {
      files: ["*.svelte"],
      extends: [
        "plugin:svelte/recommended",
      ],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: {
          // Specify a parser for each lang.
          ts: "@typescript-eslint/parser",
          js: "espree",
          typescript: "@typescript-eslint/parser",
        },
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".svelte"],
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "no-param-reassign": ["error", { props: false }],
    "no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
    "import/prefer-default-export": ["off"],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { before: false, after: true }],
    "brace-style": ["error", "1tbs"],
    "no-extra-semi": ["error"],
    "require-await": ["error"],
    "require-yield": ["error"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "import/extensions": "off",
    "no-plusplus": "off",
    "import/no-extraneous-dependencies": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  root: true,
};

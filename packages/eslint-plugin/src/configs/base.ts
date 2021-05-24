export = {
    parser: "@hulu/eslint-parser-brightscript",
    parserOptions: { sourceType: "module" },
    plugins: ["@hulu/eslint-plugin-brightscript"],
    ignorePatterns: ["*.js"],
    overrides: [
        {
            files: ["*.brs"],
        },
    ],
};

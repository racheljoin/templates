module.exports = {
    extends: [
        'stylelint-config-recess-order',
        'eslint-config-mature/stylelint/style',
        'eslint-config-mature/stylelint/style-scss',
    ],
    ignoreFiles: [
        '**/*.js',
        '**/*.cjs',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        "node_modules/",
        "dist/",
        "public/",
        "docs/",
    ],
    rules: {

    },
};

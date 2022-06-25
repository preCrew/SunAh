module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "ignorePatterns": ["Date.tsx", "node_modules/"],
    "rules": {
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error", { "ignoreTypeValueShadow": true }],
    }

}

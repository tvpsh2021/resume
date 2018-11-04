module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "space-before-function-paren": [
            "error", {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "comma-spacing": [
            "error", {
                "before": false,
                "after": true
            }
        ]
    }
};
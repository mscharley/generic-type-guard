module.exports = {
    "env": {
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "accessors": "explicit",
                    "parameterProperties": "explicit"
                }
            }
        ],
        "@typescript-eslint/indent": [
            "error",
            2,
            {
                "FunctionDeclaration": {
                    "parameters": "first"
                },
                "FunctionExpression": {
                    "parameters": "first"
                }
            }
        ],
        "@typescript-eslint/interface-name-prefix": "error",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-param-reassign": "error",
        "@typescript-eslint/no-parameter-properties": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                "avoidEscape": true
            }
        ],
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/strict-boolean-expressions": [
            "error",
            {
                "allowNullable": true
            }
        ],
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/unified-signatures": "error",
        "arrow-body-style": [
            "error",
            "always"
        ],
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "camelcase": "error",
        "capitalized-comments": [
            "error",
            "always"
        ],
        "comma-dangle": [
            "error",
            "always-multiline"
        ],
        "complexity": "off",
        "constructor-super": "error",
        "curly": "error",
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "off",
        "id-blacklist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined"
        ],
        "id-match": "error",
        "import/no-default-export": "error",
        "import/no-deprecated": "error",
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": false
            }
        ],
        "import/order": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "max-classes-per-file": [
            "error",
            1
        ],
        "max-len": [
            "error",
            {
                "code": 120
            }
        ],
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-fallthrough": "error",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-redeclare": "error",
        "no-return-await": "error",
        "no-sequences": "error",
        "no-shadow": [
            "error",
            {
                "hoist": "all"
            }
        ],
        "no-sparse-arrays": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "no-void": "error",
        "object-shorthand": "error",
        "one-var": [
            "error",
            "never"
        ],
        "padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": "*",
                "next": "return"
            }
        ],
        "prefer-arrow/prefer-arrow-functions": "error",
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "prefer-template": "error",
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "asyncArrow": "always",
                "named": "never"
            }
        ],
        "spaced-comment": "error",
        "use-isnan": "error",
        "valid-typeof": "off",
        // "@typescript-eslint/tslint/config": [
        //     "error",
        //     {
        //         "rules": {
        //             "brace-style": [
        //                 true,
        //                 "stroustrup"
        //             ],
        //             "completed-docs": [
        //                 true,
        //                 {
        //                     "classes": {
        //                         "visibilities": [
        //                             "exported"
        //                         ]
        //                     },
        //                     "functions": {
        //                         "visibilities": [
        //                             "exported"
        //                         ]
        //                     },
        //                     "methods": {
        //                         "locations": "all",
        //                         "privacies": [
        //                             "public",
        //                             "protected"
        //                         ]
        //                     },
        //                     "properties": {
        //                         "locations": "all",
        //                         "privacies": [
        //                             "public"
        //                         ]
        //                     },
        //                     "variables": {
        //                         "visibilities": [
        //                             "exported"
        //                         ]
        //                     },
        //                     "tags": {
        //                         "content": {
        //                             "see": [
        //                                 "#.*"
        //                             ]
        //                         },
        //                         "exists": [
        //                             "inheritdoc"
        //                         ]
        //                     }
        //                 }
        //             ],
        //             "import-spacing": true,
        //             "jsdoc-format": [
        //                 true,
        //                 "check-multiline-start"
        //             ],
        //             "no-boolean-literal-compare": true,
        //             "no-reference-import": true,
        //             "no-unnecessary-callback-wrapper": true,
        //             "no-unsafe-any": true,
        //             "number-literal-format": true,
        //             "object-curly-spacing": [
        //                 true,
        //                 "always"
        //             ],
        //             "object-literal-sort-keys": true,
        //             "prefer-conditional-expression": true,
        //             "switch-final-break": [
        //                 true,
        //                 "always"
        //             ],
        //             "whitespace": [
        //                 true,
        //                 "check-branch",
        //                 "check-decl",
        //                 "check-operator",
        //                 "check-separator",
        //                 "check-type",
        //                 "check-typecast"
        //             ]
        //         }
        //     }
        // ]
    }
};

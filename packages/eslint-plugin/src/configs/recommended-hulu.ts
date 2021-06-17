export = {
    extends: ["./configs/base"],
    rules: {
        "@hulu/brightscript/no-set-focus-false": "error",
        "@hulu/brightscript/no-is-valid": "error",
        "@hulu/brightscript/onkeyevent-boolean-return-type": "error",
        "@hulu/brightscript/no-unsafe-conditions": "error",
        "@hulu/brightscript/no-typed-func-params": "warn",
        "@hulu/brightscript/comment-style": ["error", "'"],
    },
};
